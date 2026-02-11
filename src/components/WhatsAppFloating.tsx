import { useState } from "react";
import { Phone } from "lucide-react";

interface WhatsAppFloatingProps {
  phoneNumber?: string;
  businessName?: string;
}

const WhatsAppFloating = ({
  phoneNumber = "+254707907223",
  businessName = "Nzuri Mobiles",
}: WhatsAppFloatingProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const message = `Hi! 👋 I need help with my phone.`;
  const whatsappLink = `https://wa.me/${phoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

  const handleClick = () => {
    setShowToast(true);
    window.open(whatsappLink, "_blank", "noopener,noreferrer");
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 rounded-lg shadow-lg transition-all duration-300 hover:scale-110"
        title={`Chat with ${businessName} on WhatsApp`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <Phone className="w-7 h-7 text-white" />
      </button>

      {showTooltip && (
        <div className="fixed bottom-24 right-6 z-50 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
          WhatsApp us
        </div>
      )}

      {showToast && (
        <div className="fixed bottom-20 right-6 z-50 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg">
          WhatsApp us
        </div>
      )}
    </div>
  );
};

export default WhatsAppFloating;
