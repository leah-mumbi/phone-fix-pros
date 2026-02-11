import { useState } from "react";
import { Menu, X, Smartphone, LogOut, User, Shield, ShoppingCart, Bell, ChevronDown, LayoutDashboard, Wrench, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useNotifications } from "@/hooks/useNotifications";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin } = useAuth();
  const { totalItems } = useCart();
  const { unreadCount } = useNotifications();

  const mainNavItems = [
    { to: "/home", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/products", label: "Products" },
    { to: "/track", label: "Track Repair" },
    { to: "/contact", label: "Contact" },
  ];

  const moreItems = [
    { to: "/about", label: "About Us" },
    { to: "/locations", label: "Locations" },
  ];

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Logged out",
        description: "You've been successfully logged out.",
      });
      navigate("/auth");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/home" className="flex items-center gap-3 font-bold text-primary">
            <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-white">
              <img src="/logo.png" alt="Nzuri Mobiles" className="w-full h-full object-contain p-1.5" />
            </div>
            <span className="text-xl md:text-2xl font-display font-extrabold tracking-tight text-primary">
              Nzuri Mobiles
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {mainNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="text-foreground/80 hover:text-primary transition-colors text-[15px] font-medium tracking-wide"
                activeClassName="text-primary font-semibold"
              >
                {item.label}
              </NavLink>
            ))}
            
            {/* More Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1.5 text-foreground/80 hover:text-primary transition-colors text-[15px] font-medium tracking-wide">
                  More
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover border border-border">
                {moreItems.map((item) => (
                  <DropdownMenuItem key={item.to} onClick={() => navigate(item.to)}>
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="hero" size="sm" onClick={() => navigate("/book-repair")}>
              Book Repair
            </Button>
            
            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <User className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-popover border border-border">
                <DropdownMenuItem onClick={() => navigate("/dashboard")} className="gap-2">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/track")} className="gap-2">
                  <Wrench className="w-4 h-4" />
                  My Repairs
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/products")} className="gap-2">
                  <Package className="w-4 h-4" />
                  Orders
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/notifications")} className="gap-2">
                  <Bell className="w-4 h-4" />
                  Notifications
                  {unreadCount > 0 && (
                    <span className="ml-auto bg-destructive text-destructive-foreground text-xs rounded-full px-2">
                      {unreadCount}
                    </span>
                  )}
                </DropdownMenuItem>
                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/admin")} className="gap-2">
                      <Shield className="w-4 h-4" />
                      Admin Panel
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="gap-2 text-destructive">
                  <LogOut className="w-4 h-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <Button variant="hero" size="sm" onClick={() => navigate("/book-repair")}>
              Book Repair
            </Button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground hover:text-primary"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-[500px] pb-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-2 pt-4">
            {mainNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="text-foreground hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-muted"
                activeClassName="text-primary font-semibold bg-muted"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            {moreItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="text-foreground hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-muted"
                activeClassName="text-primary font-semibold bg-muted"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            
            <div className="border-t border-border my-2" />
            
            <button
              onClick={() => { navigate("/dashboard"); setIsOpen(false); }}
              className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-muted text-foreground"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </button>
            <button
              onClick={() => { navigate("/track"); setIsOpen(false); }}
              className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-muted text-foreground"
            >
              <Wrench className="w-4 h-4" />
              My Repairs
            </button>
            <button
              onClick={() => { navigate("/cart"); setIsOpen(false); }}
              className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-muted text-foreground relative"
            >
              <ShoppingCart className="w-4 h-4" />
              Cart
              {totalItems > 0 && (
                <span className="ml-auto bg-primary text-primary-foreground text-xs rounded-full px-2">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => { navigate("/notifications"); setIsOpen(false); }}
              className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-muted text-foreground"
            >
              <Bell className="w-4 h-4" />
              Notifications
              {unreadCount > 0 && (
                <span className="ml-auto bg-destructive text-destructive-foreground text-xs rounded-full px-2">
                  {unreadCount}
                </span>
              )}
            </button>
            
            {isAdmin && (
              <button
                onClick={() => { navigate("/admin"); setIsOpen(false); }}
                className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-muted text-foreground"
              >
                <Shield className="w-4 h-4" />
                Admin Panel
              </button>
            )}
            
            <div className="border-t border-border my-2" />
            
            <button
              onClick={() => { handleLogout(); setIsOpen(false); }}
              className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-muted text-destructive"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
