import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Truck, Wrench, HardHat, CheckCircle, ArrowRight, Timer } from "lucide-react";

const Construction = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* SEO-optimized hero section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-logistics-blue to-logistics-blue-light">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Construction & Trade Courier Services
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed opacity-90 mb-8">
              Building material deliveries and construction site logistics across the UK
            </p>
            <p className="text-lg leading-relaxed opacity-80 max-w-3xl mx-auto mb-8">
              Fleetory provides specialized courier services for the construction industry with urgent tool deliveries, 
              building material transport, and site-to-site logistics. Our fleet can handle everything from small tools 
              to heavy construction equipment across all UK construction sites.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-logistics-orange hover:bg-logistics-orange-light text-white font-semibold px-8 py-4 text-lg"
                onClick={() => window.location.href = '/booking'}
              >
                Get Construction Quote
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

      {/* Construction services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Construction Delivery Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Keeping your construction projects on schedule with reliable delivery services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Building2 className="h-12 w-12 mx-auto text-orange-500 mb-4" />
                <CardTitle className="text-xl">Building Materials</CardTitle>
                <CardDescription>
                  Urgent delivery of construction materials to keep your projects on track
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Urgent material delivery",
                    "Specialist building supplies",
                    "Site-to-site transfer",
                    "Heavy material transport"
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
                <Wrench className="h-12 w-12 mx-auto text-blue-500 mb-4" />
                <CardTitle className="text-xl">Tool & Equipment Delivery</CardTitle>
                <CardDescription>
                  Fast delivery of tools and equipment to construction sites and trade professionals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Power tool delivery",
                    "Heavy equipment transport",
                    "Tool rental logistics",
                    "Emergency tool delivery"
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
                <HardHat className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
                <CardTitle className="text-xl">Site Logistics</CardTitle>
                <CardDescription>
                  Comprehensive logistics support for construction sites and trade operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Multi-site coordination",
                    "Project logistics",
                    "Waste removal",
                    "Supply chain support"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-yellow-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Construction use cases */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Construction Industry Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Supporting builders, contractors, and trade professionals across the UK
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "General Contractors",
                description: "Complete logistics support for general contracting projects from materials to equipment.",
                features: [
                  "Building material delivery",
                  "Equipment transport",
                  "Site coordination",
                  "Emergency supplies"
                ]
              },
              {
                title: "Trade Specialists",
                description: "Specialized delivery services for electricians, plumbers, and other skilled trades.",
                features: [
                  "Specialist tools",
                  "Trade materials",
                  "Component delivery",
                  "Client site delivery"
                ]
              },
              {
                title: "Commercial Projects",
                description: "Large-scale logistics support for commercial construction and infrastructure projects.",
                features: [
                  "Bulk material transport",
                  "Heavy equipment",
                  "Project coordination",
                  "Multi-site logistics"
                ]
              },
              {
                title: "Residential Construction",
                description: "Home building and renovation logistics from materials to finishing supplies.",
                features: [
                  "Home building supplies",
                  "Renovation materials",
                  "Finishing products",
                  "Homeowner delivery"
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

      {/* Construction features */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Why Choose Fleetory for Construction
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Specialized vehicles and experienced drivers for construction industry needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Truck className="h-12 w-12 mx-auto text-logistics-orange mb-4" />
                <CardTitle className="text-lg">Heavy Duty Fleet</CardTitle>
                <CardDescription>
                  Specialized vehicles capable of transporting heavy construction materials
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Timer className="h-12 w-12 mx-auto text-logistics-orange mb-4" />
                <CardTitle className="text-lg">Project Deadlines</CardTitle>
                <CardDescription>
                  Understanding of construction timelines and critical delivery windows
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <HardHat className="h-12 w-12 mx-auto text-logistics-orange mb-4" />
                <CardTitle className="text-lg">Site Access</CardTitle>
                <CardDescription>
                  Experienced with construction site access and safety requirements
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Building2 className="h-12 w-12 mx-auto text-logistics-orange mb-4" />
                <CardTitle className="text-lg">Industry Knowledge</CardTitle>
                <CardDescription>
                  Deep understanding of construction industry logistics and requirements
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
              Keep Your Construction Projects Moving
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Trust Fleetory for reliable construction logistics. From urgent tool delivery to heavy 
              material transport, we keep your projects on schedule and on budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-logistics-orange hover:bg-logistics-orange-light text-white font-semibold px-8 py-4 text-lg"
                onClick={() => window.location.href = '/booking'}
              >
                Get Construction Quote
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-logistics-blue font-semibold px-8 py-4 text-lg"
              >
                Speak to Construction Specialist
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Construction;