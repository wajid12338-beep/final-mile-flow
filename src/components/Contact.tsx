import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

const Contact = () => {
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Smith" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@company.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+44 7123 456789" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="service">Service Required</Label>
                <Select>
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

              <div className="space-y-2">
                <Label htmlFor="message">Additional Details</Label>
                <Textarea 
                  id="message" 
                  placeholder="Please provide details about your delivery requirements..."
                  className="min-h-[120px]"
                />
              </div>

              <Button 
                className="w-full bg-logistics-blue hover:bg-logistics-blue-light text-white font-semibold py-3 text-lg rounded-lg transition-all duration-300"
              >
                Request Call Back
              </Button>
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
                  <span className="text-muted-foreground">Online web booking system</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-logistics-orange rounded-full mr-3" />
                  <span className="text-muted-foreground">Mobile app (coming soon)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-logistics-orange rounded-full mr-3" />
                  <span className="text-muted-foreground">Email booking</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-logistics-orange rounded-full mr-3" />
                  <span className="text-muted-foreground">Telephone support</span>
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