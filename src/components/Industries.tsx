import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Heart, Utensils, Plane, Calendar, Package } from "lucide-react";

const Industries = () => {
  const industries = [
    {
      icon: ShoppingBag,
      title: "Retail",
      description: "Fast last-mile delivery for retail chains and e-commerce businesses.",
    },
    {
      icon: Heart,
      title: "Healthcare",
      description: "Secure, temperature-controlled delivery for medical supplies and pharmaceuticals.",
    },
    {
      icon: Utensils,
      title: "Food & Beverage",
      description: "Fresh food delivery with proper handling and temperature management.",
    },
    {
      icon: Plane,
      title: "Aerospace & Automotive",
      description: "Specialized handling for high-value components and parts.",
    },
    {
      icon: Calendar,
      title: "Events & Marketing",
      description: "Time-critical delivery for events, exhibitions, and marketing campaigns.",
    },
    {
      icon: Package,
      title: "Wholesale Distribution",
      description: "Bulk delivery solutions for distributors and manufacturers.",
    },
  ];

  return (
    <section className="py-20 bg-logistics-gray">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Industry Expertise
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Specialized logistics solutions tailored to the unique requirements 
            of different industries and sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <Card 
              key={index}
              className="group hover:shadow-lg transition-all duration-300 bg-white border-0 hover:border-logistics-orange/20 hover:-translate-y-1"
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-14 h-14 bg-gradient-to-br from-logistics-orange to-logistics-orange-light rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <industry.icon className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground group-hover:text-logistics-blue transition-colors duration-300">
                  {industry.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center leading-relaxed">
                  {industry.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coverage Area */}
        <div className="mt-20">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Nationwide UK Coverage
                </h3>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  From Scotland to Cornwall, our comprehensive delivery network 
                  ensures reliable service across the entire United Kingdom.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-logistics-orange rounded-full mr-4" />
                    <span className="text-foreground font-medium">Complete UK mainland coverage</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-logistics-orange rounded-full mr-4" />
                    <span className="text-foreground font-medium">Major city and rural area delivery</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-logistics-orange rounded-full mr-4" />
                    <span className="text-foreground font-medium">Strategic depot locations</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/src/assets/uk-coverage.jpg"
                  alt="UK delivery coverage map"
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Industries;