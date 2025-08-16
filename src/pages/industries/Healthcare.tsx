import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Thermometer, Clock, Shield, CheckCircle, ArrowRight, Truck } from "lucide-react";

const Healthcare = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* SEO-optimized hero section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-logistics-blue to-logistics-blue-light">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Healthcare & Medical Courier Services
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed opacity-90 mb-8">
              Urgent medical supply deliveries and pharmaceutical transport across the UK
            </p>
            <p className="text-lg leading-relaxed opacity-80 max-w-3xl mx-auto mb-8">
              Fleetory provides specialized courier services for the healthcare industry with temperature-controlled 
              transport, urgent medical supply deliveries, and pharmaceutical logistics. Our certified drivers understand 
              the critical nature of medical deliveries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-logistics-orange hover:bg-logistics-orange-light text-white font-semibold px-8 py-4 text-lg"
                onClick={() => window.location.href = '/booking'}
              >
                Get Medical Courier Quote
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-logistics-blue font-semibold px-8 py-4 text-lg"
              >
                Emergency Line: 0800 123 4567
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Medical services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Specialized Medical Delivery Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional handling of medical supplies, pharmaceuticals, and laboratory specimens
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Heart className="h-12 w-12 mx-auto text-red-500 mb-4" />
                <CardTitle className="text-xl">Emergency Medical Supplies</CardTitle>
                <CardDescription>
                  Critical medical equipment and supplies delivered with emergency priority
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Life-saving medications",
                    "Emergency equipment",
                    "Blood products transport",
                    "24/7 availability"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-red-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Thermometer className="h-12 w-12 mx-auto text-blue-500 mb-4" />
                <CardTitle className="text-xl">Temperature-Controlled Transport</CardTitle>
                <CardDescription>
                  Climate-controlled delivery for temperature-sensitive pharmaceuticals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Refrigerated vehicles",
                    "Frozen transport options",
                    "Temperature monitoring",
                    "Vaccine delivery"
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
                <Shield className="h-12 w-12 mx-auto text-green-500 mb-4" />
                <CardTitle className="text-xl">Laboratory Specimens</CardTitle>
                <CardDescription>
                  Secure transport of biological samples and laboratory materials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Secure specimen transport",
                    "Chain of custody tracking",
                    "Biohazard handling",
                    "Time-critical delivery"
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

      {/* Healthcare use cases */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Healthcare Delivery Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Supporting healthcare providers across hospitals, clinics, and pharmacies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Hospital-to-Hospital Transfers",
                description: "Urgent transfers of medical equipment, supplies, and patient records between healthcare facilities.",
                features: [
                  "Emergency equipment transfer",
                  "Patient record delivery",
                  "Medical device transport",
                  "Inter-hospital logistics"
                ]
              },
              {
                title: "Pharmacy Distribution",
                description: "Reliable pharmaceutical delivery to pharmacies, clinics, and healthcare providers.",
                features: [
                  "Prescription medications",
                  "Controlled substance transport",
                  "Pharmacy stock replenishment",
                  "Patient home delivery"
                ]
              },
              {
                title: "GP Practice Support",
                description: "Medical supplies and equipment delivery to GP surgeries and primary care facilities.",
                features: [
                  "Surgery equipment",
                  "Medical consumables",
                  "Vaccination supplies",
                  "Diagnostic equipment"
                ]
              },
              {
                title: "Care Home Services",
                description: "Specialized delivery services for residential care facilities and nursing homes.",
                features: [
                  "Medication delivery",
                  "Medical equipment",
                  "Specialized care supplies",
                  "Emergency provisions"
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

      {/* Compliance and safety */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Healthcare Compliance & Safety
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Full compliance with healthcare regulations and safety standards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 mx-auto text-logistics-orange mb-4" />
                <CardTitle className="text-lg">GDPR Compliant</CardTitle>
                <CardDescription>
                  Full data protection compliance for patient information and medical records
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 mx-auto text-logistics-orange mb-4" />
                <CardTitle className="text-lg">Time-Critical Service</CardTitle>
                <CardDescription>
                  Understanding the urgent nature of medical deliveries with priority handling
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Thermometer className="h-12 w-12 mx-auto text-logistics-orange mb-4" />
                <CardTitle className="text-lg">Temperature Validation</CardTitle>
                <CardDescription>
                  Continuous monitoring and validation of temperature-sensitive shipments
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Truck className="h-12 w-12 mx-auto text-logistics-orange mb-4" />
                <CardTitle className="text-lg">Specialized Vehicles</CardTitle>
                <CardDescription>
                  Medical-grade transport vehicles equipped for healthcare deliveries
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
              Partner with Healthcare Delivery Experts
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Trust Fleetory for your critical healthcare deliveries. Our specialized medical courier 
              service ensures your patients receive what they need, when they need it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-logistics-orange hover:bg-logistics-orange-light text-white font-semibold px-8 py-4 text-lg"
                onClick={() => window.location.href = '/booking'}
              >
                Get Medical Quote
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-logistics-blue font-semibold px-8 py-4 text-lg"
              >
                Speak to Healthcare Specialist
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Healthcare;