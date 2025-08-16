import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Truck, Users, MapPin } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Clock,
      title: "Standard Same Day Delivery",
      description: "Guaranteed Same Day Arrival - No Delays. Perfect for time-sensitive shipments that need to arrive by the end of the day.",
      features: ["Rapid collection (usually within 60 minutes)", "Direct delivery with drivers tracked from start to finish", "POD (Proof of Delivery) provided immediately", "Legal documents, business parcels, urgent stock items"],
    },
    {
      icon: MapPin,
      title: "Timed Delivery",
      description: "When your delivery has a deadline - we make it happen. Ideal when your package must arrive at a specific time.",
      features: ["Scheduled pickup and drop-off", "Guaranteed time-slot delivery", "Ideal for coordinated logistics", "Medical supplies, installation teams, event deliveries"],
    },
    {
      icon: Truck,
      title: "Heavy Haulage & Specialist Deliveries",
      description: "Oversized, palletised, or high-value goods — handled with care. Wide range of vehicle options and professional handling.",
      features: ["Motorcycle to Luton Van options", "Tail-lift access (where required)", "Goods in Transit insurance", "Fragile equipment or household goods"],
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6" id="services">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We're proud to offer a nationwide same-day courier service. Thanks to our extensive network of drivers, 
            we can guarantee a collection anywhere in the UK within 60 minutes of your booking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-logistics-orange/20"
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-logistics-blue to-logistics-blue-light rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground group-hover:text-logistics-blue transition-colors duration-300">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base text-muted-foreground leading-relaxed">
                  {service.description}
                </CardDescription>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-foreground">
                      <div className="w-2 h-2 bg-logistics-orange rounded-full mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full mt-6 bg-logistics-orange hover:bg-logistics-orange-light text-white font-semibold transition-all duration-300"
                  onClick={() => window.location.href = '/booking'}
                >
                  Get a Quote
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 24/7 Availability Banner */}
        <div className="bg-gradient-to-r from-logistics-blue to-logistics-blue-light rounded-2xl p-8 md:p-12 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <Clock className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Available 24/7, 365 Days
            </h3>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Our services never stop. Whether it's midnight, weekend, or bank holiday - 
              we're here to deliver when you need us most.
            </p>
            <Button 
              size="lg"
              className="bg-logistics-orange hover:bg-logistics-orange-light text-white font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.location.href = '/contact'}
            >
              Request Call Back
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;