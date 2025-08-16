import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin, Shield, Truck, CheckCircle, ArrowRight } from "lucide-react";

const SameDayDelivery = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* SEO-optimized hero section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-logistics-blue to-logistics-blue-light">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Same Day Delivery Service UK
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed opacity-90 mb-8">
              Guaranteed same-day courier delivery across the UK with rapid 60-minute collection
            </p>
            <p className="text-lg leading-relaxed opacity-80 max-w-3xl mx-auto mb-8">
              When time is critical, Fleetory's same-day delivery service ensures your packages arrive exactly when needed. 
              Our extensive network of professional drivers guarantees collection within 60 minutes and delivery the same day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-logistics-orange hover:bg-logistics-orange-light text-white font-semibold px-8 py-4 text-lg"
                onClick={() => window.location.href = '/booking'}
              >
                Get Instant Quote
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-logistics-blue font-semibold px-8 py-4 text-lg"
              >
                Call Now: 0800 123 4567
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key benefits */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Why Choose Our Same Day Delivery?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Fast, reliable, and secure same-day courier services across the entire UK
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 mx-auto text-logistics-orange mb-4" />
                <CardTitle className="text-xl">60-Minute Collection</CardTitle>
                <CardDescription>
                  Rapid collection within 60 minutes of booking confirmation across the UK
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <MapPin className="h-12 w-12 mx-auto text-logistics-orange mb-4" />
                <CardTitle className="text-xl">Real-Time Tracking</CardTitle>
                <CardDescription>
                  Track your driver from collection to delivery with live GPS updates
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 mx-auto text-logistics-orange mb-4" />
                <CardTitle className="text-xl">Fully Insured</CardTitle>
                <CardDescription>
                  Comprehensive goods in transit insurance for complete peace of mind
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <CheckCircle className="h-12 w-12 mx-auto text-logistics-orange mb-4" />
                <CardTitle className="text-xl">Proof of Delivery</CardTitle>
                <CardDescription>
                  Instant POD with signature and photo confirmation upon delivery
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              How Our Same Day Service Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Simple, fast, and reliable - get your same day delivery booked in minutes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-logistics-blue rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-semibold mb-4">Book Online or Call</h3>
              <p className="text-gray-600">
                Get an instant quote online or call our team. Provide pickup and delivery addresses with any special requirements.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-logistics-blue rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-semibold mb-4">Rapid Collection</h3>
              <p className="text-gray-600">
                Our driver arrives within 60 minutes for collection. Track them in real-time via our app or website.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-logistics-blue rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-semibold mb-4">Same Day Delivery</h3>
              <p className="text-gray-600">
                Direct delivery to your recipient with instant proof of delivery and notification upon completion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries served */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Same Day Delivery For Every Industry
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From legal documents to medical supplies, we handle urgent deliveries across all sectors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Legal Documents", description: "Court filings, contracts, and confidential papers with secure handling" },
              { title: "Medical Supplies", description: "Urgent pharmaceutical deliveries and medical equipment transport" },
              { title: "Business Parcels", description: "Critical business documents and packages between offices" },
              { title: "Spare Parts", description: "Manufacturing components and equipment parts for minimal downtime" },
              { title: "Retail Stock", description: "Emergency inventory and customer order fulfillment" },
              { title: "Personal Items", description: "Important personal documents and valuable items" }
            ].map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <ArrowRight className="h-5 w-5 text-logistics-orange mr-2" />
                    {item.title}
                  </CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-gradient-to-r from-logistics-blue to-logistics-blue-light">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-6">
              Need Same Day Delivery? We're Ready
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of businesses who trust Fleetory for their urgent delivery needs. 
              Available 24/7, 365 days a year across the entire UK.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-logistics-orange hover:bg-logistics-orange-light text-white font-semibold px-8 py-4 text-lg"
                onClick={() => window.location.href = '/booking'}
              >
                Get Your Quote Now
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-logistics-blue font-semibold px-8 py-4 text-lg"
              >
                Call Emergency Line
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SameDayDelivery;