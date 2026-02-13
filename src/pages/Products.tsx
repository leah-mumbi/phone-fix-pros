import Navigation from "@/components/Navigation";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Phone } from "lucide-react";
import lcd from "@/assets/lcd.png";
import touch from "@/assets/touch.png";
import oled from "@/assets/oled.png";
import buttonScreens from "@/assets/button-screens.png";
import curvedScreens from "@/assets/curved-screens.png";
import lcdScreens from "@/assets/lcd-screens.png";
import powerSwitch from "@/assets/power-switch.png";
import powerVolume from "@/assets/power-volume.png";
import flexCable from "@/assets/flex-cable.png";
import chargingPlate from "@/assets/charging-plate.png";
import fingerPrint from "@/assets/finger-print.png";
import simholder from "@/assets/sim-holder.png";
import speaker from "@/assets/speakers.png";
import frames from "@/assets/frames.png";
import backlids from "@/assets/backlids.png";
import cameraLens from "@/assets/camera-lens.png";
import battery from "@/assets/battery.jpg";
import hotair from "@/assets/hotair.png";
import screwDriver from "@/assets/screw-drivers.png";
import meterKit from "@/assets/meter-kit.png";


const products = [
   {
    name: "OLED Screen",
    category: "Screen",
    price: "Ksh 3000",
    stock: "In Stock",
    quality: "OEM",
    image: curvedScreens,
  },
   {
    name: "Iphone Screens",
    category: "Screens",
    price: "Ksh 1500",
    stock: "In Stock",
    quality: "OEM",
    image: oled,
  },
  {
    name: "LCD Screens",
    category: "Screens",
    price: "Ksh1400",
    stock: "In Stock",
    quality: "OEM",
    image: lcdScreens,
  },
  {
    name: "LCD Screens",
    category: "Screen",
    price: "Ksh 1000",
    stock: "In Stock",
    quality: "OEM",
    image: lcd,
  },
  {
    name: "Touch Screens",
    category: "Screen",
    price: "Ksh 800",
    stock: "In Stock",
    quality: "Premium",
    image: touch,
  },
  {
    name: "Buttons Screens",
    category: "Screen",
    price: "Ksh 250",
    stock: "In Stock",
    quality: "Premium",
    image: buttonScreens,
  },
  {
    name: "Power Switch With Fingerprint",
    category: "Switch",
    price: "Ksh 250",
    stock: "In Stock",
    quality: "OEM",
    image: powerSwitch,
  },
  {
    name: "Power Volume Switch",
    category: "Switch",
  
    price: "Ksh 150",
    stock: "In Stock",
    quality: "OEM",
    image: powerVolume,
  },
  {
    name: "Flex Cables",
    category: "Flex Cable",
    price: "Ksh 200",
    stock: "In Stock",
    quality: "Premium",
    image: flexCable,
  },
  {
    name: "Charging Plates & Ports",
    category: "Plates & Ports",
    price: "Ksh 300",
    stock: "In Stock",
    quality: "Premium",
    image: chargingPlate,
  },
  {
    name: "Fingerprint Sensor",
    category: "Fingerprint",
    price: "Ksh 200",
    stock: "Low Stock",
    quality: "OEM",
    image: fingerPrint,
  },
  {
    name: "Sim Holder",
    category: "Sim holder",
    price: "Ksh 150",
    stock: "In Stock",
    quality: "Premium",
    image: simholder,
  },
  {
    name: "Speakers",
    category: "Speaker",
    brand: "Samsung",
    price: "Ksh 100",
    stock: "In Stock",
    quality: "Premium",
    image: speaker,
  },
  {
    name: "Frames",
    category: "Accessory",
    price: "Ksh 500",
    stock: "In Stock",
    quality: "Certified",
    image: frames,
  },
  {
    name: "Back Lids",
    category: "Accessory",
    price: "Ksh 300",
    stock: "In Stock",
    quality: "Premium",
    image: backlids,
  },
  {
    name: "Camera Lens Glass",
    category: "Lens Glass",
    price: "Ksh 200",
    stock: "In Stock",
    quality: "OEM",
    image:cameraLens,
  },
  {
    name: "Batteries",
    price: "Ksh 1500",
    stock: "In Stock",
    quality: "Premium",
    image: battery,
  },
  {
    name: "Hot Air",
    category: "Accessory",
    brand: "Universal",
    price: "Ksh 10000",
    stock: "In Stock",
    quality: "Premium",
    image: hotair,
  },
   {
    name: "Screwdriver Set",
    category: "Accessory",
    brand: "Universal",
    price: "Ksh 500",
    stock: "In Stock",
    quality: "Premium",
    image: screwDriver,
  },
   {
    name: "Meter Kit",
    category: "Accessory",
    brand: "Universal",
    price: "Ksh 1500",
    stock: "In Stock",
    quality: "Premium",
    image: meterKit,
  },
];

const Products = () => {
  const navigate = useNavigate();
  
  const openWhatsApp = (productName: string) => {
    const phone = "+254707907223".replace(/[^+\d]/g, "");
    const text = encodeURIComponent(`Hi Nzuri Mobiles, I'm interested in ${productName}. Please share availability and price.`);
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Spare Parts & Accessories
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Browse our extensive catalog of authentic spare parts and premium accessories. 
              All products are quality-checked and come with warranty.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-muted/30 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-10"
                />
              </div>
              
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="screen">Screens</SelectItem>
                  <SelectItem value="battery">Batteries</SelectItem>
                  <SelectItem value="camera">Cameras</SelectItem>
                  <SelectItem value="case">Phone Cases</SelectItem>
                  <SelectItem value="accessory">Accessories</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="samsung">Samsung</SelectItem>
                  <SelectItem value="tecno">Tecno</SelectItem>
                  <SelectItem value="infinix">Infinix</SelectItem>
                  <SelectItem value="xiaomi">Xiaomi</SelectItem>
                  <SelectItem value="oppo">Oppo</SelectItem>
                  <SelectItem value="huawei">Huawei</SelectItem>
                  <SelectItem value="vivo">Vivo</SelectItem>
                  <SelectItem value="realme">Realme</SelectItem>
                  <SelectItem value="universal">Universal</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card 
                key={product.name} 
                className="group overflow-hidden hover:shadow-card transition-all hover:-translate-y-1"
              >
                <div className="relative h-64 md:h-72 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant={product.stock === "In Stock" ? "default" : "secondary"}>
                      {product.stock}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="outline" className="bg-background/80 backdrop-blur-sm text-xs">
                      {product.quality}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <div className="text-xs text-muted-foreground mb-1">
                    {product.category}
                  </div>
                  <CardTitle className="text-lg leading-snug">
                    {product.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-primary">{product.price}</span>
                  </div>
                  <Button 
                    className="w-full gap-2" 
                    variant="hero"
                    onClick={() => openWhatsApp(product.name)}
                  >
                    <Phone className="w-4 h-4" />
                    Enquire on WhatsApp
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Info Banner */}
          <div className="mt-16 bg-gradient-primary rounded-2xl p-8 md:p-12 text-center text-primary-foreground">
            <h2 className="text-3xl font-bold mb-4">Can't Find What You Need?</h2>
            <p className="text-lg mb-6 opacity-90">
              We stock thousands of parts for all phone brands. Contact us and we'll help you find exactly what you're looking for.
            </p>
            <Button variant="secondary" size="lg" onClick={() => navigate("/contact")}>
              Contact Support
            </Button>
          </div>
        </div>
      </main>

      <WhatsAppFloating phoneNumber="+254707907223" businessName="Nzuri Mobiles" />
    </div>
  );
};

export default Products;
