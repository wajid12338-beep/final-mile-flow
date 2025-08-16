import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-logistics-dark text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded">
                <img src="/lovable-uploads/a79e44cd-5cd8-4248-aa3a-3b2071208a15.png" alt="Fleetory Logo" className="h-56 w-auto" />
              </div>
            </div>
            <p className="text-white/80 leading-relaxed">
              Professional same-day courier services across the UK. 
              From an urgent envelope to a few pallets, Fleetory has you covered.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-2 text-white/80">
              <li><a href="#services" className="hover:text-logistics-orange transition-colors duration-200">Standard Same Day Delivery</a></li>
              <li><a href="#services" className="hover:text-logistics-orange transition-colors duration-200">Timed Delivery</a></li>
              <li><a href="#services" className="hover:text-logistics-orange transition-colors duration-200">Heavy Haulage</a></li>
              <li><a href="#services" className="hover:text-logistics-orange transition-colors duration-200">Bespoke Logistics Solutions</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-white/80">
              <li><a href="/fleet" className="hover:text-logistics-orange transition-colors duration-200">Fleet</a></li>
              <li><a href="/industries" className="hover:text-logistics-orange transition-colors duration-200">Industries</a></li>
              <li><a href="/about" className="hover:text-logistics-orange transition-colors duration-200">About Us</a></li>
              <li><a href="/booking" className="hover:text-logistics-orange transition-colors duration-200">Get Quote</a></li>
              <li><a href="/contact" className="hover:text-logistics-orange transition-colors duration-200">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 mb-3">
                <Phone className="h-5 w-5 text-logistics-orange flex-shrink-0" />
                <div className="text-white/80">
                  <div>+44 7539868853</div>
                  <div>+44 7352288232</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 mb-3">
                <MessageCircle className="h-5 w-5 text-logistics-orange flex-shrink-0" />
                <a 
                  href="https://wa.me/447352288232" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-logistics-orange transition-colors duration-200"
                >
                  Contact us via WhatsApp
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-logistics-orange flex-shrink-0" />
                <span className="text-white/80">Fleetory@outlook.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-logistics-orange flex-shrink-0 mt-0.5" />
                <div className="text-white/80">
                  <p>Available nationwide</p>
                  <p>United Kingdom</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm">
              © 2024 Fleetory. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-white/60">
              <a href="#" className="hover:text-logistics-orange transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-logistics-orange transition-colors duration-200">Terms of Service</a>
              <a href="#" className="hover:text-logistics-orange transition-colors duration-200">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;