import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/hooks/useCart";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Products from "./pages/Products";
import Locations from "./pages/Locations";
import BookRepair from "./pages/BookRepair";
import AdminDashboard from "./pages/AdminDashboard";
import Notifications from "./pages/Notifications";
import TrackOrder from "./pages/TrackOrder";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Footer from "@/components/Footer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <ScrollToTop />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/products" element={<Products />} />
                <Route path="/locations" element={<Locations />} />
                <Route path="/book-repair" element={<BookRepair />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/track" element={<TrackOrder />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
