import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-logistics-blue to-logistics-blue-light rounded-lg flex items-center justify-center">
              <Truck className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-logistics-blue">Fleetory</h1>
              <p className="text-xs text-muted-foreground">The network that moves you</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-foreground hover:text-logistics-blue transition-colors duration-200 font-medium">
              Services
            </a>
            <a href="/fleet" className="text-foreground hover:text-logistics-blue transition-colors duration-200 font-medium">
              Fleet
            </a>
            <a href="/about" className="text-foreground hover:text-logistics-blue transition-colors duration-200 font-medium">
              About
            </a>
            <a href="#contact" className="text-foreground hover:text-logistics-blue transition-colors duration-200 font-medium">
              Contact
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="hidden sm:inline-flex border-logistics-blue text-logistics-blue hover:bg-logistics-blue hover:text-white transition-all duration-300"
            >
              Track Delivery
            </Button>
            <Button 
              className="bg-logistics-orange hover:bg-logistics-orange-light text-white font-semibold transition-all duration-300"
              onClick={() => window.location.href = '/quotations'}
            >
              Get Quote
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;