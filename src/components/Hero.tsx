import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-repair.jpg";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center pt-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Professional phone repair service"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your Phone's
            <span className="block text-transparent bg-gradient-primary bg-clip-text">
              Best Care
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Professional repair services, transparent pricing, and genuine spare parts. 
            Get your device fixed by certified technicians.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              variant="hero" 
              size="lg" 
              className="group"
              onClick={() => navigate("/book-repair")}
            >
              Book a Repair
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate("/services")}
            >
              View Pricing
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                <Shield className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Certified Techs</p>
                <p className="text-sm text-muted-foreground">Expert repairs</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                <Clock className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Same Day</p>
                <p className="text-sm text-muted-foreground">Fast service</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                <MapPin className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Pick & Drop</p>
                <p className="text-sm text-muted-foreground">We come to you</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
