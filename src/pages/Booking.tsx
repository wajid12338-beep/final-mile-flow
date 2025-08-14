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
import { ArrowRight, Info, CheckCircle, MapPin, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { calculateDistance, geocodeAddress, calculatePricing } from "@/utils/pricingUtils";
import AddressAutocomplete from "@/components/AddressAutocomplete";
import RouteMap from "@/components/RouteMap";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const bookingSchema = z.object({
  collectFrom: z.string().min(10, "Please enter a complete collection address"),
  deliverTo: z.string().min(10, "Please enter a complete delivery address"),
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
  const [isCollectionContact, setIsCollectionContact] = useState(true);
  const [collectASAP, setCollectASAP] = useState(true);
  const [pickupCoords, setPickupCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [deliveryCoords, setDeliveryCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isCalculatingPrice, setIsCalculatingPrice] = useState(false);
  const [pricing, setPricing] = useState({
    collection: 0,
    delivery: 0,
    price: 0,
    vat: 0,
    total: 0
  });

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
    setPickupCoords(coords);
  };

  const handleDeliverySelect = (coords: { lat: number; lng: number }) => {
    setDeliveryCoords(coords);
  };


  const watchedCollectFrom = watch("collectFrom");
  const watchedDeliverTo = watch("deliverTo");
  const watchedService = watch("serviceType");
  const watchedDescription = watch("description");

  // Auto-calculate pricing when addresses, service, or description change
  useEffect(() => {
    const calculateInstantPrice = async () => {
      if (!watchedCollectFrom || !watchedDeliverTo || !watchedService || !watchedDescription) {
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
          
          // Calculate distance and pricing
          const distance = calculateDistance(pickupGeo, deliveryGeo);
          const newPricing = calculatePricing(distance, watchedService, watchedDescription);
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
  }, [watchedCollectFrom, watchedDeliverTo, watchedService, watchedDescription]);

  const services = [
    "Same Day Courier",
    "Next Day Courier", 
    "Multi-Drop Courier",
    "Van Day Rate Service",
    "Overnight Service"
  ];

  const onSubmit = async (data: BookingFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const reference = `AZ${Date.now().toString().slice(-6)}`;
      setBookingReference(reference);
      setIsSubmitted(true);
      
      console.log("Booking data:", data);
      
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">AZ Same Day</h1>
              <p className="text-muted-foreground">Quietly Delivering a Better World</p>
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
                      Need more stops? Contact us at info@azsameday.co.uk
                    </div>
                  </div>

                  {/* Collection Time */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="collectASAP" 
                          checked={collectASAP}
                          onCheckedChange={(checked) => setCollectASAP(!!checked)}
                        />
                        <Label htmlFor="collectASAP" className="text-sm font-medium">
                          Collect as soon as possible
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="collectAfter" 
                          checked={!collectASAP}
                          onCheckedChange={(checked) => setCollectASAP(!checked)}
                        />
                        <Label htmlFor="collectAfter" className="text-sm font-medium">
                          Collect After
                        </Label>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      We aim to collect within 1 hour of your booking being placed
                    </p>
                  </div>

                  {/* Service Selection */}
                  <div className="space-y-2">
                    <Label className="text-lg font-semibold text-foreground">Choose your Service</Label>
                    <Select onValueChange={(value) => setValue("serviceType", value)}>
                      <SelectTrigger className={cn(errors.serviceType && "border-destructive")}>
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service} value={service}>{service}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.serviceType && (
                      <p className="text-sm text-destructive">{errors.serviceType.message}</p>
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
                        onCheckedChange={(checked) => setIsCollectionContact(!!checked)}
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
                    />
                  </CardContent>
                </Card>

                {/* Pricing */}
                <Card>
                  <CardContent className="p-6 space-y-3">
                    {isCalculatingPrice && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Calculating price...</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Collection:</span>
                      <span>{pricing.collection > 0 ? `£${pricing.collection.toFixed(2)}` : '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery:</span>
                      <span>{pricing.delivery > 0 ? `£${pricing.delivery.toFixed(2)}` : '-'}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Price:</span>
                      <span>{pricing.price > 0 ? `£${pricing.price.toFixed(2)}` : '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>VAT:</span>
                      <span>{pricing.vat > 0 ? `£${pricing.vat.toFixed(2)}` : '-'}</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span>{pricing.total > 0 ? `£${pricing.total.toFixed(2)}` : '-'}</span>
                      </div>
                    </div>
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
                        <a href="mailto:info@azsameday.co.uk" className="text-logistics-blue underline">
                          info@azsameday.co.uk
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