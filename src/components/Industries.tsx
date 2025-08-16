import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Heart, Gavel, ShoppingBag, Wrench, Home } from "lucide-react";
import { Link } from "react-router-dom";

const Industries = () => {
  const industries = [
    {
      icon: Heart,
      title: "Healthcare & Medical",
      description: "Urgent medical supply deliveries, pharmaceutical transport, and laboratory sample collection with temperature-controlled options.",
      services: ["Medical equipment delivery", "Pharmaceutical transport", "Laboratory samples", "Emergency medical supplies"],
      link: "/industries/healthcare"
    },
    {
      icon: Gavel,
      title: "Legal Services",
      description: "Time-critical legal document delivery, court filing services, and confidential document transport with proof of delivery.",
      services: ["Court document filing", "Contract delivery", "Evidence transport", "Confidential legal papers"],
      link: "/industries/legal-services"
    },
    {
      icon: Building2,
      title: "Construction & Trade",
      description: "Building material deliveries, tool transport, and site-to-site logistics for construction projects across the UK.",
      services: ["Building materials", "Tool deliveries", "Equipment transport", "Site logistics"],
      link: "/industries/construction"
    },
    {
      icon: ShoppingBag,
      title: "Retail & E-commerce",
      description: "Last-mile delivery solutions, inventory restocking, and urgent retail deliveries to keep your customers satisfied.",
      services: ["Inventory restocking", "Customer deliveries", "Store transfers", "Returns collection"],
      link: "/industries/retail"
    },
    {
      icon: Wrench,
      title: "Manufacturing",
      description: "Just-in-time parts delivery, equipment transport, and supply chain support for manufacturing operations.",
      services: ["Parts delivery", "Equipment transport", "Supply chain support", "Factory-to-factory transfer"],
      link: "/industries/manufacturing"
    },
    {
      icon: Home,
      title: "Residential Services",
      description: "House removals, furniture delivery, and personal item transport with care and professionalism.",
      services: ["House removals", "Furniture delivery", "Personal belongings", "Appliance transport"],
      link: "/industries/residential"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-logistics-blue mb-4">
            Industries We Serve
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From healthcare to construction, legal to retail - Fleetory provides specialized same-day courier services 
            tailored to meet the unique demands of every industry across the UK.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => {
            const IconComponent = industry.icon;
            return (
              <Link to={industry.link} key={index}>
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg cursor-pointer h-full">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-logistics-orange to-logistics-orange-light rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-logistics-blue">{industry.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {industry.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {industry.services.map((service, serviceIndex) => (
                        <li key={serviceIndex} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-logistics-orange rounded-full mr-3 flex-shrink-0"></div>
                          {service}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Don't see your industry? We serve businesses of all types across the UK.
          </p>
          <a 
            href="/booking" 
            className="inline-flex items-center px-8 py-3 bg-logistics-orange hover:bg-logistics-orange-light text-white font-semibold rounded-lg transition-colors duration-300"
          >
            Get Your Custom Quote
          </a>
        </div>
      </div>
    </section>
  );
};

export default Industries;