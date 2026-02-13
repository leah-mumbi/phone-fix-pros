import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Phone, Mail, Navigation as NavigationIcon } from "lucide-react";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import { useNavigate } from "react-router-dom";

const locations = [
  {
    name: "Downtown Service Center",
    address: "123 Main Street, City Center",
    phone: "+1 (555) 123-4567",
    email: "downtown@mobicare.com",
    hours: {
      weekday: "9:00 AM - 7:00 PM",
      weekend: "10:00 AM - 5:00 PM",
    },
    services: ["All Repairs", "Parts Sales", "Pick & Drop"],
  },
  {
    name: "North Mall Location",
    address: "456 Shopping Plaza, North District",
    phone: "+1 (555) 234-5678",
    email: "north@mobicare.com",
    hours: {
      weekday: "10:00 AM - 8:00 PM",
      weekend: "11:00 AM - 6:00 PM",
    },
    services: ["Screen Repairs", "Battery Replacement", "Accessories"],
  },
  {
    name: "Tech Park Express",
    address: "789 Tech Boulevard, Business District",
    phone: "+1 (555) 345-6789",
    email: "techpark@mobicare.com",
    hours: {
      weekday: "8:00 AM - 6:00 PM",
      weekend: "Closed",
    },
    services: ["Corporate Services", "Bulk Repairs", "Same Day Service"],
  },
];

const Locations = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Our Service Centers
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Visit any of our convenient locations for professional phone repair services. 
              Walk-ins welcome, or book ahead to skip the wait.
            </p>
          </div>

          {/* Map Embed */}
          <div className="mb-12 rounded-2xl overflow-hidden shadow-card bg-muted/30">
            <div className="relative h-[420px]">
              <iframe
                title="Nzuri Mobiles Locations"
                src={`https://www.google.com/maps?q=${encodeURIComponent("https://maps.app.goo.gl/BtZgjpSX9wYz3KaB6")}&output=embed`}
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
              />
            </div>
            <div className="p-4 flex items-center justify-end gap-2">
              <Button asChild variant="outline" size="sm">
                <a href="https://maps.app.goo.gl/BtZgjpSX9wYz3KaB6" target="_blank" rel="noreferrer">Open in Google Maps</a>
              </Button>
            </div>
          </div>

          {/* Locations Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {locations.map((location) => (
              <Card key={location.name} className="hover:shadow-card transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{location.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Address */}
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">{location.address}</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex gap-3">
                    <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Hours</p>
                      <p className="text-sm text-muted-foreground">
                        Mon-Fri: {location.hours.weekday}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Sat-Sun: {location.hours.weekend}
                      </p>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="space-y-2">
                    <div className="flex gap-3">
                      <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                      <a 
                        href={`tel:${location.phone}`}
                        className="text-sm text-primary hover:underline"
                      >
                        {location.phone}
                      </a>
                    </div>
                    <div className="flex gap-3">
                      <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                      <a 
                        href={`mailto:${location.email}`}
                        className="text-sm text-primary hover:underline"
                      >
                        {location.email}
                      </a>
                    </div>
                  </div>

                  {/* Services */}
                  <div>
                    <p className="font-medium mb-2">Available Services</p>
                    <div className="flex flex-wrap gap-2">
                      {location.services.map((service) => (
                        <span
                          key={service}
                          className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Button variant="hero" size="sm" onClick={() => navigate("/book-repair")}>
                      Book Now
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <NavigationIcon className="w-4 h-4" />
                      Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pick & Drop Service Banner */}
          <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-center text-primary-foreground">
            <h2 className="text-3xl font-bold mb-4">Can't Visit a Store?</h2>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Use our Pick & Drop service! We'll collect your device, repair it at our facility, 
              and deliver it back to your doorstep.
            </p>
            <Button variant="secondary" size="lg">
              Request Pickup
            </Button>
          </div>
        </div>
      </main>
      <WhatsAppFloating phoneNumber="+254707907223" businessName="Nzuri Mobiles" />
    </div>
  );
};

export default Locations;
