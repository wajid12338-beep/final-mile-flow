import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Booking from "./pages/Booking";
import NotFound from "./pages/NotFound";
import Quotations from "./pages/Quotations";
import About from "./pages/About";
import Fleet from "./pages/Fleet";
import IndustriesPage from "./pages/Industries";
import SameDayDelivery from "./pages/services/SameDayDelivery";
import TimedDelivery from "./pages/services/TimedDelivery";
import HeavyHaulage from "./pages/services/HeavyHaulage";
import Healthcare from "./pages/industries/Healthcare";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/quotations" element={<Quotations />} />
         <Route path="/about" element={<About />} />
         <Route path="/fleet" element={<Fleet />} />
         <Route path="/industries" element={<IndustriesPage />} />
         <Route path="/services/same-day-delivery" element={<SameDayDelivery />} />
         <Route path="/services/timed-delivery" element={<TimedDelivery />} />
         <Route path="/services/heavy-haulage" element={<HeavyHaulage />} />
         <Route path="/industries/healthcare" element={<Healthcare />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
