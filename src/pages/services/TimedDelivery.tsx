import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Calendar, MapPin, Shield, CheckCircle, ArrowRight } from "lucide-react";

const TimedDelivery = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* SEO-optimized hero section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-logistics-blue to-logistics-blue-light">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Timed Delivery Service UK
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed opacity-90 mb-8">
              Guaranteed time-slot delivery when your package must arrive at a specific time
            </p>
            <p className="text-lg leading-relaxed opacity-80 max-w-3xl mx-auto mb-8">
              When timing is everything, Fleetory's timed delivery service provides scheduled pickup and delivery 
              within specific time windows. Perfect for coordinated logistics, installations, and deadline-critical deliveries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-logistics-orange hover:bg-logistics-orange-light text-white font-semibold px-8 py-4 text-lg"
                onClick={() => window.location.href = '/booking'}
              >
                Schedule Delivery
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-logistics-blue font-semibold px-8 py-4 text-lg"
              >
                Call: 0800 123 4567
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Time slot options */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Flexible Time Slot Options
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the perfect delivery window to match your schedule and requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow border-2 hover:border-logistics-orange/20">
              <CardHeader>
                <Clock className="h-12 w-12 mx-auto text-logistics-orange mb-4" />
                <CardTitle className="text-xl">Morning Delivery</CardTitle>
                <CardDescription className="text-lg font-semibold text-logistics-blue mb-2">8:00 AM - 12:00 PM</CardDescription>
                <CardDescription>
                  Perfect for business deliveries that need to arrive before lunch
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-2 hover:border-logistics-orange/20">
              <CardHeader>
                <Clock className="h-12 w-12 mx-auto text-logistics-orange mb-4" />
                <CardTitle className="text-xl">Afternoon Delivery</CardTitle>
                <CardDescription className="text-lg font-semibold text-logistics-blue mb-2">12:00 PM - 5:00 PM</CardDescription>
                <CardDescription>
                  Ideal for coordinating with installations or afternoon meetings
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-2 hover:border-logistics-orange/20">
              <CardHeader>
                <Clock className="h-12 w-12 mx-auto text-logistics-orange mb-4" />
                <CardTitle className="text-xl">Evening Delivery</CardTitle>
                <CardDescription className="text-lg font-semibold text-logistics-blue mb-2">5:00 PM - 8:00 PM</CardDescription>
                <CardDescription>
                  Great for residential deliveries when recipients are home from work
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Card className="max-w-md mx-auto border-logistics-blue border-2">
              <CardHeader>
                <Calendar className="h-12 w-12 mx-auto text-logistics-blue mb-4" />
                <CardTitle className="text-xl text-logistics-blue">Custom Time Slots</CardTitle>
                <CardDescription>
                  Need a specific 1-2 hour window? We can arrange custom delivery slots to match your exact requirements.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Perfect For Time-Critical Deliveries
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              When your delivery timing needs to coordinate with other activities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Installation Deliveries",
                description: "Coordinate material delivery with installation teams to minimize waiting time and maximize efficiency.",
                features: ["Equipment arrival before technicians", "Building materials for contractors", "Furniture for office setups"]
              },
              {
                title: "Event Logistics",
                description: "Ensure critical items arrive exactly when needed for events, conferences, and presentations.",
                features: ["Conference materials", "Event supplies", "Last-minute additions"]
              },
              {
                title: "Medical Appointments",
                description: "Time-sensitive medical supplies and equipment delivery for scheduled procedures.",
                features: ["Surgical equipment", "Patient records", "Medical supplies"]
              },
              {
                title: "Business Meetings",
                description: "Important documents and materials delivered precisely when your meeting starts.",
                features: ["Presentation materials", "Contract documents", "Product samples"]
              }
            ].map((useCase, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-logistics-blue">{useCase.title}</CardTitle>
                  <CardDescription className="text-base">{useCase.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {useCase.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-logistics-orange mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking process */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              How To Book Timed Delivery
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Simple scheduling process with guaranteed time slots
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-logistics-blue rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-semibold mb-4">Choose Time Slot</h3>
              <p className="text-gray-600">
                Select your preferred delivery window during the booking process.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-logistics-blue rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-semibold mb-4">Confirm Details</h3>
              <p className="text-gray-600">
                Provide pickup and delivery addresses with any special instructions.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-logistics-blue rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-semibold mb-4">Track Progress</h3>
              <p className="text-gray-600">
                Monitor your delivery with real-time updates and ETA notifications.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-logistics-blue rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">4</div>
              <h3 className="text-xl font-semibold mb-4">On-Time Delivery</h3>
              <p className="text-gray-600">
                Guaranteed delivery within your chosen time window with POD.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-gradient-to-r from-logistics-blue to-logistics-blue-light">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-6">
              Book Your Timed Delivery Today
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Don't leave critical deliveries to chance. Schedule your timed delivery with guaranteed time slots 
              and professional handling across the UK.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-logistics-orange hover:bg-logistics-orange-light text-white font-semibold px-8 py-4 text-lg"
                onClick={() => window.location.href = '/booking'}
              >
                Schedule Now
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-logistics-blue font-semibold px-8 py-4 text-lg"
              >
                Speak to Expert
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TimedDelivery;