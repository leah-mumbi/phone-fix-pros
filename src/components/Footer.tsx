import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
    { label: "Products", path: "/products" },
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Book Repair", path: "/book-repair" },
  ];

  const locations = [
    {
      city: "Kitengela",
      address: "St Monica Road (M-squre Building), Kitengela Town",
    },
    {
      city: "Kitengela Old Namanga Road",
      address: "Mashville Building Near Jupiter",
    },
  ];

  return (
    <footer className="bg-black text-neutral-300 mt-8 border-t border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 pb-3 border-b border-neutral-700">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group"
                  >
                    <span className="text-primary group-hover:translate-x-1 transition-transform">›</span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 pb-3 border-b border-neutral-700">
              Locations
            </h3>
            <div className="space-y-6">
              {locations.map((location, idx) => (
                <div key={idx}>
                  <p className="font-semibold text-white mb-2">{location.city}</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {location.address}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Nzuri Mobiles Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 pb-3 border-b border-neutral-700">
              Nzuri Mobiles
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-neutral-400 text-sm mb-1">Address:</p>
                <p className="text-neutral-300 text-sm">
                  St Monica Road (M-squre Building), Kitengela Town
                </p>
              </div>
              <div>
                <p className="text-neutral-400 text-sm mb-1">Phone:</p>
                <p className="text-neutral-300 text-sm">+254  728 981 575</p>
                <p className="text-neutral-300 text-sm">+254  740 847 880</p>
              </div>
              <div>
                <p className="text-neutral-400 text-sm mb-1">Email:</p>
                <a
                  href="mailto:info@nzurimobiles.com"
                  className="text-primary hover:text-primary/80 transition-colors text-sm"
                >
                  info@nzurimobiles.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-neutral-800 pt-6">
          <p className="text-center text-xs text-neutral-400">
            © 2025 Nzuri Mobiles. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
