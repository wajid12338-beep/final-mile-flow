import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Package, User, CheckCircle, AlertCircle } from "lucide-react";
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

  const onSubmit = async (data: BookingFormData) => {
    try {
      setSubmitError(null);
      
      // Simulate API call - replace with actual backend integration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock booking reference
      const reference = `AZ${Date.now().toString().slice(-6)}`;
      setBookingReference(reference);
      setIsSubmitted(true);
      
      // In real implementation, this would call your backend API
      console.log("Booking data:", data);
      
    } catch (error) {
      setSubmitError("Could not save booking. Please try again.");
    }
  };

  if (isSubmitted && bookingReference) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <Header />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-6 max-w-2xl">
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-green-800">Booking Confirmed!</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-green-700 mb-4">
                    Your booking has been successfully created. We'll contact you shortly with pricing and confirmation details.
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
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Header />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Get Your Quote</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Create your logistics booking in minutes. Fill out the form below and we'll provide you with a detailed quote.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Pickup & Delivery Locations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Pickup & Delivery Locations
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="pickupAddress">Pickup Address *</Label>
                  <Textarea
                    id="pickupAddress"
                    placeholder="Enter complete pickup address including postcode"
                    className={cn(errors.pickupAddress && "border-destructive")}
                    {...register("pickupAddress")}
                  />
                  {errors.pickupAddress && (
                    <p className="text-sm text-destructive">{errors.pickupAddress.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="deliveryAddress">Delivery Address *</Label>
                  <Textarea
                    id="deliveryAddress"
                    placeholder="Enter complete delivery address including postcode"
                    className={cn(errors.deliveryAddress && "border-destructive")}
                    {...register("deliveryAddress")}
                  />
                  {errors.deliveryAddress && (
                    <p className="text-sm text-destructive">{errors.deliveryAddress.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label>Pickup Date & Time *</Label>
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal flex-1",
                            !watchedPickupDate && "text-muted-foreground",
                            errors.pickupDate && "border-destructive"
                          )}
                        >
                          {watchedPickupDate ? format(watchedPickupDate, "PPP") : "Pick a date"}
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
                      <SelectTrigger className={cn("flex-1", errors.pickupTime && "border-destructive")}>
                        <SelectValue placeholder="Time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {(errors.pickupDate || errors.pickupTime) && (
                    <p className="text-sm text-destructive">
                      {errors.pickupDate?.message || errors.pickupTime?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <Label>Delivery Date & Time *</Label>
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal flex-1",
                            !watchedDeliveryDate && "text-muted-foreground",
                            errors.deliveryDate && "border-destructive"
                          )}
                        >
                          {watchedDeliveryDate ? format(watchedDeliveryDate, "PPP") : "Pick a date"}
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
                      <SelectTrigger className={cn("flex-1", errors.deliveryTime && "border-destructive")}>
                        <SelectValue placeholder="Time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {(errors.deliveryDate || errors.deliveryTime) && (
                    <p className="text-sm text-destructive">
                      {errors.deliveryDate?.message || errors.deliveryTime?.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Package Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Package Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Package Type *</Label>
                    <Select onValueChange={(value) => setValue("packageType", value)}>
                      <SelectTrigger className={cn(errors.packageType && "border-destructive")}>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {packageTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.packageType && (
                      <p className="text-sm text-destructive">{errors.packageType.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="packageWeight">Weight *</Label>
                    <Input
                      id="packageWeight"
                      placeholder="e.g., 5kg"
                      className={cn(errors.packageWeight && "border-destructive")}
                      {...register("packageWeight")}
                    />
                    {errors.packageWeight && (
                      <p className="text-sm text-destructive">{errors.packageWeight.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="packageDimensions">Dimensions *</Label>
                    <Input
                      id="packageDimensions"
                      placeholder="L x W x H (cm)"
                      className={cn(errors.packageDimensions && "border-destructive")}
                      {...register("packageDimensions")}
                    />
                    {errors.packageDimensions && (
                      <p className="text-sm text-destructive">{errors.packageDimensions.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialHandling">Special Handling Requirements</Label>
                  <Textarea
                    id="specialHandling"
                    placeholder="Fragile, temperature controlled, signature required, etc."
                    {...register("specialHandling")}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Full Name *</Label>
                    <Input
                      id="contactName"
                      placeholder="John Smith"
                      className={cn(errors.contactName && "border-destructive")}
                      {...register("contactName")}
                    />
                    {errors.contactName && (
                      <p className="text-sm text-destructive">{errors.contactName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Email Address *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="john@example.com"
                      className={cn(errors.contactEmail && "border-destructive")}
                      {...register("contactEmail")}
                    />
                    {errors.contactEmail && (
                      <p className="text-sm text-destructive">{errors.contactEmail.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Phone Number *</Label>
                    <Input
                      id="contactPhone"
                      placeholder="+44 7XXX XXXXXX"
                      className={cn(errors.contactPhone && "border-destructive")}
                      {...register("contactPhone")}
                    />
                    {errors.contactPhone && (
                      <p className="text-sm text-destructive">{errors.contactPhone.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalNotes">Additional Notes</Label>
                  <Textarea
                    id="additionalNotes"
                    placeholder="Any additional information about your delivery..."
                    {...register("additionalNotes")}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Section */}
            <Card>
              <CardContent className="pt-6">
                {submitError && (
                  <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-destructive" />
                    <p className="text-destructive">{submitError}</p>
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-logistics-orange hover:bg-logistics-orange-light text-white font-semibold py-3"
                  >
                    {isSubmitting ? "Creating Booking..." : "Get Quote & Create Booking"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.location.href = '/'}
                    className="sm:w-auto"
                  >
                    Cancel
                  </Button>
                </div>
                
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">
                      By submitting this form, you agree to our terms of service. One of our specialists will contact you shortly to discuss the request and finalise booking.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Quotations;