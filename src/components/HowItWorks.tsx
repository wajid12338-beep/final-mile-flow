import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Phone, CreditCard, Truck, MapPin, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: FileText,
      number: "01",
      title: "Get a Quote",
      description: "Fill in the relevant details with as much detail as you possibly can. Don't worry if you don't know which vehicle you will need as one of our helpful agents will go through all details again and make sure the chosen vehicle is suitable and most efficient method of transport."
    },
    {
      icon: Phone,
      number: "02", 
      title: "Agent Follow-up",
      description: "A specialist agent will then follow up with your preferred method of contact once the form has been submitted and verify all details and ensure correct method of transport has been selected."
    },
    {
      icon: CreditCard,
      number: "03",
      title: "Payment & Confirmation", 
      description: "Once everything is confirmed, a secure payment is taken and confirmation of booking is sent out to the customer."
    },
    {
      icon: Truck,
      number: "04",
      title: "Driver Assignment",
      description: "The job is then sent to the closest driver to pick up point, who will then reach out to the customer to confirm the driver's ETA. The company's promise is to pick up within 60 minutes."
    },
    {
      icon: MapPin,
      number: "05", 
      title: "Tracked Collection",
      description: "The driver then picks up the contents and secures the freight to avoid damage during transit. All drivers are tracked so we can tell you exactly where the driver is at all times during the entire delivery."
    },
    {
      icon: CheckCircle,
      number: "06",
      title: "Proof of Delivery",
      description: "The contents are delivered and proof of delivery is obtained via an image and also signed delivery note."
    }
  ];

  return (
    <section className="py-20 bg-logistics-gray">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Simple, transparent process from quote to delivery. We make same-day courier services easy and reliable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card 
              key={index}
              className="group hover:shadow-lg transition-all duration-300 bg-white border-2 hover:border-logistics-orange/20"
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-logistics-blue to-logistics-blue-light rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 relative">
                  <step.icon className="h-8 w-8 text-white" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-logistics-orange rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{step.number}</span>
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-foreground group-hover:text-logistics-blue transition-colors duration-300">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground leading-relaxed text-center">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;