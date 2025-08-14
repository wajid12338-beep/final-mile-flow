import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Users, Award, Shield } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Truck,
      title: "Experience-Driven",
      description: "Built on real, hands-on experience in logistics — from handling dangerous goods and customs clearance to coordinating urgent shipments with tight deadlines."
    },
    {
      icon: Users,
      title: "Driver-Focused",
      description: "We know what drivers go through, and we use that knowledge to make same-day courier work as efficient and stress-free as possible for everyone involved."
    },
    {
      icon: Award,
      title: "Quality Network",
      description: "A select group of fully vetted, highly skilled drivers — many with years of experience for companies like Amazon, DPD, and Parcelforce."
    },
    {
      icon: Shield,
      title: "Fair & Transparent",
      description: "We don't believe in overcharging for speed and reliability. Our goal is simple: deliver the same (or better) service at a fair and transparent price."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-logistics-blue to-logistics-blue-light">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About Fleetory
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed opacity-90">
              The network that moves you
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Fleetory was built on real, hands-on experience in logistics — from handling dangerous goods and customs clearance to coordinating urgent shipments with tight deadlines. We understand the fast pace, the short windows, and the pressures that come with moving goods quickly and safely.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                That insight comes from working on both sides of the operation: managing freight, loading for road, air, and sea transport, and working closely with drivers to ensure every job ran smoothly. We know what drivers go through, and we use that knowledge to make same-day courier work as efficient and stress-free as possible for everyone involved — especially our customers.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed mb-12">
                Our focus is same-day and dedicated courier services, where your shipment is the only one we handle from pickup to delivery. We've brought together a select group of fully vetted, highly skilled drivers — many with years of experience for companies like Amazon, DPD, and Parcelforce — and combined that expertise with a nationwide network of trusted couriers.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {values.map((value, index) => (
                <Card key={index} className="border-2 hover:border-logistics-orange/20 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-logistics-blue to-logistics-blue-light rounded-lg flex items-center justify-center flex-shrink-0">
                        <value.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-3">
                          {value.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Mission Statement */}
            <div className="bg-gradient-to-r from-logistics-blue to-logistics-blue-light rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
                We don't believe in overcharging for speed and reliability. Our goal is simple: deliver the same (or better) service as the big names, at a fair and transparent price, with the personal touch only a customer-focused team can offer.
              </p>
              <p className="text-2xl font-semibold text-white mb-8">
                At Fleetory, your delivery is our priority — and we'll go the extra mile to prove it.
              </p>
              <Button 
                size="lg"
                className="bg-logistics-orange hover:bg-logistics-orange-light text-white font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.location.href = '/quotations'}
              >
                Experience Fleetory Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;