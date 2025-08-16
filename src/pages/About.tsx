import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Users, Award, Shield } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Truck,
      title: "Experience-Driven Logistics",
      description: "Built on genuine, hands-on experience in logistics — from handling dangerous goods and customs clearance to coordinating urgent shipments with tight deadlines across the UK and Europe."
    },
    {
      icon: Users,
      title: "Driver-Focused Operations",
      description: "We understand what drivers face daily and use that knowledge to make same-day courier work as efficient and stress-free as possible for everyone involved — drivers and customers alike."
    },
    {
      icon: Award,
      title: "Premium Quality Network",
      description: "A carefully selected group of fully vetted, highly skilled drivers — many with years of experience working for leading companies like Amazon, DPD, Royal Mail, and Parcelforce."
    },
    {
      icon: Shield,
      title: "Fair & Transparent Pricing",
      description: "We don't believe in overcharging for speed and reliability. Our goal is straightforward: deliver exceptional service at fair and transparent prices throughout the UK."
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
            <p className="text-xl md:text-2xl leading-relaxed opacity-90 mb-4">
              The courier network that moves Britain forward
            </p>
            <p className="text-lg leading-relaxed opacity-80">
              Professional same-day delivery services across the UK, built on experience and driven by excellence
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
                Fleetory was founded on genuine, hands-on experience in logistics — from handling dangerous goods and customs clearance to coordinating urgent shipments with tight deadlines. We understand the fast pace, narrow time windows, and pressures that come with moving goods quickly and safely across the UK.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Our expertise comes from working on both sides of the operation: managing freight, loading for road, air, and sea transport, and collaborating closely with drivers to ensure every job runs smoothly. We know what drivers experience daily, and we utilise that knowledge to make same-day courier work as efficient and stress-free as possible for everyone involved — especially our valued customers.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed mb-12">
                We specialise in same-day and dedicated courier services, where your shipment is the only priority we handle from collection to delivery. We've assembled a carefully selected group of fully vetted, highly skilled drivers — many with years of experience working for leading companies like Amazon, DPD, Royal Mail, and Parcelforce — and combined that expertise with a comprehensive nationwide network of trusted couriers.
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
                We don't believe in overcharging for speed and reliability. Our mission is straightforward: deliver exceptional service that matches or exceeds the big names, at fair and transparent prices, with the personal touch that only a genuinely customer-focused team can provide.
              </p>
              <p className="text-2xl font-semibold text-white mb-8">
                At Fleetory, your delivery is our priority — and we'll go the extra mile to prove it every single time.
              </p>
              <Button 
                size="lg"
                className="bg-logistics-orange hover:bg-logistics-orange-light text-white font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.location.href = '/booking'}
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