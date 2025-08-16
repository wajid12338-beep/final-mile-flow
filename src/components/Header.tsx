import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { User, LogOut } from "lucide-react";
import { toast } from "sonner";

const Header = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Failed to sign out');
    } else {
      toast.success('Signed out successfully');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-white/90 via-white/70 to-transparent">
      <div className="container mx-auto px-6">
        <div className="flex items-center h-40">
          {/* Logo */}
          <a href="/" className="flex items-center hover:opacity-80 transition-opacity duration-200 mr-8">
            <img src="/lovable-uploads/a79e44cd-5cd8-4248-aa3a-3b2071208a15.png" alt="Fleetory Logo" className="h-32 w-auto" />
          </a>

          {/* Navigation - Centered */}
          <div className="flex-1 flex justify-center">
            <NavigationMenu className="hidden lg:flex">
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
                  <div className="w-80 p-4 bg-white shadow-lg border rounded-lg">
                    <div className="space-y-3">
                      <NavigationMenuLink href="/services/same-day-delivery" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="font-semibold text-logistics-blue">Same Day Delivery</div>
                        <div className="text-sm text-gray-600">Guaranteed same day arrival with rapid collection</div>
                      </NavigationMenuLink>
                      <NavigationMenuLink href="/services/timed-delivery" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="font-semibold text-logistics-blue">Timed Delivery</div>
                        <div className="text-sm text-gray-600">Scheduled pickup and drop-off with guaranteed time slots</div>
                      </NavigationMenuLink>
                      <NavigationMenuLink href="/services/heavy-haulage" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="font-semibold text-logistics-blue">Heavy Haulage</div>
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
                  <div className="w-80 p-4 bg-white shadow-lg border rounded-lg">
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

          {/* Auth Section */}
          <div className="flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Welcome
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
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
        </div>
      </div>
    </header>
  );
};

export default Header;