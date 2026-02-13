import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 md:px-8">
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
