import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center hover:opacity-80 transition-opacity duration-200">
            <img src="/lovable-uploads/a79e44cd-5cd8-4248-aa3a-3b2071208a15.png" alt="Fleetory Logo" className="h-12 w-auto" />
          </a>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-foreground hover:text-logistics-blue transition-colors duration-200 font-medium">
              Services
            </a>
            <a href="/fleet" className="text-foreground hover:text-logistics-blue transition-colors duration-200 font-medium">
              Fleet
            </a>
            <a href="/industries" className="text-foreground hover:text-logistics-blue transition-colors duration-200 font-medium">
              Industries
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