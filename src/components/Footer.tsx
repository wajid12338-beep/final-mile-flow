import { Truck, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-logistics-dark text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-logistics-orange to-logistics-orange-light rounded-lg flex items-center justify-center">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Onit Logistics</h3>
                <p className="text-sm text-white/70">Final-Mile Excellence</p>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed">
              Professional final-mile and same-day delivery services across the UK. 
              Trusted by businesses since 2019.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-2 text-white/80">
              <li><a href="#" className="hover:text-logistics-orange transition-colors duration-200">Same-Day Courier</a></li>
              <li><a href="#" className="hover:text-logistics-orange transition-colors duration-200">Multi-Drop Delivery</a></li>
              <li><a href="#" className="hover:text-logistics-orange transition-colors duration-200">Van Day Rate Service</a></li>
              <li><a href="#" className="hover:text-logistics-orange transition-colors duration-200">White Glove Delivery</a></li>
            </ul>
          </div>

          {/* Industries */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Industries</h4>
            <ul className="space-y-2 text-white/80">
              <li><a href="#" className="hover:text-logistics-orange transition-colors duration-200">Retail</a></li>
              <li><a href="#" className="hover:text-logistics-orange transition-colors duration-200">Healthcare</a></li>
              <li><a href="#" className="hover:text-logistics-orange transition-colors duration-200">Food & Beverage</a></li>
              <li><a href="#" className="hover:text-logistics-orange transition-colors duration-200">Aerospace & Automotive</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-logistics-orange flex-shrink-0" />
                <span className="text-white/80">0800 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-logistics-orange flex-shrink-0" />
                <span className="text-white/80">info@onitlogistics.co.uk</span>
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
              © 2024 Onit Logistics. All rights reserved.
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