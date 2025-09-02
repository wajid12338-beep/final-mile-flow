import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { User, LogOut, Menu, X } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const Header = () => {
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Failed to sign out');
    } else {
      toast.success('Signed out successfully');
    }
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center hover:opacity-80 transition-opacity duration-200">
            <img src="/lovable-uploads/a79e44cd-5cd8-4248-aa3a-3b2071208a15.png" alt="Fleetory Logo" className="h-16 w-auto" />
          </a>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex flex-1 justify-center">
            <NavigationMenu>
            <NavigationMenuList className="space-x-1">
              <NavigationMenuItem>
                <NavigationMenuLink href="/" className="text-foreground hover:text-logistics-blue transition-colors duration-200 font-medium px-3 py-2 text-sm whitespace-nowrap">
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-foreground hover:text-logistics-blue transition-colors duration-200 font-medium bg-transparent px-3 py-2 text-sm">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-80 p-4 bg-white shadow-lg border rounded-lg z-50">
                    <div className="space-y-3">
                      <NavigationMenuLink href="/services/same-day-delivery" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="font-semibold text-logistics-blue">Same Day Delivery</div>
                        <div className="text-sm text-gray-600">Guaranteed same day arrival with rapid collection</div>
                      </NavigationMenuLink>
                      <NavigationMenuLink href="/services/timed-delivery" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="font-semibold text-logistics-blue">Timed Delivery</div>
                        <div className="text-sm text-gray-600">Scheduled pickup and drop-off with guaranteed time slots</div>
                      </NavigationMenuLink>
                      <NavigationMenuLink href="/services/light-haulage" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="font-semibold text-logistics-blue">Light Haulage</div>
                        <div className="text-sm text-gray-600">Oversized and specialist deliveries with professional handling</div>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink href="/fleet" className="text-foreground hover:text-logistics-blue transition-colors duration-200 font-medium px-3 py-2 text-sm whitespace-nowrap">
                  Our Fleet
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-foreground hover:text-logistics-blue transition-colors duration-200 font-medium bg-transparent px-3 py-2 text-sm">
                  Industries
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-80 p-4 bg-white shadow-lg border rounded-lg z-50">
                    <div className="space-y-3">
                      <NavigationMenuLink href="/industries/healthcare" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="font-semibold text-logistics-blue">Healthcare & Medical</div>
                        <div className="text-sm text-gray-600">Medical supplies and pharmaceutical transport</div>
                      </NavigationMenuLink>
                      <NavigationMenuLink href="/industries/legal-services" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="font-semibold text-logistics-blue">Legal Services</div>
                        <div className="text-sm text-gray-600">Legal document delivery and court filing</div>
                      </NavigationMenuLink>
                      <NavigationMenuLink href="/industries/construction" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="font-semibold text-logistics-blue">Construction & Trade</div>
                        <div className="text-sm text-gray-600">Building materials and site logistics</div>
                      </NavigationMenuLink>
                      <NavigationMenuLink href="/industries/retail" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="font-semibold text-logistics-blue">Retail & E-commerce</div>
                        <div className="text-sm text-gray-600">Last-mile delivery and inventory solutions</div>
                      </NavigationMenuLink>
                      <NavigationMenuLink href="/industries/manufacturing" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="font-semibold text-logistics-blue">Manufacturing</div>
                        <div className="text-sm text-gray-600">Just-in-time parts and supply chain support</div>
                      </NavigationMenuLink>
                      <NavigationMenuLink href="/industries/residential" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="font-semibold text-logistics-blue">Residential Services</div>
                        <div className="text-sm text-gray-600">House removals and furniture delivery</div>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink href="/about" className="text-foreground hover:text-logistics-blue transition-colors duration-200 font-medium px-3 py-2 text-sm whitespace-nowrap">
                  About Us
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink href="/faq" className="text-foreground hover:text-logistics-blue transition-colors duration-200 font-medium px-3 py-2 text-sm whitespace-nowrap">
                  FAQ
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink href="/contact" className="text-foreground hover:text-logistics-blue transition-colors duration-200 font-medium px-3 py-2 text-sm whitespace-nowrap">
                  Contact Us
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink href="/booking" className="text-foreground hover:text-logistics-blue transition-colors duration-200 font-medium px-3 py-2 text-sm whitespace-nowrap">
                  Book Now
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          </div>

          {/* Right side - Auth + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Auth Section - Hidden on small screens */}
            <div className="hidden sm:flex items-center gap-3">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Welcome
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white z-50">
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild variant="outline">
                  <a href="/auth">Sign In</a>
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white z-50">
                <div className="flex flex-col space-y-4 mt-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Menu</h2>
                  </div>
                  
                  <nav className="flex flex-col space-y-4">
                    <a href="/" onClick={closeMobileMenu} className="text-foreground hover:text-logistics-blue transition-colors font-medium py-2">
                      Home
                    </a>
                    
                    <div className="space-y-2">
                      <div className="font-medium text-foreground py-2">Services</div>
                      <div className="pl-4 space-y-2">
                        <a href="/services/same-day-delivery" onClick={closeMobileMenu} className="block text-muted-foreground hover:text-logistics-blue transition-colors py-1">
                          Same Day Delivery
                        </a>
                        <a href="/services/timed-delivery" onClick={closeMobileMenu} className="block text-muted-foreground hover:text-logistics-blue transition-colors py-1">
                          Timed Delivery
                        </a>
                        <a href="/services/light-haulage" onClick={closeMobileMenu} className="block text-muted-foreground hover:text-logistics-blue transition-colors py-1">
                          Light Haulage
                        </a>
                      </div>
                    </div>

                    <a href="/fleet" onClick={closeMobileMenu} className="text-foreground hover:text-logistics-blue transition-colors font-medium py-2">
                      Our Fleet
                    </a>

                    <div className="space-y-2">
                      <div className="font-medium text-foreground py-2">Industries</div>
                      <div className="pl-4 space-y-2">
                        <a href="/industries/healthcare" onClick={closeMobileMenu} className="block text-muted-foreground hover:text-logistics-blue transition-colors py-1">
                          Healthcare & Medical
                        </a>
                        <a href="/industries/legal-services" onClick={closeMobileMenu} className="block text-muted-foreground hover:text-logistics-blue transition-colors py-1">
                          Legal Services
                        </a>
                        <a href="/industries/construction" onClick={closeMobileMenu} className="block text-muted-foreground hover:text-logistics-blue transition-colors py-1">
                          Construction & Trade
                        </a>
                        <a href="/industries/retail" onClick={closeMobileMenu} className="block text-muted-foreground hover:text-logistics-blue transition-colors py-1">
                          Retail & E-commerce
                        </a>
                        <a href="/industries/manufacturing" onClick={closeMobileMenu} className="block text-muted-foreground hover:text-logistics-blue transition-colors py-1">
                          Manufacturing
                        </a>
                        <a href="/industries/residential" onClick={closeMobileMenu} className="block text-muted-foreground hover:text-logistics-blue transition-colors py-1">
                          Residential Services
                        </a>
                      </div>
                    </div>

                    <a href="/about" onClick={closeMobileMenu} className="text-foreground hover:text-logistics-blue transition-colors font-medium py-2">
                      About Us
                    </a>

                    <a href="/faq" onClick={closeMobileMenu} className="text-foreground hover:text-logistics-blue transition-colors font-medium py-2">
                      FAQ
                    </a>

                    <a href="/contact" onClick={closeMobileMenu} className="text-foreground hover:text-logistics-blue transition-colors font-medium py-2">
                      Contact Us
                    </a>

                    <a href="/booking" onClick={closeMobileMenu} className="bg-logistics-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-logistics-blue/90 transition-colors text-center">
                      Book Now
                    </a>

                    {/* Mobile Auth Section */}
                    <div className="pt-4 border-t border-border mt-6">
                      {user ? (
                        <Button onClick={handleSignOut} variant="outline" className="w-full">
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </Button>
                      ) : (
                        <Button asChild variant="outline" className="w-full">
                          <a href="/auth">Sign In</a>
                        </Button>
                      )}
                    </div>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;