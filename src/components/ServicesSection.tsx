import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Smartphone, Battery, Zap, Camera, Speaker, Wrench } from "lucide-react";
import screenReplacementImg from "@/assets/screen-replacement.jpg";
import batteryReplacementImg from "@/assets/battery-replacement.jpg";
import chargingPortImg from "@/assets/charging-port.jpg";
import generalRepairsImg from "@/assets/general-repairs.jpg";

const services = [
  {
    icon: Smartphone,
    title: "Screen Replacement",
    description: "Cracked or damaged screens replaced with genuine parts",
    price: "From Ksh 1500",
    image: screenReplacementImg,
  },
  {
    icon: Battery,
    title: "Battery Replacement",
    description: "Restore your phone's battery life with new cells",
    price: "From Ksh 1200",
    image: batteryReplacementImg,
  },
  {
    icon: Zap,
    title: "Charging Port",
    description: "Fix charging issues and replace faulty ports",
    price: "From Ksh 400",
    image: chargingPortImg  ,
  },
  {
    icon: Camera,
    title: "Camera Repair",
    description: "Fix blurry images and camera malfunctions",
    price: "From Ksh 800",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
  },
  {
    icon: Speaker,
    title: "Audio Issues",
    description: "Speaker and microphone repairs for clear sound",
    price: "From Ksh 500",
    image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=400&h=300&fit=crop",
  },
  {
    icon: Wrench,
    title: "General Repairs",
    description: "Water damage, buttons, and other issues",
    price: "From Ksh 300",
    image: generalRepairsImg,
  },
];

const ServicesSection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Repair Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing for all your phone repair needs. No hidden fees, 
            just quality service you can trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service) => (
            <Card key={service.title} className="group overflow-hidden hover:shadow-card transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-lg bg-primary flex items-center justify-center shadow-lg">
                  <service.icon className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{service.price}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("/book-repair", { state: { service: service.title } })}
                  >
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg" onClick={() => navigate("/services")}>
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
