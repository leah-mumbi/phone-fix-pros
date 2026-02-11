import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import { 
  Smartphone, Battery, Zap, Camera, Speaker, Wrench,
  Wifi, Shield, Droplet, Volume2, TrendingUp, Settings
} from "lucide-react";

const allServices = [
    {
    icon: Wrench,
    title: "Phones Spare Parts ",
    description: "High-quality, genuine phone spare parts designed for durability and perfect compatibility. We stock original and tested components to ensure reliable performance for all major phone brands.",
    price: "From Ksh 1500",
    duration: "45-60 min",
    warranty: "6 months",
    popular: true,

  },
  {
    icon: Smartphone,
    title: "Screen Replacement ",
    description: "Professional screen replacement with genuine OLED/LCD displays. We handle cracked, broken, or unresponsive screens for all major brands.",
    price: "From 1500",
    duration: "45-60 min",
    warranty: "6 months",
    popular: true,
  },
  {
    icon: Battery,
    title: "Battery Replacement",
    description: "Restore your device's battery life with high-quality replacement batteries. Compatible with iPhone, Samsung, and more.",
    price: "From Ksh 1200",
    duration: "30-45 min",
    warranty: "6 months",
    popular: true,
  },
  {
    icon: Zap,
    title: "Charging Port Repair",
    description: "Fix loose connections, slow charging, or non-responsive ports. We replace damaged charging ports and clean debris.",
    price: "From Ksh 300",
    duration: "20-30 min",
    warranty: "3 months",
  },
  {
    icon: Camera,
    title: "Camera Repair",
    description: "Resolve blurry photos, focus issues, or broken camera glass. Front and rear camera module replacements available.",
    price: "From Ksh 800",
    duration: "45 min",
    warranty: "6 months",
  },
  {
    icon: Speaker,
    title: "Speaker & Audio Repair",
    description: "Fix distorted sound, low volume, or non-working speakers and microphones. Complete audio system diagnostics.",
    price: "From Ksh 250",
    duration: "30 min",
    warranty: "3 months",
  },
  {
    icon: Droplet,
    title: "Water Damage Repair",
    description: "Emergency water damage treatment including ultrasonic cleaning, component drying, and corrosion removal.",
    price: "From Ksh 700",
    duration: "2 hours",
    warranty: "1 month",
    popular: true,
  },
  {
    icon: Volume2,
    title: "Button Replacement",
    description: "Replace broken or stuck power, volume, or home buttons. Restore full functionality to your device controls.",
    price: "From Ksh 400",
    duration: "30 min",
    warranty: "3 months",
  },
  {
    icon: Wifi,
    title: "Network Issues",
    description: "Fix WiFi connectivity problems, cellular signal issues, and Bluetooth malfunctions. Antenna and module repairs.",
    price: "From Ksh 300",
    duration: "1 hour",
    warranty: "3 months",
  },
  {
    icon: Shield,
    title: "Back Glass Replacement",
    description: "Replace cracked or shattered back glass panels. Available for iPhone and Samsung flagship models.",
    price: "From Ksh 1000",
    duration: "1 hour",
    warranty: "3 months",
  },
  {
    icon: Settings,
    title: "Software Issues",
    description: "Resolve software glitches, system crashes, and performance issues. OS reinstallation and data recovery available.",
    price: "From 500",
    duration: "30-60 min",
    warranty: "1 month",
  },
  {
    icon: TrendingUp,
    title: "Performance Upgrade",
    description: "Optimize your device's performance, free up storage, and update system software for better speed.",
    price: "From 300",
    duration: "30 min",
    warranty: "1 month",
  },
  {
    icon: Wrench,
    title: "General Diagnostics",
    description: "Complete device health check and diagnostics. Identify issues and get a detailed repair quote.",
    price: "Free",
    duration: "15-20 min",
    warranty: "N/A",
  },
];

const Services = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-2xl md:text-4xl font-bold mb-4">
              Professional Phone Spare Parts & Repair Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Genuine phone spare parts, expert technicians, and transparent pricing.
               All repairs include warranty and free diagnostics.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServices.map((service) => (
              <Card 
                key={service.title} 
                className="hover:shadow-card transition-all hover:-translate-y-1 relative"
              >
                {service.popular && (
                  <Badge className="absolute top-4 right-4 bg-secondary">
                    Popular
                  </Badge>
                )}
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                    <service.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-semibold text-primary text-lg">{service.price}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">{service.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Warranty:</span>
                      <span className="font-medium">{service.warranty}</span>
                    </div>
                    <Button variant="hero" className="w-full mt-2" onClick={() => navigate("/book-repair", { state: { service: service.title } })}>
                      Book This Service
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Info Section */}
          <div className="mt-16 bg-muted/30 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">90-Day</div>
                <div className="text-muted-foreground">Warranty on Most Repairs</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">Same Day</div>
                <div className="text-muted-foreground">Service Available</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <div className="text-muted-foreground">Genuine Parts Used</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <WhatsAppFloating phoneNumber="+254707907223" businessName="Nzuri Mobiles" />
    </div>
  );
};

export default Services;
