import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Helmet } from "react-helmet-async";

const FAQ = () => {
  const faqs = [
    {
      question: "What areas do Fleetory's courier services cover?",
      answer: "Fleetory provides nationwide courier services across the UK, including major cities and rural areas. Whether you need same-day delivery or overnight courier services, we've got you covered."
    },
    {
      question: "What types of deliveries can I book with Fleetory?",
      answer: `We offer:
• Same-Day Delivery – fast, urgent deliveries within the UK
• Overnight Courier Services – next-day delivery for time-sensitive parcels
• Standard and Scheduled Deliveries – flexible options for non-urgent shipments
We cater to businesses and individuals of all sizes.`
    },
    {
      question: "How do I book a courier with Fleetory?",
      answer: `Booking is simple:
1. Visit our website and select same-day or overnight delivery
2. Enter your pickup and delivery details
3. Choose your preferred delivery speed
4. Complete payment securely online
5. Receive live updates on your parcel, and you will always have the driver's contact details if you want to provide special instructions or check a more precise ETA`
    },
    {
      question: "How much does a Fleetory delivery cost?",
      answer: `Delivery costs depend on:
• Parcel size and weight
• Pickup and drop-off locations
• Delivery speed (same-day vs overnight)
You can get an instant quote on our website by entering your delivery details.`
    },
    {
      question: "Can I track my parcel?",
      answer: "Yes! While we don't offer real-time tracking, we provide live updates and the driver's contact details so you can speak directly with them for special instructions or a more precise delivery time."
    },
    {
      question: "What items can Fleetory deliver?",
      answer: "We handle most parcels, including documents, packages, and small freight. Some restricted items cannot be shipped (e.g., hazardous materials). Contact our support team if you're unsure."
    },
    {
      question: "What happens if my parcel is lost or damaged?",
      answer: `Fleetory takes parcel safety seriously. If a parcel is lost or damaged:
• Report the issue immediately via our support email or phone
• Our team will investigate and provide a resolution, including compensation if applicable`
    },
    {
      question: "How does Fleetory protect my personal information?",
      answer: "Fleetory is fully GDPR compliant. Your data is stored securely and only used to process your deliveries. Read our Privacy Policy for full details."
    },
    {
      question: "Can businesses use Fleetory for regular deliveries?",
      answer: "Yes! Fleetory works with businesses across the UK for regular same-day and overnight deliveries. We offer tailored solutions for high-volume shipping."
    },
    {
      question: "How can I contact Fleetory support?",
      answer: `You can reach us:
• Email: info@fleetory.co.uk
• Phone: +447539 868853
• WhatsApp: +447539 868853`
    },
    {
      question: "What are your delivery time windows?",
      answer: "Our same-day deliveries typically complete within 1-4 hours depending on distance and traffic. Overnight deliveries arrive by 12pm the next working day. We also offer timed delivery slots for specific requirements."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit and debit cards, PayPal, and bank transfers. For business accounts, we also offer invoice payments with approved credit terms."
    },
    {
      question: "Can I cancel or reschedule my delivery?",
      answer: "Yes, you can cancel or reschedule deliveries. Same-day deliveries can be cancelled up to 30 minutes before pickup. Overnight and scheduled deliveries can be cancelled or rescheduled up to 2 hours before the collection time."
    },
    {
      question: "Do you provide proof of delivery?",
      answer: "Yes, we provide digital proof of delivery including recipient signature, photo confirmation, and GPS location stamp. This is automatically sent to you via email once delivery is completed."
    },
    {
      question: "Are my parcels insured during transit?",
      answer: "All parcels are covered by our standard transit insurance up to £100. Additional insurance coverage is available for high-value items up to £10,000 for a small additional fee."
    },
    {
      question: "Do you handle fragile or special requirement items?",
      answer: "Yes, we have experience handling fragile items, medical supplies, legal documents, and other special requirement deliveries. Please specify any special handling requirements when booking."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>FAQ - Fleetory Courier Services | Same-Day Delivery Questions</title>
        <meta 
          name="description" 
          content="Find answers to frequently asked questions about Fleetory's same-day and overnight courier services across the UK. Coverage, pricing, tracking, and more." 
        />
        <meta 
          name="keywords" 
          content="courier FAQ, same day delivery questions, UK courier service help, delivery tracking, shipping costs, parcel delivery" 
        />
        <link rel="canonical" href={`${window.location.origin}/faq`} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-44 pb-16 bg-gradient-to-br from-primary to-primary/80">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center text-primary-foreground">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl md:text-2xl leading-relaxed opacity-90 mb-4">
                Everything you need to know about Fleetory's courier services
              </p>
              <p className="text-lg leading-relaxed opacity-80">
                Quick answers to common questions about same-day delivery, pricing, tracking, and more
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Get Your Questions Answered
                </h2>
                <p className="text-lg text-muted-foreground">
                  Can't find what you're looking for? Contact our support team at{" "}
                  <a 
                    href="mailto:info@fleetory.co.uk" 
                    className="text-primary hover:underline font-semibold"
                  >
                    info@fleetory.co.uk
                  </a>
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border border-border rounded-lg px-6 bg-card"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-6">
                      <h3 className="font-semibold text-foreground pr-4">
                        {faq.question}
                      </h3>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                        {faq.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* Contact CTA */}
              <div className="mt-16 text-center bg-muted rounded-lg p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Still have questions?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Our customer support team is available to help you with any queries about our courier services.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="mailto:info@fleetory.co.uk"
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                  >
                    Email Support
                  </a>
                  <a 
                    href="tel:+447539868853"
                    className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors font-semibold"
                  >
                    Call +44 7539 868853
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default FAQ;