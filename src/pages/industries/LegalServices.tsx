import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Gavel, Clock, Shield, FileText, CheckCircle, ArrowRight, Scale } from "lucide-react";

const LegalServices = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* SEO-optimized hero section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-logistics-blue to-logistics-blue-light">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Legal Courier Services
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed opacity-90 mb-8">
              Time-critical legal document delivery and court filing services across the UK
            </p>
            <p className="text-lg leading-relaxed opacity-80 max-w-3xl mx-auto mb-8">
              Fleetory provides specialized courier services for the legal sector with confidential document transport, 
              court filing services, and time-critical legal deliveries. Our bonded drivers understand the sensitive 
              nature of legal documents and maintain strict confidentiality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-logistics-orange hover:bg-logistics-orange-light text-white font-semibold px-8 py-4 text-lg"
                onClick={() => window.location.href = '/booking'}
              >
                Get Legal Courier Quote
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

      {/* Legal services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Specialized Legal Document Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional handling of confidential legal documents with proof of delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Gavel className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <CardTitle className="text-xl">Court Document Filing</CardTitle>
                <CardDescription>
                  Urgent court document delivery and filing services with proof of receipt
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Same-day court filing",
                    "Urgent legal documents",
                    "Proof of delivery",
                    "Time-stamped receipts"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-blue-600 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <FileText className="h-12 w-12 mx-auto text-green-600 mb-4" />
                <CardTitle className="text-xl">Contract & Agreement Delivery</CardTitle>
                <CardDescription>
                  Secure transport of contracts, agreements, and confidential legal papers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Confidential contracts",
                    "Legal agreements",
                    "Witness statements",
                    "Secure handling"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 mx-auto text-purple-600 mb-4" />
                <CardTitle className="text-xl">Evidence Transport</CardTitle>
                <CardDescription>
                  Secure chain of custody for evidence and sensitive legal materials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Evidence handling",
                    "Chain of custody",
                    "Sealed transport",
                    "Documentation trail"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-purple-600 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Legal use cases */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Legal Delivery Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Supporting law firms, courts, and legal professionals across the UK
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Law Firm Services",
                description: "Document delivery between law firms, courts, and clients with complete confidentiality.",
                features: [
                  "Client document delivery",
                  "Inter-firm correspondence",
                  "Court filing services",
                  "Urgent legal papers"
                ]
              },
              {
                title: "Court Services",
                description: "Time-critical court document filing and retrieval services across all UK courts.",
                features: [
                  "Same-day filing",
                  "Document retrieval",
                  "Court deadlines met",
                  "Proof of submission"
                ]
              },
              {
                title: "Corporate Legal",
                description: "Contract delivery and legal document transport for corporate legal departments.",
                features: [
                  "Corporate contracts",
                  "Merger documents",
                  "Compliance papers",
                  "Board resolutions"
                ]
              },
              {
                title: "Litigation Support",
                description: "Evidence transport and document delivery for ongoing litigation cases.",
                features: [
                  "Evidence delivery",
                  "Witness statements",
                  "Discovery documents",
                  "Expert reports"
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

      {/* Legal compliance */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Legal Compliance & Security
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Strict confidentiality and security measures for sensitive legal documents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 mx-auto text-logistics-orange mb-4" />
                <CardTitle className="text-lg">Confidentiality</CardTitle>
                <CardDescription>
                  Strict confidentiality protocols and bonded drivers for sensitive documents
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 mx-auto text-logistics-orange mb-4" />
                <CardTitle className="text-lg">Court Deadlines</CardTitle>
                <CardDescription>
                  Meeting critical court filing deadlines with guaranteed delivery times
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="h-12 w-12 mx-auto text-logistics-orange mb-4" />
                <CardTitle className="text-lg">Proof of Delivery</CardTitle>
                <CardDescription>
                  Comprehensive proof of delivery documentation for legal requirements
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Scale className="h-12 w-12 mx-auto text-logistics-orange mb-4" />
                <CardTitle className="text-lg">Legal Expertise</CardTitle>
                <CardDescription>
                  Understanding of legal procedures and document handling requirements
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
              Trusted Legal Courier Services
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Partner with Fleetory for reliable, confidential legal document delivery. 
              Our experienced team ensures your critical legal documents are handled with care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-logistics-orange hover:bg-logistics-orange-light text-white font-semibold px-8 py-4 text-lg"
                onClick={() => window.location.href = '/booking'}
              >
                Get Legal Quote
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-logistics-blue font-semibold px-8 py-4 text-lg"
              >
                Speak to Legal Specialist
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LegalServices;