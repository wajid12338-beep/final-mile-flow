import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Industries from "@/components/Industries";

const IndustriesPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-logistics-blue to-logistics-blue-light">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Industries We Serve
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed opacity-90 mb-8">
              Specialized same-day courier services across every sector
            </p>
            <p className="text-lg leading-relaxed opacity-80 max-w-3xl mx-auto">
              From healthcare emergencies to construction deadlines, Fleetory provides tailored logistics solutions 
              that understand the unique demands of your industry. Our nationwide network ensures your critical 
              deliveries arrive on time, every time.
            </p>
          </div>
        </div>
      </section>

      <Industries />
      <Footer />
    </div>
  );
};

export default IndustriesPage;