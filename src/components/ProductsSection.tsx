import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import sparePartsImage from "@/assets/spare-parts.png";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import screens from "@/assets/screens.png";
import battery from "@/assets/battery.jpg";
import screenProtectors from "@/assets/screen-protectors.png";
import UV from "@/assets/uv.jpg";
import phoneCase from "@/assets/phone-case.png";
import iphoneCase from "@/assets/iphone-case.png";
import accesories from "@/assets/accesories.png";
import earPods from "@/assets/ear-pods.png";
import { access } from "fs";

const products = [
  {
    name: "All Types of Phone Screen",
    category: "Screen",
    price: "From Ksh 1500",
    stock: "In Stock",
    image: screens,
  },
  {
    name: "Phone Battery",
    category: "Battery",
    price: "From Ksh 800",
    stock: "In Stock",
    image: battery,
  },
  {
    name: "Screen Protectors",
    category: "Protector",
    price: "From Ksh 200",
    stock: "In Stock",
    image: screenProtectors,
  },
  {
    name: "UV Tempered Glass",
    category: "UV Protector",
    price: "From Ksh 800",
    stock: "In Stock",
    image: UV,
  },
  {
    name: "Phone Cases",
    category: "Phone Cases",
    price: "From Ksh 300",
    stock: "In Stock",
    image: phoneCase,
  },
   {
    name: "Iphone Cases",
    category: "Phone Case",
    price: "From Ksh 500",
    stock: "In Stock",
    image: iphoneCase,
  },
  {
    name: "Universal Fast Charger 25W",
    category: "Accessories",
    price: "From Ksh 250",
    stock: "In Stock",
    image: accesories,
  },
  {
    name: "Ear Pods",
    category: "Accessories",
    price: "From Ksh 1500",
    stock: "In Stock",
    image: earPods,
  },
 
  {
    name: "Oppo A78 Camera Module",
    category: "Camera",
    price: "$49.99",
    stock: "Low Stock",
    image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=400&h=300&fit=crop",
  },
  {
    name: "Huawei Y9 Prime Case",
    category: "Phone Case",
    price: "$11.99",
    stock: "In Stock",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=300&fit=crop",
  },
  {
    name: "USB-C Fast Charging Cable 2m",
    category: "Accessory",
    price: "$12.99",
    stock: "In Stock",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  },
  {
    name: "Samsung Galaxy A34 Case",
    category: "Phone Case",
    price: "$13.99",
    stock: "In Stock",
    image: "https://images.unsplash.com/photo-1541877944-ac82a091518a?w=400&h=300&fit=crop",
  },
];

const ProductsSection = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Genuine Spare Parts & Accessories
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              Browse our extensive catalog of authentic spare parts and accessories. 
              All products are quality-checked and come with warranty.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground text-xs">✓</span>
                </div>
                <span className="text-foreground">100% Authentic Parts</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground text-xs">✓</span>
                </div>
                <span className="text-foreground">Warranty Included</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground text-xs">✓</span>
                </div>
                <span className="text-foreground">Fast Delivery</span>
              </li>
            </ul>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-card">
            <img
              src={sparePartsImage}
              alt="Spare parts and accessories"
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <Card key={product.name} className="group overflow-hidden hover:shadow-card transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
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
                  <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                    {product.category}
                  </Badge>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{product.price}</span>
                  <Button 
                    size="sm" 
                    className="gap-2"
                    onClick={() => addToCart({
                      name: product.name,
                      category: product.category,
                      price: product.price,
                      image: product.image,
                    })}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="hero" size="lg" onClick={() => navigate("/products")}>
            Browse All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
