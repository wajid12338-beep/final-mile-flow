import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Package, Truck, Users, CheckCircle, ArrowRight, Clock } from "lucide-react";

const Retail = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* SEO-optimized hero section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-logistics-blue to-logistics-blue-light">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Retail & E-commerce Courier Services
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed opacity-90 mb-8">
              Last-mile delivery solutions and inventory logistics across the UK
            </p>
            <p className="text-lg leading-relaxed opacity-80 max-w-3xl mx-auto mb-8">
              Fleetory provides comprehensive courier services for retail and e-commerce businesses with same-day 
              customer deliveries, inventory restocking, and store transfer services. Keep your customers satisfied 
              with our reliable last-mile delivery solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-logistics-orange hover:bg-logistics-orange-light text-white font-semibold px-8 py-4 text-lg"
                onClick={() => window.location.href = '/booking'}
              >
                Get Retail Quote
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

      {/* Retail services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Retail Delivery Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete logistics solutions for retail and e-commerce businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 mx-auto text-green-500 mb-4" />
                <CardTitle className="text-xl">Customer Deliveries</CardTitle>
                <CardDescription>
                  Same-day delivery to your customers for enhanced satisfaction and loyalty
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Same-day customer delivery",
                    "Next-day fulfillment",
                    "Time-slot deliveries",
                    "Customer notifications"
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
                <Package className="h-12 w-12 mx-auto text-blue-500 mb-4" />
                <CardTitle className="text-xl">Inventory Restocking</CardTitle>
                <CardDescription>
                  Urgent inventory deliveries to keep your stores stocked and sales flowing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Urgent stock replenishment",
                    "Supplier to store delivery",
                    "Emergency inventory",
                    "Seasonal stock management"
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
                <ShoppingBag className="h-12 w-12 mx-auto text-purple-500 mb-4" />
                <CardTitle className="text-xl">Store Transfers</CardTitle>
                <CardDescription>
                  Inter-store transfers and returns collection for multi-location retailers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Store-to-store transfers",
                    "Returns collection",
                    "Display transfers",
                    "Equipment movement"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-purple-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Retail use cases */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Retail Industry Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Supporting retailers, e-commerce businesses, and shopping centers across the UK
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "E-commerce Fulfillment",
                description: "Complete last-mile delivery solutions for online retailers and marketplaces.",
                features: [
                  "Same-day fulfillment",
                  "Customer delivery",
                  "Returns processing",
                  "Peak season support"
                ]
              },
              {
                title: "High Street Retail",
                description: "Supporting traditional retail stores with inventory and customer delivery services.",
                features: [
                  "Stock replenishment",
                  "Customer home delivery",
                  "Store transfers",
                  "Emergency supplies"
                ]
              },
              {
                title: "Fashion & Clothing",
                description: "Specialized handling for fashion retailers with seasonal collections and sizing.",
                features: [
                  "Garment delivery",
                  "Seasonal collections",
                  "Size exchanges",
                  "Fashion shows logistics"
                ]
              },
              {
                title: "Electronics & Technology",
                description: "Secure transport of high-value electronics and technology products.",
                features: [
                  "High-value items",
                  "Secure transport",
                  "Installation delivery",
                  "Tech support logistics"
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

      {/* Retail features */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Why Retailers Choose Fleetory
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Dedicated solutions for the fast-paced retail and e-commerce environment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 mx-auto text-logistics-orange mb-4" />
                <CardTitle className="text-lg">Same-Day Delivery</CardTitle>
                <CardDescription>
                  Meet customer expectations with rapid same-day delivery options
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 mx-auto text-logistics-orange mb-4" />
                <CardTitle className="text-lg">Customer Focus</CardTitle>
                <CardDescription>
                  Professional drivers providing excellent customer service representation
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Package className="h-12 w-12 mx-auto text-logistics-orange mb-4" />
                <CardTitle className="text-lg">Secure Handling</CardTitle>
                <CardDescription>
                  Careful handling of retail products with appropriate packaging protection
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Truck className="h-12 w-12 mx-auto text-logistics-orange mb-4" />
                <CardTitle className="text-lg">Flexible Fleet</CardTitle>
                <CardDescription>
                  Varied vehicle sizes to handle everything from small parcels to bulk inventory
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
              Boost Your Retail Success
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Partner with Fleetory to enhance your customer experience with reliable delivery services. 
              From inventory management to customer fulfillment, we've got your logistics covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-logistics-orange hover:bg-logistics-orange-light text-white font-semibold px-8 py-4 text-lg"
                onClick={() => window.location.href = '/booking'}
              >
                Get Retail Quote
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-logistics-blue font-semibold px-8 py-4 text-lg"
              >
                Speak to Retail Specialist
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Retail;