import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Industries from "@/components/Industries";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="p-8">
        <h1 className="text-4xl font-bold text-black mb-4">Fleetory Courier Service</h1>
        <p className="text-lg text-gray-600">Professional same-day courier services across the UK.</p>
        <div className="mt-8">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
            Test Button
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
