import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, Settings, Package, Truck, CheckCircle, ArrowRight, Clock } from "lucide-react";

const Manufacturing = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* SEO-optimized hero section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-logistics-blue to-logistics-blue-light">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Manufacturing Courier Services
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed opacity-90 mb-8">
              Just-in-time parts delivery and supply chain support across the UK
            </p>
            <p className="text-lg leading-relaxed opacity-80 max-w-3xl mx-auto mb-8">
              Fleetory provides specialized courier services for manufacturing with just-in-time parts delivery, 
              equipment transport, and supply chain support. Our reliable logistics keep your production lines 
              running smoothly and minimize costly downtime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-logistics-orange hover:bg-logistics-orange-light text-white font-semibold px-8 py-4 text-lg"
                onClick={() => window.location.href = '/booking'}
              >
                Get Manufacturing Quote
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

      {/* Manufacturing services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Manufacturing Logistics Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Keeping production lines running with reliable parts and equipment delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Wrench className="h-12 w-12 mx-auto text-orange-500 mb-4" />
                <CardTitle className="text-xl">Parts Delivery</CardTitle>
                <CardDescription>
                  Just-in-time parts delivery to minimize inventory costs and production delays
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Just-in-time delivery",
                    "Critical parts transport",
                    "Emergency replacement parts",
                    "Supplier coordination"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-orange-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Settings className="h-12 w-12 mx-auto text-blue-500 mb-4" />
                <CardTitle className="text-xl">Equipment Transport</CardTitle>
                <CardDescription>
                  Secure transport of manufacturing equipment and machinery components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Heavy machinery transport",
                    "Precision equipment",
                    "Factory relocations",
                    "Equipment installations"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-blue-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Package className="h-12 w-12 mx-auto text-green-500 mb-4" />
                <CardTitle className="text-xl">Supply Chain Support</CardTitle>
                <CardDescription>
                  Complete supply chain logistics from suppliers to production facilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Raw material delivery",
                    "Finished goods transport",
                    "Inter-facility transfers",
                    "Inventory management"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Manufacturing use cases */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Manufacturing Industry Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Supporting manufacturers across automotive, electronics, aerospace, and industrial sectors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Automotive Manufacturing",
                description: "Specialized logistics for automotive parts, components, and finished vehicle transport.",
                features: [
                  "Just-in-time parts delivery",
                  "Component transport",
                  "Vehicle logistics",
                  "Supplier coordination"
                ]
              },
              {
                title: "Electronics Production",
                description: "Secure transport of sensitive electronic components and finished products.",
                features: [
                  "ESD-safe transport",
                  "Component delivery",
                  "Clean room logistics",
                  "Product distribution"
                ]
              },
              {
                title: "Heavy Industry",
                description: "Handling large-scale industrial equipment and machinery transportation.",
                features: [
                  "Heavy machinery transport",
                  "Industrial equipment",
                  "Plant relocations",
                  "Project logistics"
                ]
              },
              {
                title: "Food & Beverage",
                description: "Temperature-controlled logistics for food manufacturing and processing facilities.",
                features: [
                  "Temperature-controlled transport",
                  "Food-grade logistics",
                  "Ingredient delivery",
                  "HACCP compliance"
                ]
              }
            ].map((solution, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-logistics-blue flex items-center">
                    <ArrowRight className="h-5 w-5 text-logistics-orange mr-2" />
                    {solution.title}
                  </CardTitle>
                  <CardDescription className="text-base">{solution.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {solution.features.map((feature, featureIndex) => (
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

      {/* Manufacturing features */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Manufacturing Logistics Expertise
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Specialized knowledge and equipment for manufacturing industry requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 mx-auto text-logistics-orange mb-4" />
                <CardTitle className="text-lg">Just-in-Time</CardTitle>
                <CardDescription>
                  Understanding of lean manufacturing principles and timing requirements
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Truck className="h-12 w-12 mx-auto text-logistics-orange mb-4" />
                <CardTitle className="text-lg">Specialized Fleet</CardTitle>
                <CardDescription>
                  Vehicles equipped for manufacturing equipment and materials transport
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Settings className="h-12 w-12 mx-auto text-logistics-orange mb-4" />
                <CardTitle className="text-lg">Quality Control</CardTitle>
                <CardDescription>
                  Careful handling protocols for precision parts and sensitive equipment
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Package className="h-12 w-12 mx-auto text-logistics-orange mb-4" />
                <CardTitle className="text-lg">Supply Chain</CardTitle>
                <CardDescription>
                  End-to-end supply chain integration and coordination capabilities
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-gradient-to-r from-logistics-blue to-logistics-blue-light">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-6">
              Keep Your Production Lines Moving
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Trust Fleetory for reliable manufacturing logistics. Our just-in-time delivery solutions 
              minimize downtime and keep your operations running at peak efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-logistics-orange hover:bg-logistics-orange-light text-white font-semibold px-8 py-4 text-lg"
                onClick={() => window.location.href = '/booking'}
              >
                Get Manufacturing Quote
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-logistics-blue font-semibold px-8 py-4 text-lg"
              >
                Speak to Manufacturing Specialist
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Manufacturing;