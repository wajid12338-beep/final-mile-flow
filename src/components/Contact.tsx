import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, Clock, MapPin, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.service) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) throw error;

      toast.success("Thank you! We'll call you back within 2 hours during business hours.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        message: ""
      });
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error("Sorry, there was an error submitting your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-background" id="contact">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Contact Us
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We are based in Derby, East Midlands however we provide service nationwide. 
            We are happy to go into the busiest parts of major cities and also those small remote villages up in the district or by the sea sides.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-2 border-border">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">
                Request Call Back
              </CardTitle>
              <CardDescription className="text-base">
                Fill out the form below and a specialist will call you back within 2 hours during business hours.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input 
                      id="firstName" 
                      placeholder="John" 
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Smith" 
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@company.com" 
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required 
                  />
                </div>

                <div className="space-y-2 mb-6">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="+44 7123 456789" 
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required 
                  />
                </div>

                <div className="space-y-2 mb-6">
                  <Label htmlFor="service">Service Required *</Label>
                  <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="same-day">Same-Day Courier</SelectItem>
                      <SelectItem value="multi-drop">Multi-Drop Courier</SelectItem>
                      <SelectItem value="van-day-rate">Van Day Rate Service</SelectItem>
                      <SelectItem value="other">Other Requirements</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 mb-6">
                  <Label htmlFor="message">Additional Details</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Please provide details about your delivery requirements..."
                    className="min-h-[120px]"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                  />
                </div>

                <Button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-logistics-blue hover:bg-logistics-blue-light text-white font-semibold py-3 text-lg rounded-lg transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Request Call Back"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="grid grid-cols-1 gap-6">
              <Card className="p-6 border-2 hover:border-logistics-orange/20 transition-colors duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-logistics-blue rounded-full flex items-center justify-center mr-4">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Phone & WhatsApp</h3>
                    <div className="text-muted-foreground space-y-1">
                      <div>+44 7539868853</div>
                      <div>+44 7352288232</div>
                      <div className="text-sm text-logistics-orange font-medium">Emergency: +44 7539868853</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2 hover:border-logistics-orange/20 transition-colors duration-300">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-logistics-orange rounded-full flex items-center justify-center mr-4">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <p className="text-muted-foreground">Fleetory@outlook.com</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2 hover:border-logistics-orange/20 transition-colors duration-300">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">WhatsApp</h3>
                    <a 
                      href="https://wa.me/447352288232" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-logistics-orange transition-colors duration-200"
                    >
                      Message us on WhatsApp
                    </a>
                  </div>
                </div>
              </Card>
            </div>

            {/* Business Hours */}
            <Card className="p-6 border-2">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-logistics-blue to-logistics-blue-light rounded-full flex items-center justify-center mr-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Business Hours</h3>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Operations:</span>
                  <span className="font-semibold text-logistics-orange">24/7, 365 Days</span>
                </div>
                <div className="flex justify-between">
                  <span>Office Hours:</span>
                  <span>Monday - Friday, 8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Weekend Hours:</span>
                  <span>Saturday - Sunday, 9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Out Of Hours:</span>
                  <span className="font-semibold text-logistics-orange">+44 7539868853</span>
                </div>
              </div>
            </Card>

            {/* Alternative Booking Methods */}
            <Card className="p-6 border-2">
              <h3 className="text-xl font-semibold text-foreground mb-4">Multiple Ways to Book</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-logistics-orange rounded-full mr-3" />
                  <a 
                    href="/booking" 
                    className="text-muted-foreground hover:text-logistics-orange transition-colors duration-200 cursor-pointer"
                  >
                    Online web booking system
                  </a>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-logistics-orange rounded-full mr-3" />
                  <span className="text-muted-foreground">Mobile app (coming soon)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-logistics-orange rounded-full mr-3" />
                  <a 
                    href="mailto:fleetory@outlook.com" 
                    className="text-muted-foreground hover:text-logistics-orange transition-colors duration-200 cursor-pointer"
                  >
                    Email booking
                  </a>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-logistics-orange rounded-full mr-3" />
                  <a 
                    href="tel:+447539868853" 
                    className="text-muted-foreground hover:text-logistics-orange transition-colors duration-200 cursor-pointer"
                  >
                    Telephone support
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;