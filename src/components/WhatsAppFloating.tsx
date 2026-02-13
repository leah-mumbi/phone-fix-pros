import { Phone } from "lucide-react";

interface Props {
  phoneNumber?: string;
  businessName?: string;
}

export default function WhatsAppFloating({
  phoneNumber = "+254707907223",
  businessName = "Nzuri Mobiles",
}: Props) {
  const message = "Hi! I need help with my phone.";
  const link = `https://wa.me/${phoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

  const handleClick = () => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 rounded-lg shadow-lg"
      title={`Chat with ${businessName} on WhatsApp`}
    >
      <Phone className="w-7 h-7 text-white" />
    </button>
  );
}
