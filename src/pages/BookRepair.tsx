import Navigation from "@/components/Navigation";
import { BookingForm } from "@/components/BookingForm";
import WhatsAppFloating from "@/components/WhatsAppFloating";

const BookRepair = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Book Your <span className="text-primary">Repair</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Fill out the form below and we'll get your device fixed in no time.
            </p>
          </div>
          <BookingForm />
        </div>
      </main>
      <WhatsAppFloating phoneNumber="+254707907223" businessName="Nzuri Mobiles" />
    </div>
  );
};

export default BookRepair;
