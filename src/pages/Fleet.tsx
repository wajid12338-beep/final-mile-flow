import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, Package, Ruler, Weight } from "lucide-react";

const Fleet = () => {
  const vehicles = [
    {
      name: "Small Van",
      description: "Perfect solution for urgent, light-load deliveries. Designed for agility and efficiency, ideal for navigating busy city streets.",
      uses: ["Documents", "Large heavy boxes", "Small office items", "Furniture"],
      maxSize: "1.4m L x 1.2m W x 1.0m H",
      maxWeight: "400kg",
      icon: Package
    },
    {
      name: "SWB Van (Short Wheelbase)",
      description: "Versatile workhorse offering more space while retaining excellent maneuverability. Great balance of capacity and agility.",
      uses: ["Palletized goods", "Couple of euro pallets", "Small-scale commercial deliveries", "White goods"],
      maxSize: "2.0m L x 1.2m W x 1.2m H",
      maxWeight: "800kg",
      icon: Truck
    },
    {
      name: "LWB Van (Long Wheelbase)",
      description: "Built for consignments that require significant space. Capable of carrying up to three pallets and excellent for long items.",
      uses: ["Building materials", "Medium-sized residential moves", "Office moves", "Long items"],
      maxSize: "3.0m L x 1.2m W x 1.7m H", 
      maxWeight: "1100kg",
      icon: Truck
    },
    {
      name: "XLWB Van (Extra-Long Wheelbase)",
      description: "Maximum capacity solution providing extensive loading area. Perfect for high-volume loads and full-pallet consignments.",
      uses: ["Large-scale construction deliveries", "Retail deliveries", "Full-pallet consignments", "Bulk transport"],
      maxSize: "4.0m L x 1.36m W x 1.79m H",
      maxWeight: "1100kg", 
      icon: Truck
    },
    {
      name: "Luton Van",
      description: "Specifically designed for bulkier items and removals. Box-shaped body provides maximum usable space with tail lift for easy loading.",
      uses: ["House removals", "Office removals", "Large furniture deliveries", "Large-scale consignments"],
      maxSize: "4.0m L x 2.0m W x 2.0m H",
      maxWeight: "800kg",
      icon: Truck
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
              Our Fleet
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed opacity-90 mb-8">
              "The Network That Moves You" isn't just a tagline, it's our promise.
            </p>
            <p className="text-lg leading-relaxed opacity-80 max-w-3xl mx-auto">
              We understand that every delivery is unique, which is why we offer a comprehensive range of vehicles to suit every need. Through our extensive network of trusted partners, we provide access to a diverse and versatile fleet, meticulously managed to handle consignments of all sizes.
            </p>
          </div>
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {vehicles.map((vehicle, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-logistics-orange/20">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-logistics-blue to-logistics-blue-light rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <vehicle.icon className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-foreground group-hover:text-logistics-blue transition-colors duration-300">
                        {vehicle.name}
                      </CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {vehicle.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Specifications */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <Ruler className="h-5 w-5 text-logistics-blue" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Max Size</p>
                        <p className="text-sm text-muted-foreground">{vehicle.maxSize}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <Weight className="h-5 w-5 text-logistics-orange" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Max Weight</p>
                        <p className="text-sm text-muted-foreground">{vehicle.maxWeight}</p>
                      </div>
                    </div>
                  </div>

                  {/* Common Uses */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">Common Uses:</h4>
                    <div className="flex flex-wrap gap-2">
                      {vehicle.uses.map((use, useIndex) => (
                        <Badge key={useIndex} variant="secondary" className="text-xs">
                          {use}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-logistics-blue to-logistics-blue-light rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Not Sure Which Vehicle You Need?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              You can check our Fleet page to see the capacity and dimensions of each vehicle type. If you're still unsure, simply leave a short message in the notes section of your booking. One of our specialists will follow up to confirm the details of your shipment.
            </p>
            <Button 
              size="lg"
              className="bg-logistics-orange hover:bg-logistics-orange-light text-white font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.location.href = '/quotations'}
            >
              Get Your Quote Now
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Fleet;