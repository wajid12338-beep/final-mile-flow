import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Package, Truck, Users, CheckCircle, ArrowRight, Heart } from "lucide-react";

const Residential = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* SEO-optimized hero section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-logistics-blue to-logistics-blue-light">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Residential Moving & Delivery Services
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed opacity-90 mb-8">
              House removals, furniture delivery, and personal item transport across the UK
            </p>
            <p className="text-lg leading-relaxed opacity-80 max-w-3xl mx-auto mb-8">
              Fleetory provides comprehensive residential services including house removals, furniture delivery, 
              and personal item transport. Our caring team treats your belongings with respect and ensures 
              a stress-free moving experience for families across the UK.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-logistics-orange hover:bg-logistics-orange-light text-white font-semibold px-8 py-4 text-lg"
                onClick={() => window.location.href = '/booking'}
              >
                Get Moving Quote
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

      {/* Residential services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Residential Moving Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional moving and delivery services for homes and families
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Home className="h-12 w-12 mx-auto text-blue-500 mb-4" />
                <CardTitle className="text-xl">House Removals</CardTitle>
                <CardDescription>
                  Complete house moving services with professional packing and careful transport
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Full house moves",
                    "Packing services",
                    "Furniture disassembly",
                    "Storage solutions"
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
                <CardTitle className="text-xl">Furniture Delivery</CardTitle>
                <CardDescription>
                  Safe delivery and installation of furniture and large household items
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Furniture delivery",
                    "Appliance transport",
                    "Assembly services",
                    "Two-man teams"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Heart className="h-12 w-12 mx-auto text-red-500 mb-4" />
                <CardTitle className="text-xl">Personal Items</CardTitle>
                <CardDescription>
                  Careful transport of valuable and sentimental personal belongings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Valuables transport",
                    "Artwork handling",
                    "Antique furniture",
                    "Personal collections"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-red-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Residential use cases */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Residential Moving Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Supporting families and individuals with all types of residential moves
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Local House Moves",
                description: "Complete local moving services within cities and surrounding areas.",
                features: [
                  "Same-day moves",
                  "Local relocations",
                  "Apartment moves",
                  "Studio relocations"
                ]
              },
              {
                title: "Long-Distance Moves",
                description: "Nationwide moving services for relocations across the UK.",
                features: [
                  "Cross-country moves",
                  "Interstate relocations",
                  "Temporary storage",
                  "Delivery coordination"
                ]
              },
              {
                title: "Student Moves",
                description: "Specialized moving services for students and university relocations.",
                features: [
                  "University moves",
                  "Student accommodation",
                  "Holiday storage",
                  "Graduate relocations"
                ]
              },
              {
                title: "Senior Relocations",
                description: "Compassionate moving services for seniors and assisted living transitions.",
                features: [
                  "Senior-friendly service",
                  "Care home moves",
                  "Downsizing support",
                  "Family coordination"
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

      {/* Residential features */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Why Families Choose Fleetory
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Trusted residential moving services with care and professionalism
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="h-12 w-12 mx-auto text-logistics-orange mb-4" />
                <CardTitle className="text-lg">Personal Care</CardTitle>
                <CardDescription>
                  Treating your belongings with the same care we'd want for our own
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 mx-auto text-logistics-orange mb-4" />
                <CardTitle className="text-lg">Experienced Team</CardTitle>
                <CardDescription>
                  Professional movers with years of experience in residential relocations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Package className="h-12 w-12 mx-auto text-logistics-orange mb-4" />
                <CardTitle className="text-lg">Full Insurance</CardTitle>
                <CardDescription>
                  Comprehensive insurance coverage for peace of mind during your move
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Truck className="h-12 w-12 mx-auto text-logistics-orange mb-4" />
                <CardTitle className="text-lg">Modern Fleet</CardTitle>
                <CardDescription>
                  Clean, well-maintained vehicles equipped for safe furniture transport
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
              Make Your Move Stress-Free
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Trust Fleetory for your residential moving needs. Our professional team makes 
              moving day smooth and stress-free, so you can focus on settling into your new home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-logistics-orange hover:bg-logistics-orange-light text-white font-semibold px-8 py-4 text-lg"
                onClick={() => window.location.href = '/booking'}
              >
                Get Moving Quote
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-logistics-blue font-semibold px-8 py-4 text-lg"
              >
                Speak to Moving Specialist
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Residential;