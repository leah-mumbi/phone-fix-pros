import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import WhatsAppFloating from "@/components/WhatsAppFloating";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 pt-24 pb-16">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ShoppingBag className="w-24 h-24 text-muted-foreground mb-6" />
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8 max-w-md">
              Looks like you haven't added any items to your cart yet. Browse our products and find something you love!
            </p>
            <Button variant="hero" onClick={() => navigate("/products")}>
              Browse Products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <Button 
          variant="ghost" 
          className="mb-6 gap-2" 
          onClick={() => navigate("/products")}
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-display text-3xl font-bold text-foreground">Shopping Cart</h1>
              <Button variant="ghost" size="sm" onClick={clearCart} className="text-destructive hover:text-destructive">
                Clear Cart
              </Button>
            </div>

            {items.map((item) => (
              <Card key={item.name} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                      <p className="text-primary font-bold mt-1">{item.price}</p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeFromCart(item.name)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.name, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.name, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="font-display">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-primary">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-medium">${(totalPrice * 0.1).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-lg text-primary">
                    ${(totalPrice * 1.1).toFixed(2)}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button variant="hero" className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Secure checkout powered by Stripe
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <WhatsAppFloating phoneNumber="+254707907223" businessName="Nzuri Mobiles" />
    </div>
  );
};

export default Cart;
