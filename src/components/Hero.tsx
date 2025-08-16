import { Button } from "@/components/ui/button";
import { Truck, Clock, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-logistics.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-logistics-blue to-logistics-blue-light overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Professional logistics delivery"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-logistics-blue/80 to-logistics-blue-light/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Fleetory: Nationwide 
            <span className="block text-logistics-orange">Same-Day Courier</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            From an urgent envelope to a few pallets, Fleetory has you covered. Based in Derby, 
            our central logistics hub expertly manages comprehensive same-day delivery solutions 24/7, 365 days a year.
          </p>

          {/* Key Features */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-white/90">
            <div className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-logistics-orange" />
              <span className="font-semibold">60-Minute Collection</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-6 w-6 text-logistics-orange" />
              <span className="font-semibold">Nationwide Service</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-6 w-6 text-logistics-orange" />
              <span className="font-semibold">Fully Insured</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              size="lg" 
              className="bg-logistics-orange hover:bg-logistics-orange-light text-white font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.location.href = '/quotations'}
            >
              Get a Quote
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-logistics-blue font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300"
              onClick={() => window.location.href = '/contact'}
            >
              Request Call Back
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;