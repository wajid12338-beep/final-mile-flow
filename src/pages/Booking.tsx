import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, Info, CheckCircle, MapPin, Loader2, User, UserPlus, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { calculateDistance, calculateDrivingDistance, geocodeAddress, calculatePricing } from "@/utils/pricingUtils";
import AddressAutocomplete from "@/components/AddressAutocomplete";
import RouteMap from "@/components/RouteMap";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccountRequestForm from "@/components/AccountRequestForm";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const bookingSchema = z.object({
  collectFrom: z.string().min(10, "Please enter a complete collection address"),
  deliverTo: z.string().min(10, "Please enter a complete delivery address"),
  vehicleType: z.string().min(1, "Please select a vehicle type"),
  serviceType: z.string().min(1, "Please select a service"),
  description: z.string().min(1, "Please describe your goods"),
  customerName: z.string().min(2, "Please enter your name"),
  customerPhone: z.string().min(10, "Please enter your phone number"),
  customerEmail: z.string().email("Please enter a valid email address"),
  collectionContact: z.object({
    name: z.string().min(2, "Please enter collection contact name"),
    phone: z.string().min(10, "Please enter collection contact phone"),
    email: z.string().email("Please enter collection contact email"),
  }).optional(),
  deliveryContact: z.object({
    name: z.string().min(2, "Please enter delivery contact name"),
    phone: z.string().min(10, "Please enter delivery contact phone"),
    email: z.string().email("Please enter delivery contact email"),
  }).optional(),
  reference: z.string().optional(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const Booking = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingReference, setBookingReference] = useState<string | null>(null);
  const [isCollectionContact, setIsCollectionContact] = useState(false);
  const [collectASAP, setCollectASAP] = useState(true);
  const [pickupCoords, setPickupCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [deliveryCoords, setDeliveryCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isCalculatingPrice, setIsCalculatingPrice] = useState(false);
  const [bookingMode, setBookingMode] = useState<'select' | 'guest' | 'request' | 'login'>('select');
  const [showAccountRequest, setShowAccountRequest] = useState(false);
  const [drivingDistance, setDrivingDistance] = useState<number | null>(null);
  const [pricing, setPricing] = useState({
    collection: 0,
    delivery: 0,
    price: 0,
    vat: 0,
    total: 0
  });

  // Vehicle types from Fleet page
  const vehicles = [
    {
      name: "Small Van",
      description: "Perfect solution for urgent, light-load deliveries. Designed for agility and efficiency, ideal for navigating busy city streets.",
      uses: ["Documents", "Large heavy boxes", "Small office items", "Furniture"],
      maxSize: "1.4m L x 1.2m W x 1.0m H",
      maxWeight: "400kg"
    },
    {
      name: "SWB Van (Short Wheelbase)",
      description: "Versatile workhorse offering more space while retaining excellent maneuverability. Great balance of capacity and agility.",
      uses: ["Palletized goods", "Couple of euro pallets", "Small-scale commercial deliveries", "White goods"],
      maxSize: "2.0m L x 1.2m W x 1.2m H",
      maxWeight: "800kg"
    },
    {
      name: "LWB Van (Long Wheelbase)",
      description: "Built for consignments that require significant space. Capable of carrying up to three pallets and excellent for long items.",
      uses: ["Building materials", "Medium-sized residential moves", "Office moves", "Long items"],
      maxSize: "3.0m L x 1.2m W x 1.7m H", 
      maxWeight: "1100kg"
    },
    {
      name: "XLWB Van (Extra-Long Wheelbase)",
      description: "Maximum capacity solution providing extensive loading area. Perfect for high-volume loads and full-pallet consignments.",
      uses: ["Large-scale construction deliveries", "Retail deliveries", "Full-pallet consignments", "Bulk transport"],
      maxSize: "4.0m L x 1.36m W x 1.79m H",
      maxWeight: "1100kg"
    },
    {
      name: "Luton Van",
      description: "Specifically designed for bulkier items and removals. Box-shaped body provides maximum usable space with tail lift for easy loading.",
      uses: ["House removals", "Office removals", "Large furniture deliveries", "Large-scale consignments"],
      maxSize: "4.0m L x 2.0m W x 2.0m H",
      maxWeight: "800kg"
    }
  ];

  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      acceptTerms: false,
    }
  });

  // Handle address selection from autocomplete
  const handlePickupSelect = (coords: { lat: number; lng: number }) => {
    console.log('=== DEBUG: Pickup coordinates set:', coords);
    setPickupCoords(coords);
  };

  const handleDeliverySelect = (coords: { lat: number; lng: number }) => {
    console.log('=== DEBUG: Delivery coordinates set:', coords);
    setDeliveryCoords(coords);
  };


  const watchedCollectFrom = watch("collectFrom");
  const watchedDeliverTo = watch("deliverTo");
  const watchedVehicleType = watch("vehicleType");
  const watchedService = watch("serviceType");
  const watchedDescription = watch("description");

  // Get selected vehicle details
  const selectedVehicle = vehicles.find(v => v.name === watchedVehicleType);

  // Auto-calculate pricing when addresses and vehicle type change
  useEffect(() => {
    const calculateInstantPrice = async () => {
      if (!watchedCollectFrom || !watchedDeliverTo || !watchedVehicleType) {
        setPricing({ collection: 0, delivery: 0, price: 0, vat: 0, total: 0 });
        return;
      }

      setIsCalculatingPrice(true);
      
      try {
        // Geocode addresses
        const [pickupGeo, deliveryGeo] = await Promise.all([
          geocodeAddress(watchedCollectFrom),
          geocodeAddress(watchedDeliverTo)
        ]);

        if (pickupGeo && deliveryGeo) {
          setPickupCoords(pickupGeo);
          setDeliveryCoords(deliveryGeo);
          
          // Calculate driving distance and pricing
          const distance = await calculateDrivingDistance(pickupGeo, deliveryGeo);
          console.log('=== DEBUG: Driving distance calculated:', distance, 'miles');
          setDrivingDistance(distance);
          console.log('=== DEBUG: Pricing inputs:', { distance, service: watchedService || 'Same Day Courier', description: watchedDescription || 'Standard delivery', vehicleType: watchedVehicleType });
          const newPricing = calculatePricing(distance, watchedService || 'Same Day Courier', watchedDescription || 'Standard delivery', watchedVehicleType);
          console.log('=== DEBUG: Calculated pricing:', newPricing);
          setPricing(newPricing);
        }
      } catch (error) {
        console.error('Error calculating price:', error);
      } finally {
        setIsCalculatingPrice(false);
      }
    };

    // Debounce the calculation
    const timeoutId = setTimeout(calculateInstantPrice, 1000);
    return () => clearTimeout(timeoutId);
  }, [watchedCollectFrom, watchedDeliverTo, watchedVehicleType]);

  const services = [
    "Same Day Courier",
    "Next Day Courier", 
    "Overnight Courier"
  ];

  const onSubmit = async (data: BookingFormData) => {
    try {
      const reference = `FL${Date.now().toString().slice(-6)}`;
      
      // Save booking to database
      const { error } = await supabase
        .from('bookings')
        .insert([{
          reference_number: reference,
          booking_type: user ? 'registered' : 'guest',
          user_id: user?.id || null,
          collect_from: data.collectFrom,
          deliver_to: data.deliverTo,
          service_type: data.serviceType,
          vehicle_type: data.vehicleType,
          description: data.description,
          customer_name: data.customerName,
          customer_phone: data.customerPhone,
          customer_email: data.customerEmail,
          collection_contact: data.collectionContact,
          delivery_contact: data.deliveryContact,
          pricing: pricing,
        }]);

      if (error) throw error;

      // Send email notifications
      const emailError = await supabase.functions.invoke('send-booking-email', {
        body: {
          referenceNumber: reference,
          customerName: data.customerName,
          customerEmail: data.customerEmail,
          customerPhone: data.customerPhone,
          collectFrom: data.collectFrom,
          deliverTo: data.deliverTo,
          serviceType: data.serviceType,
          vehicleType: data.vehicleType,
          description: data.description,
          pricing: pricing,
          bookingType: bookingMode
        }
      });

      if (emailError.error) {
        console.error('Email sending failed:', emailError.error);
        // Don't fail the booking if email fails
      }

      setBookingReference(reference);
      setIsSubmitted(true);
      
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  if (isSubmitted && bookingReference) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-6 max-w-2xl">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-green-800 mb-4">Booking Confirmed!</h1>
                <p className="text-green-700 mb-6">
                  Your booking has been successfully created. One of our specialists will contact you shortly to discuss the request and finalise booking.
                </p>
                <div className="bg-white p-4 rounded-lg border border-green-200 mb-6">
                  <Label className="text-sm font-medium text-green-800">Booking Reference</Label>
                  <p className="text-2xl font-bold text-green-600">{bookingReference}</p>
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={() => {
                      setIsSubmitted(false);
                      setBookingReference(null);
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    Create Another Booking
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/'}
                    className="flex-1 bg-logistics-orange hover:bg-logistics-orange-light"
                  >
                    Back to Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Show booking mode selector if not yet selected
  if (bookingMode === 'select') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Book Your Courier</h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Choose how you'd like to book with Fleetory
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Create Account */}
                <Card className="border-2 hover:border-primary transition-colors cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <UserPlus className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Create an Account</h3>
                    <p className="text-muted-foreground mb-4 text-sm">
                      Ideal for regular users and businesses - keep on top of all your bookings and jobs created
                    </p>
                    <Button 
                      onClick={() => setShowAccountRequest(true)}
                      className="w-full"
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>

                {/* Already Have Account */}
                <Card className="border-2 hover:border-primary transition-colors cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                      <User className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Already Have an Account?</h3>
                    <p className="text-muted-foreground mb-4 text-sm">
                      Sign in to access your account and manage your bookings
                    </p>
                    <Button 
                      onClick={() => navigate('/auth')}
                      className="w-full"
                      variant="outline"
                    >
                      Sign In
                    </Button>
                  </CardContent>
                </Card>

                {/* Book as Guest */}
                <Card className="border-2 hover:border-primary transition-colors cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                      <CreditCard className="w-8 h-8 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Book As a Guest</h3>
                    <p className="text-muted-foreground mb-4 text-sm">
                      Credit/Debit card required. Quick same-day booking
                    </p>
                    <Button 
                      onClick={() => setBookingMode('guest')}
                      className="w-full bg-logistics-orange hover:bg-logistics-orange-light"
                    >
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Account Request Dialog */}
              <Dialog open={showAccountRequest} onOpenChange={setShowAccountRequest}>
                <DialogContent className="max-w-md">
                  <AccountRequestForm onClose={() => setShowAccountRequest(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Header with mode indicator */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setBookingMode('select')}
                >
                  ← Back to Options
                </Button>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {bookingMode === 'guest' ? 'Guest Booking' : 'Quick Quote'}
              </h1>
              
              {bookingMode === 'guest' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-3xl mx-auto mb-6">
                  <p className="text-blue-800 text-sm">
                    <strong>Guest Booking Notice:</strong> As a 'Guest' you can get a quote for Same-day services and make a card booking by credit or debit card. 
                    You will need to have your package collection and delivery details ready and a valid credit or debit card number to make a Same-day booking. 
                    Please note this card booking facility is for Same-day services only. If you require specialist courier services including multi-drop please call 
                    <strong> +44 7539868853</strong> or contact us at <strong>fleetory@outlook.com</strong>
                  </p>
                </div>
              )}
              
              <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
                Fill in the details below and let Fleetory move it for you.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {/* Collection & Delivery */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <Label className="text-sm font-medium text-foreground">*Collect From</Label>
                        <AddressAutocomplete
                          value={watchedCollectFrom || ""}
                          onChange={(value) => setValue("collectFrom", value)}
                          onSelect={handlePickupSelect}
                          placeholder="Start typing collection address or postcode..."
                          className={cn("mt-1", errors.collectFrom && "border-destructive")}
                          error={!!errors.collectFrom}
                        />
                        {errors.collectFrom && (
                          <p className="text-sm text-destructive mt-1">{errors.collectFrom.message}</p>
                        )}
                      </div>
                      
                      <ArrowRight className="w-6 h-6 text-muted-foreground mt-6" />
                      
                      <div className="flex-1">
                        <Label className="text-sm font-medium text-foreground">*Deliver To</Label>
                        <AddressAutocomplete
                          value={watchedDeliverTo || ""}
                          onChange={(value) => setValue("deliverTo", value)}
                          onSelect={handleDeliverySelect}
                          placeholder="Start typing delivery address or postcode..."
                          className={cn("mt-1", errors.deliverTo && "border-destructive")}
                          error={!!errors.deliverTo}
                        />
                        {errors.deliverTo && (
                          <p className="text-sm text-destructive mt-1">{errors.deliverTo.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Info className="w-4 h-4" />
                      Need more stops? Contact us at fleetory@outlook.com
                    </div>
                  </div>

                  {/* Vehicle Type Selection */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-foreground">*Vehicle Type</Label>
                      <Select value={watchedVehicleType || ""} onValueChange={(value) => setValue("vehicleType", value)}>
                        <SelectTrigger className={cn("mt-1", errors.vehicleType && "border-destructive")}>
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border border-border shadow-lg z-50">
                          {vehicles.map((vehicle) => (
                            <SelectItem key={vehicle.name} value={vehicle.name}>
                              {vehicle.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.vehicleType && (
                        <p className="text-sm text-destructive mt-1">{errors.vehicleType.message}</p>
                      )}
                    </div>

                    {/* Vehicle Details Display */}
                    {selectedVehicle && (
                      <div className="mt-4 p-4 bg-muted/50 rounded-lg border">
                        <h4 className="font-medium text-foreground mb-2">{selectedVehicle.name} Specifications</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-logistics-blue rounded-full"></div>
                            <span className="text-sm text-muted-foreground">Max Size: {selectedVehicle.maxSize}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-logistics-orange rounded-full"></div>
                            <span className="text-sm text-muted-foreground">Max Weight: {selectedVehicle.maxWeight}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{selectedVehicle.description}</p>
                        <div className="text-xs">
                          <span className="font-medium text-foreground">Common uses: </span>
                          <span className="text-muted-foreground">{selectedVehicle.uses.join(", ")}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Service Type */}
                  <div>
                    <Label className="text-sm font-medium text-foreground">*Service Type</Label>
                    <Select value={watchedService || ""} onValueChange={(value) => setValue("serviceType", value)}>
                      <SelectTrigger className={cn("mt-1", errors.serviceType && "border-destructive")}>
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border border-border shadow-lg z-50">
                        {services.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.serviceType && (
                      <p className="text-sm text-destructive mt-1">{errors.serviceType.message}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label className="text-lg font-semibold text-foreground">*Description Of Goods</Label>
                    <p className="text-sm text-muted-foreground">
                      *Choose the option that most closely matches your item.
                    </p>
                    <Textarea
                      placeholder="Describe your goods (weight, dimensions, special requirements)"
                      className={cn("min-h-[100px]", errors.description && "border-destructive")}
                      {...register("description")}
                    />
                    {errors.description && (
                      <p className="text-sm text-destructive">{errors.description.message}</p>
                    )}
                  </div>

                  {/* Your Contact Details */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold text-foreground">Your Contact Details</Label>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>*Name</Label>
                        <Input
                          placeholder="Your name"
                          className={cn(errors.customerName && "border-destructive")}
                          {...register("customerName")}
                        />
                        {errors.customerName && (
                          <p className="text-sm text-destructive">{errors.customerName.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label>*Phone</Label>
                        <Input
                          placeholder="Your phone number"
                          className={cn(errors.customerPhone && "border-destructive")}
                          {...register("customerPhone")}
                        />
                        {errors.customerPhone && (
                          <p className="text-sm text-destructive">{errors.customerPhone.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label>*Email</Label>
                        <Input
                          type="email"
                          placeholder="Your email"
                          className={cn(errors.customerEmail && "border-destructive")}
                          {...register("customerEmail")}
                        />
                        {errors.customerEmail && (
                          <p className="text-sm text-destructive">{errors.customerEmail.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="isCollectionContact" 
                        checked={isCollectionContact}
                        onCheckedChange={(checked) => {
                          setIsCollectionContact(!!checked);
                          if (checked) {
                            // Auto-copy customer details to collection contact
                            const customerName = watch("customerName");
                            const customerPhone = watch("customerPhone");
                            const customerEmail = watch("customerEmail");
                            
                            if (customerName) setValue("collectionContact.name", customerName);
                            if (customerPhone) setValue("collectionContact.phone", customerPhone);
                            if (customerEmail) setValue("collectionContact.email", customerEmail);
                          } else {
                            // Clear collection contact fields when unchecked
                            setValue("collectionContact.name", "");
                            setValue("collectionContact.phone", "");
                            setValue("collectionContact.email", "");
                          }
                        }}
                      />
                      <Label htmlFor="isCollectionContact" className="text-sm">
                        I am the collection contact
                      </Label>
                    </div>
                  </div>

                  {/* Collection & Delivery Contacts */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <Label className="text-lg font-semibold text-foreground">Collection Contact</Label>
                      <div className="space-y-3">
                        <Input placeholder="Name" {...register("collectionContact.name")} />
                        <Input placeholder="Phone" {...register("collectionContact.phone")} />
                        <Input placeholder="Email" {...register("collectionContact.email")} />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <Label className="text-lg font-semibold text-foreground">Delivery Contact</Label>
                      <div className="space-y-3">
                        <Input placeholder="Name" {...register("deliveryContact.name")} />
                        <Input placeholder="Phone" {...register("deliveryContact.phone")} />
                        <Input placeholder="Email" {...register("deliveryContact.email")} />
                      </div>
                    </div>
                  </div>

                  {/* Reference */}
                  <div className="space-y-2">
                    <Label className="text-lg font-semibold text-foreground">Your Reference</Label>
                    <Input
                      placeholder="Reference (optional)"
                      {...register("reference")}
                    />
                  </div>

                  {/* Terms */}
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="acceptTerms"
                      checked={watch("acceptTerms")}
                      onCheckedChange={(checked) => setValue("acceptTerms", !!checked)}
                      className={cn(errors.acceptTerms && "border-destructive")}
                    />
                    <Label htmlFor="acceptTerms" className="text-sm leading-relaxed">
                      I have read and comply with the{" "}
                      <a href="/terms" className="text-logistics-blue underline">Terms & Conditions</a>
                      {" "}and{" "}
                      <a href="/privacy" className="text-logistics-blue underline">Privacy Policy</a>
                    </Label>
                  </div>
                  {errors.acceptTerms && (
                    <p className="text-sm text-destructive">{errors.acceptTerms.message}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-logistics-orange hover:bg-logistics-orange-light text-white font-semibold py-4 text-lg"
                  >
                    {isSubmitting ? "Creating Booking..." : "Book Same Day by Card"}
                  </Button>
                </form>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Route Map */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-4 h-4" />
                      <h3 className="font-semibold">Route Preview</h3>
                    </div>
                    <RouteMap 
                      pickup={pickupCoords} 
                      delivery={deliveryCoords}
                      className="h-48"
                      key={`${pickupCoords?.lat}-${pickupCoords?.lng}-${deliveryCoords?.lat}-${deliveryCoords?.lng}`}
                    />
                    {/* Debug info */}
                    {process.env.NODE_ENV === 'development' && (
                      <div className="text-xs text-muted-foreground mt-2">
                        <div>Pickup: {pickupCoords ? `${pickupCoords.lat}, ${pickupCoords.lng}` : 'Not set'}</div>
                        <div>Delivery: {deliveryCoords ? `${deliveryCoords.lat}, ${deliveryCoords.lng}` : 'Not set'}</div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Driving Distance - Below the map */}
                {drivingDistance && pricing.total > 0 && (
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <Label className="text-sm font-medium text-muted-foreground">Actual Driving Distance</Label>
                        <p className="text-lg font-semibold text-primary">{drivingDistance.toFixed(1)} miles</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Pricing Summary */}
                <Card>
                  <CardContent className="p-6 space-y-4">
                    {/* Collect from address */}
                    {watchedCollectFrom && (
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Collect from address</Label>
                        <p className="text-sm font-medium">{watchedCollectFrom}</p>
                      </div>
                    )}
                    
                    {/* Deliver to address */}
                    {watchedDeliverTo && (
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Deliver to address</Label>
                        <p className="text-sm font-medium">{watchedDeliverTo}</p>
                      </div>
                    )}


                    {/* Pricing calculation indicator */}
                    {isCalculatingPrice && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Calculating price...</span>
                      </div>
                    )}
                    
                    {/* Price breakdown */}
                    <div className="space-y-3 border-t pt-4">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Price (exc. VAT)</span>
                        <span className="text-sm font-medium">{pricing.price > 0 ? `£${pricing.price.toFixed(2)}` : '£0.00'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">VAT</span>
                        <span className="text-sm font-medium">{pricing.vat > 0 ? `£${pricing.vat.toFixed(2)}` : '£0.00'}</span>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total Price</span>
                          <span>{pricing.total > 0 ? `£${pricing.total.toFixed(2)}` : '£0.00'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Proceed Button */}
                    {pricing.total > 0 && (
                      <Button 
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 mt-4"
                        onClick={() => {
                          // Scroll to form submission
                          document.querySelector('button[type="submit"]')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Proceed to payment
                      </Button>
                    )}
                  </CardContent>
                </Card>

                {/* Info */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4">Book Same Day by Card</h3>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p>
                        As a 'Guest' you can get a quote for{" "}
                        <span className="font-semibold text-foreground">Same Day services</span>{" "}
                        and make a card booking, by credit or debit card.
                      </p>
                      <p>
                        You will need to have your package collection and delivery details ready
                        and a valid credit or debit card number to make a Same Day booking.
                      </p>
                      <p>
                        Please note this card booking facility is for Same Day services only, if you require 
                        specialist courier services including multi-drop please call 0800 123 4567, or contact us at{" "}
                        <a href="mailto:fleetory@outlook.com" className="text-logistics-blue underline">
                          fleetory@outlook.com
                        </a>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Booking;