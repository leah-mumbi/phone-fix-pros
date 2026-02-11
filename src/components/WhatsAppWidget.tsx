import { X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface WhatsAppWidgetProps {
  phoneNumber?: string;
  businessName?: string;
}

const WhatsAppWidget = ({
  phoneNumber = "+254715601660", // Replace with your WhatsApp number
  businessName = "Nzuri Mobiles",
}: WhatsAppWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Format phone number for WhatsApp (remove all non-digit characters, keep only numbers)
  const formattedPhone = phoneNumber.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=Hi%20${encodeURIComponent(
    businessName
  )},%20I%20would%20like%20to%20inquire%20about%20your%20services.`;

  const handleClick = () => {
    // show a temporary toast and open WhatsApp in new window/tab
    setShowToast(true);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setTimeout(() => setShowToast(false), 2000);
  };

  if (isOpen) {
    return (
      <>
        {/* WhatsApp Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-lg bg-green-500 text-white shadow-lg transition-all hover:scale-105 hover:bg-green-600"
          title="Close"
        >
          <X className="h-6 w-6" />
        </button>

        {/* WhatsApp Menu */}
        <div className="fixed bottom-24 right-6 z-50 flex flex-col gap-2 rounded-2xl bg-white shadow-lg p-4 border border-gray-200">
          <h3 className="font-semibold text-gray-800 text-sm mb-2">
            Message us on WhatsApp
          </h3>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-50 transition-colors group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500 text-white group-hover:bg-green-600">
              <Phone className="h-5 w-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-800">Chat with us</p>
              <p className="text-xs text-gray-500">We reply instantly</p>
            </div>
          </a>
          <p className="text-xs text-gray-500 text-center mt-2">
            {phoneNumber}
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      {/* WhatsApp Button */}
      <button
        onClick={() => {
          setIsOpen(true);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2000);
        }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-lg bg-green-500 text-white shadow-lg transition-all hover:scale-110 hover:bg-green-600 animate-pulse"
        title="WhatsApp us"
      >
        <Phone className="h-6 w-6 text-white" />
      </button>

      {/* Tooltip */}
      <div className="fixed bottom-24 right-6 z-40 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 pointer-events-none transition-opacity group-hover:opacity-100 whitespace-nowrap">
        WhatsApp us
      </div>

      {showToast && (
        <div className="fixed bottom-20 right-6 z-50 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg">
          WhatsApp us
        </div>
      )}
    </>
  );
};

export default WhatsAppWidget;
