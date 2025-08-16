import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Package, Shield, Settings, CheckCircle, ArrowRight } from "lucide-react";

const HeavyHaulage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* SEO-optimized hero section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-logistics-blue to-logistics-blue-light">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Heavy Haulage & Specialist Delivery
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed opacity-90 mb-8">
              Oversized, palletised, and high-value goods handled with professional care
            </p>
            <p className="text-lg leading-relaxed opacity-80 max-w-3xl mx-auto mb-8">
              From small vans to large Luton vehicles, Fleetory's heavy haulage service handles oversized, 
              palletised, and specialist deliveries across the UK. Our professional drivers and wide range 
              of vehicles ensure your valuable goods arrive safely.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-logistics-orange hover:bg-logistics-orange-light text-white font-semibold px-8 py-4 text-lg"
                onClick={() => window.location.href = '/booking'}
              >
                Get Heavy Haulage Quote
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

      {/* Vehicle options */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Specialist Vehicle Fleet
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From small packages to large palletised goods - we have the right vehicle for every job
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Package,
                title: "Small Van",
                capacity: "Up to 400kg",
                dimensions: "1.4m L x 1.2m W x 1.0m H",
                ideal: "Documents, small boxes, office items"
              },
              {
                icon: Truck,
                title: "Short Wheelbase Van",
                capacity: "Up to 800kg",
                dimensions: "2.0m L x 1.2m W x 1.2m H",
                ideal: "Euro pallets, white goods, small commercial"
              },
              {
                icon: Truck,
                title: "Long Wheelbase Van",
                capacity: "Up to 1100kg",
                dimensions: "3.0m L x 1.2m W x 1.7m H",
                ideal: "Building materials, office moves, long items"
              },
              {
                icon: Truck,
                title: "Extra-Long Wheelbase",
                capacity: "Up to 1100kg",
                dimensions: "4.0m L x 1.36m W x 1.79m H",
                ideal: "Construction materials, bulk transport"
              },
              {
                icon: Truck,
                title: "Luton Van",
                capacity: "Up to 800kg",
                dimensions: "4.0m L x 2.0m W x 2.0m H",
                ideal: "House removals, large furniture"
              },
              {
                icon: Settings,
                title: "Tail-Lift Vehicles",
                capacity: "Various",
                dimensions: "Multiple sizes available",
                ideal: "Heavy items, machinery, equipment"
              }
            ].map((vehicle, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <vehicle.icon className="h-12 w-12 mx-auto text-logistics-orange mb-4" />
                  <CardTitle className="text-xl">{vehicle.title}</CardTitle>
                  <CardDescription className="text-logistics-blue font-semibold">{vehicle.capacity}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Max Dimensions:</p>
                    <p className="text-sm text-gray-600">{vehicle.dimensions}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Ideal For:</p>
                    <p className="text-sm text-gray-600">{vehicle.ideal}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialist services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Specialist Handling Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional handling for your most valuable and delicate items
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Package className="h-8 w-8 text-logistics-orange mb-4" />
                <CardTitle className="text-xl">Palletised Goods</CardTitle>
                <CardDescription>
                  Professional handling of euro pallets and custom palletised shipments with secure loading and transport.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Euro pallet handling",
                    "Custom pallet sizes",
                    "Secure strapping and protection",
                    "Tail-lift loading where needed"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-logistics-orange mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-8 w-8 text-logistics-orange mb-4" />
                <CardTitle className="text-xl">High-Value Items</CardTitle>
                <CardDescription>
                  Secure transport for valuable goods with enhanced security measures and comprehensive insurance coverage.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Enhanced security protocols",
                    "Comprehensive insurance",
                    "Signature required delivery",
                    "Real-time tracking"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-logistics-orange mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Settings className="h-8 w-8 text-logistics-orange mb-4" />
                <CardTitle className="text-xl">Machinery & Equipment</CardTitle>
                <CardDescription>
                  Specialist transport for industrial machinery, IT equipment, and sensitive electronic devices.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Protective packaging",
                    "Shock-resistant transport",
                    "Climate-controlled options",
                    "Professional installation teams"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-logistics-orange mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Truck className="h-8 w-8 text-logistics-orange mb-4" />
                <CardTitle className="text-xl">Building Materials</CardTitle>
                <CardDescription>
                  Construction materials, timber, and building supplies delivered directly to site with appropriate handling.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Site-specific delivery",
                    "Manual handling assistance",
                    "Weather-protected transport",
                    "Flexible scheduling"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-logistics-orange mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Heavy Haulage Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional assessment and handling from collection to delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-logistics-blue rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-semibold mb-4">Assessment</h3>
              <p className="text-gray-600">
                We assess your goods to determine the best vehicle and handling approach.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-logistics-blue rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-semibold mb-4">Vehicle Selection</h3>
              <p className="text-gray-600">
                Appropriate vehicle chosen with necessary equipment like tail-lifts.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-logistics-blue rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-semibold mb-4">Secure Loading</h3>
              <p className="text-gray-600">
                Professional loading with appropriate securing and protection methods.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-logistics-blue rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">4</div>
              <h3 className="text-xl font-semibold mb-4">Safe Delivery</h3>
              <p className="text-gray-600">
                Careful unloading and positioning at your specified location.
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
              Need Heavy Haulage Services?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              From small specialist items to large construction materials, our heavy haulage service 
              handles it all with professional care and the right equipment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-logistics-orange hover:bg-logistics-orange-light text-white font-semibold px-8 py-4 text-lg"
                onClick={() => window.location.href = '/booking'}
              >
                Get Specialist Quote
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-logistics-blue font-semibold px-8 py-4 text-lg"
              >
                Discuss Requirements
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HeavyHaulage;