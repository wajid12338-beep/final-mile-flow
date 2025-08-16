import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Package, User, CheckCircle, AlertCircle, Truck, Ruler, Weight } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const bookingSchema = z.object({
  pickupAddress: z.string().min(10, "Please enter a complete pickup address"),
  deliveryAddress: z.string().min(10, "Please enter a complete delivery address"),
  pickupDate: z.date({
    required_error: "Please select a pickup date",
  }),
  pickupTime: z.string().min(1, "Please select a pickup time"),
  deliveryDate: z.date({
    required_error: "Please select a delivery date",
  }),
  deliveryTime: z.string().min(1, "Please select a delivery time"),
  vehicleType: z.string().min(1, "Please select a vehicle type"),
  packageType: z.string().min(1, "Please select package type"),
  packageWeight: z.string().min(1, "Please enter package weight"),
  packageDimensions: z.string().min(1, "Please enter package dimensions"),
  specialHandling: z.string().optional(),
  contactName: z.string().min(2, "Please enter your full name"),
  contactEmail: z.string().email("Please enter a valid email address"),
  contactPhone: z.string().min(10, "Please enter a valid phone number"),
  additionalNotes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const Quotations = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [bookingReference, setBookingReference] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const watchedPickupDate = watch("pickupDate");
  const watchedDeliveryDate = watch("deliveryDate");
  const watchedVehicleType = watch("vehicleType");

  const timeSlots = [
    "08:00 - 10:00",
    "10:00 - 12:00", 
    "12:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
    "18:00 - 20:00"
  ];

  const packageTypes = [
    "Document/Envelope",
    "Small Package (< 5kg)",
    "Medium Package (5-15kg)",
    "Large Package (15-30kg)",
    "Fragile Items",
    "Electronics",
    "Medical Supplies",
    "Other"
  ];

  const vehicles = [
    {
      name: "Small Van",
      description: "Perfect solution for urgent, light-load deliveries. Designed for agility and efficiency, ideal for navigating busy city streets.",
      uses: ["Documents", "Large heavy boxes", "Small office items", "Furniture"],
      maxSize: "1.4m L x 1.2m W x 1.0m H",
      maxWeight: "400kg",
      icon: Package,
    },
    {
      name: "SWB Van (Short Wheelbase)",
      description: "Versatile workhorse offering more space while retaining excellent maneuverability. Great balance of capacity and agility.",
      uses: ["Palletized goods", "Couple of euro pallets", "Small-scale commercial deliveries", "White goods"],
      maxSize: "2.0m L x 1.2m W x 1.2m H",
      maxWeight: "800kg",
      icon: Truck,
    },
    {
      name: "LWB Van (Long Wheelbase)",
      description: "Built for consignments that require significant space. Capable of carrying up to three pallets and excellent for long items.",
      uses: ["Building materials", "Medium-sized residential moves", "Office moves", "Long items"],
      maxSize: "3.0m L x 1.2m W x 1.7m H", 
      maxWeight: "1100kg",
      icon: Truck,
    },
    {
      name: "XLWB Van (Extra-Long Wheelbase)",
      description: "Maximum capacity solution providing extensive loading area. Perfect for high-volume loads and full-pallet consignments.",
      uses: ["Large-scale construction deliveries", "Retail deliveries", "Full-pallet consignments", "Bulk transport"],
      maxSize: "4.0m L x 1.36m W x 1.79m H",
      maxWeight: "1100kg", 
      icon: Truck,
    },
    {
      name: "Luton Van",
      description: "Specifically designed for bulkier items and removals. Box-shaped body provides maximum usable space with tail lift for easy loading.",
      uses: ["House removals", "Office removals", "Large furniture deliveries", "Large-scale consignments"],
      maxSize: "4.0m L x 2.0m W x 2.0m H",
      maxWeight: "800kg",
      icon: Truck,
    }
  ];

  const selectedVehicle = vehicles.find(v => v.name === watchedVehicleType);

  const onSubmit = async (data: BookingFormData) => {
    try {
      setSubmitError(null);
      
      // Generate booking reference
      const reference = `QU${Date.now().toString().slice(-6)}`;
      
      // Save quotation request to database
      const { error } = await supabase
        .from('bookings')
        .insert([{
          reference_number: reference,
          collect_from: data.pickupAddress,
          deliver_to: data.deliveryAddress,
          service_type: data.vehicleType,
          description: `Package: ${data.packageType}, Weight: ${data.packageWeight}, Dimensions: ${data.packageDimensions}${data.specialHandling ? ', Special handling: ' + data.specialHandling : ''}${data.additionalNotes ? ', Notes: ' + data.additionalNotes : ''}`,
          customer_name: data.contactName,
          customer_email: data.contactEmail,
          customer_phone: data.contactPhone,
          booking_type: "quotation",
          collection_contact: {
            date: format(data.pickupDate, 'yyyy-MM-dd'),
            time: data.pickupTime
          },
          delivery_contact: {
            date: format(data.deliveryDate, 'yyyy-MM-dd'),
            time: data.deliveryTime
          }
        }]);

      if (error) throw error;

      // Send email notifications
      const emailError = await supabase.functions.invoke('send-booking-email', {
        body: {
          referenceNumber: reference,
          customerName: data.contactName,
          customerEmail: data.contactEmail,
          customerPhone: data.contactPhone,
          collectFrom: data.pickupAddress,
          deliverTo: data.deliveryAddress,
          serviceType: data.vehicleType,
          description: `Quotation Request - Package: ${data.packageType}, Weight: ${data.packageWeight}, Dimensions: ${data.packageDimensions}${data.specialHandling ? ', Special handling: ' + data.specialHandling : ''}`,
          pricing: null,
          bookingType: "quotation"
        }
      });

      if (emailError.error) {
        console.error('Email sending failed:', emailError.error);
        // Don't fail the quotation if email fails
      }
      
      setBookingReference(reference);
      setIsSubmitted(true);
      
    } catch (error) {
      setSubmitError("Could not save quotation request. Please try again.");
      console.error("Quotation error:", error);
    }
  };

  if (isSubmitted && bookingReference) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-6 max-w-2xl">
            <Card className="border-green-200 bg-green-50/50">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-green-800">Booking Confirmed!</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-green-700 mb-4">
                    Your booking has been successfully created. Once your booking is confirmed, we'll dispatch the nearest available driver. We aim to collect your shipment within 60 minutes.
                  </p>
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <Label className="text-sm font-medium text-green-800">Booking Reference</Label>
                    <p className="text-2xl font-bold text-green-600">{bookingReference}</p>
                  </div>
                </div>
                
                <div className="space-y-3 pt-4 border-t border-green-200">
                  <h3 className="font-semibold text-green-800">What's Next?</h3>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li>• One of our specialists will contact you shortly to discuss the request and finalise booking</li>
                    <li>• You'll receive a detailed quote via email</li>
                    <li>• Our team will contact you to confirm collection details</li>
                    <li>• Track your delivery using the reference number above</li>
                  </ul>
                </div>

                <div className="flex gap-3 pt-4">
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
                    className="flex-1"
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Package className="w-4 h-4" />
              Instant Booking
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Get Your Quote & Book Now
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Professional same-day courier service across the UK. Enter your details below for an instant quote 
              and book your delivery in under 60 seconds.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Locations Card */}
                <div className="bg-card rounded-xl border border-border shadow-sm">
                  <div className="p-6 border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-card-foreground">Collection & Delivery</h3>
                        <p className="text-sm text-muted-foreground">Where should we pick up and deliver?</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="pickupAddress" className="text-sm font-medium">From (Collection Address)</Label>
                        <Textarea
                          id="pickupAddress"
                          placeholder="Enter full collection address including postcode"
                          className={cn("min-h-[100px] resize-none", errors.pickupAddress && "border-destructive focus-visible:ring-destructive")}
                          {...register("pickupAddress")}
                        />
                        {errors.pickupAddress && (
                          <p className="text-xs text-destructive flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.pickupAddress.message}
                          </p>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <Label htmlFor="deliveryAddress" className="text-sm font-medium">To (Delivery Address)</Label>
                        <Textarea
                          id="deliveryAddress"
                          placeholder="Enter full delivery address including postcode"
                          className={cn("min-h-[100px] resize-none", errors.deliveryAddress && "border-destructive focus-visible:ring-destructive")}
                          {...register("deliveryAddress")}
                        />
                        {errors.deliveryAddress && (
                          <p className="text-xs text-destructive flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.deliveryAddress.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Schedule Card */}
                <div className="bg-card rounded-xl border border-border shadow-sm">
                  <div className="p-6 border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-card-foreground">When do you need this?</h3>
                        <p className="text-sm text-muted-foreground">Select your preferred collection and delivery times</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Collection Date & Time</Label>
                        <div className="grid grid-cols-2 gap-3">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "justify-start text-left font-normal h-11",
                                  !watchedPickupDate && "text-muted-foreground",
                                  errors.pickupDate && "border-destructive"
                                )}
                              >
                                {watchedPickupDate ? format(watchedPickupDate, "dd/MM/yyyy") : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={watchedPickupDate}
                                onSelect={(date) => setValue("pickupDate", date!)}
                                disabled={(date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          
                          <Select onValueChange={(value) => setValue("pickupTime", value)}>
                            <SelectTrigger className={cn("h-11", errors.pickupTime && "border-destructive")}>
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((slot) => (
                                <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        {(errors.pickupDate || errors.pickupTime) && (
                          <p className="text-xs text-destructive flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.pickupDate?.message || errors.pickupTime?.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Delivery Date & Time</Label>
                        <div className="grid grid-cols-2 gap-3">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "justify-start text-left font-normal h-11",
                                  !watchedDeliveryDate && "text-muted-foreground",
                                  errors.deliveryDate && "border-destructive"
                                )}
                              >
                                {watchedDeliveryDate ? format(watchedDeliveryDate, "dd/MM/yyyy") : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={watchedDeliveryDate}
                                onSelect={(date) => setValue("deliveryDate", date!)}
                                disabled={(date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          
                          <Select onValueChange={(value) => setValue("deliveryTime", value)}>
                            <SelectTrigger className={cn("h-11", errors.deliveryTime && "border-destructive")}>
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((slot) => (
                                <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        {(errors.deliveryDate || errors.deliveryTime) && (
                          <p className="text-xs text-destructive flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.deliveryDate?.message || errors.deliveryTime?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vehicle Selection Card */}
                <div className="bg-card rounded-xl border border-border shadow-sm">
                  <div className="p-6 border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Truck className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-card-foreground">Choose Your Vehicle</h3>
                        <p className="text-sm text-muted-foreground">Select the right vehicle for your delivery</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Vehicle Type</Label>
                      <Select onValueChange={(value) => setValue("vehicleType", value)}>
                        <SelectTrigger className={cn("h-11", errors.vehicleType && "border-destructive")}>
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border border-border shadow-lg z-50">
                          {vehicles.map((vehicle) => (
                            <SelectItem key={vehicle.name} value={vehicle.name} className="cursor-pointer">
                              <div className="flex items-center gap-2">
                                <vehicle.icon className="w-4 h-4" />
                                {vehicle.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.vehicleType && (
                        <p className="text-xs text-destructive flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.vehicleType.message}
                        </p>
                      )}
                    </div>

                    {/* Vehicle Information Display */}
                    {selectedVehicle && (
                      <div className="bg-muted/50 rounded-lg p-4 space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <selectedVehicle.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-card-foreground mb-2">{selectedVehicle.name}</h4>
                            <p className="text-sm text-muted-foreground mb-3">{selectedVehicle.description}</p>
                            
                            {/* Specifications */}
                            <div className="grid grid-cols-2 gap-3 mb-3">
                              <div className="flex items-center gap-2 text-sm">
                                <Ruler className="w-4 h-4 text-primary" />
                                <div>
                                  <span className="font-medium">Max Size:</span>
                                  <br />
                                  <span className="text-muted-foreground">{selectedVehicle.maxSize}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Weight className="w-4 h-4 text-primary" />
                                <div>
                                  <span className="font-medium">Max Weight:</span>
                                  <br />
                                  <span className="text-muted-foreground">{selectedVehicle.maxWeight}</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Common Uses */}
                            <div>
                              <p className="text-sm font-medium text-card-foreground mb-2">Commonly used for:</p>
                              <div className="flex flex-wrap gap-1">
                                {selectedVehicle.uses.map((use, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {use}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Package Details Card */}
                <div className="bg-card rounded-xl border border-border shadow-sm">
                  <div className="p-6 border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-card-foreground">Package Information</h3>
                        <p className="text-sm text-muted-foreground">Tell us about what you're sending</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Package Type</Label>
                        <Select onValueChange={(value) => setValue("packageType", value)}>
                          <SelectTrigger className={cn("h-11", errors.packageType && "border-destructive")}>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {packageTypes.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.packageType && (
                          <p className="text-xs text-destructive flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.packageType.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="packageWeight" className="text-sm font-medium">Weight</Label>
                        <Input
                          id="packageWeight"
                          placeholder="e.g., 5kg"
                          className={cn("h-11", errors.packageWeight && "border-destructive")}
                          {...register("packageWeight")}
                        />
                        {errors.packageWeight && (
                          <p className="text-xs text-destructive flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.packageWeight.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="packageDimensions" className="text-sm font-medium">Dimensions</Label>
                        <Input
                          id="packageDimensions"
                          placeholder="L x W x H (cm)"
                          className={cn("h-11", errors.packageDimensions && "border-destructive")}
                          {...register("packageDimensions")}
                        />
                        {errors.packageDimensions && (
                          <p className="text-xs text-destructive flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.packageDimensions.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="specialHandling" className="text-sm font-medium">Special Requirements (Optional)</Label>
                      <Textarea
                        id="specialHandling"
                        placeholder="Fragile, temperature controlled, signature required, etc."
                        className="resize-none"
                        rows={3}
                        {...register("specialHandling")}
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information Card */}
                <div className="bg-card rounded-xl border border-border shadow-sm">
                  <div className="p-6 border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-card-foreground">Your Details</h3>
                        <p className="text-sm text-muted-foreground">We'll use this to confirm your booking</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-3">
                        <Label htmlFor="contactName" className="text-sm font-medium">Full Name</Label>
                        <Input
                          id="contactName"
                          placeholder="John Smith"
                          className={cn("h-11", errors.contactName && "border-destructive")}
                          {...register("contactName")}
                        />
                        {errors.contactName && (
                          <p className="text-xs text-destructive flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.contactName.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="contactEmail" className="text-sm font-medium">Email Address</Label>
                        <Input
                          id="contactEmail"
                          type="email"
                          placeholder="john@example.com"
                          className={cn("h-11", errors.contactEmail && "border-destructive")}
                          {...register("contactEmail")}
                        />
                        {errors.contactEmail && (
                          <p className="text-xs text-destructive flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.contactEmail.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="contactPhone" className="text-sm font-medium">Phone Number</Label>
                        <Input
                          id="contactPhone"
                          type="tel"
                          placeholder="+44 7700 000000"
                          className={cn("h-11", errors.contactPhone && "border-destructive")}
                          {...register("contactPhone")}
                        />
                        {errors.contactPhone && (
                          <p className="text-xs text-destructive flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.contactPhone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="additionalNotes" className="text-sm font-medium">Additional Notes (Optional)</Label>
                      <Textarea
                        id="additionalNotes"
                        placeholder="Any special instructions or requirements"
                        className="resize-none"
                        rows={3}
                        {...register("additionalNotes")}
                      />
                    </div>
                  </div>
                </div>

                {/* Error Display */}
                {submitError && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-destructive" />
                      <p className="text-destructive font-medium">{submitError}</p>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <div className="bg-card rounded-xl border border-border shadow-sm">
                  <div className="p-6 border-b border-border">
                    <h3 className="text-lg font-semibold text-card-foreground">Booking Summary</h3>
                    <p className="text-sm text-muted-foreground">Review your details</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Package className="w-8 h-8 text-primary" />
                      </div>
                      <p className="text-muted-foreground text-sm mb-4">
                        Fill in the form to see your quote
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Same-day delivery</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Real-time tracking</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Professional drivers</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Secure handling</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleSubmit(onSubmit)}
                      disabled={isSubmitting}
                      className="w-full h-12 text-base font-semibold"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Processing...
                        </div>
                      ) : (
                        "Get Quote & Book Now"
                      )}
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center">
                      By clicking "Get Quote & Book Now" you agree to our terms and conditions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Quotations;