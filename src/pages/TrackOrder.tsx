import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Search,
  Package,
  Clock,
  Wrench,
  CheckCircle,
  XCircle,
  Phone,
  Calendar,
  FileText,
  Truck,
} from "lucide-react";
import { format } from "date-fns";

interface BookingDetails {
  id: string;
  tracking_id: string | null;
  service_type: string;
  device_model: string;
  issue_description: string;
  status: string;
  booking_date: string;
  created_at: string;
  estimated_completion: string | null;
  technician_notes: string | null;
}

const statusSteps = [
  { status: "pending", label: "Pending", icon: Clock, description: "Your repair request is being reviewed" },
  { status: "in_progress", label: "In Progress", icon: Wrench, description: "Technicians are working on your device" },
  { status: "completed", label: "Completed", icon: CheckCircle, description: "Your device is ready for pickup" },
];

const TrackOrder = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [trackingId, setTrackingId] = useState(searchParams.get("id") || "");
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [customerPhone, setCustomerPhone] = useState("");

  const handleSearch = useCallback(async () => {
    if (!trackingId.trim() || !customerPhone.trim()) {
      toast({
        title: "Error",
        description: "Please enter a tracking ID and phone number.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const normalize = (p: string) => {
        const digits = p.replace(/\D+/g, "");
        if (digits.startsWith("254")) return digits;
        if (digits.startsWith("0") && digits.length === 10) return "254" + digits.slice(1);
        return digits;
      };
      const phoneNormalized = normalize(customerPhone.trim());
      const localVariant = phoneNormalized.startsWith("254")
        ? "0" + phoneNormalized.slice(3)
        : phoneNormalized;

      const { data, error } = await supabase.rpc("get_booking_by_public_key", {
        _tracking_id: trackingId.trim().toUpperCase(),
        _phone: phoneNormalized,
      });
      if (error) throw error;

      let found = Array.isArray(data) && data.length > 0 ? data[0] : null;

      if (!found) {
        const { data: byId } = await supabase
          .from("repair_bookings")
          .select("*")
          .eq("tracking_id", trackingId.trim().toUpperCase())
          .limit(1)
          .maybeSingle();
        if (byId) {
          found = byId as any;
          toast({
            title: "Found by ID",
            description: "Phone number format didn’t match. Showing result by Tracking ID.",
          });
        }
      }

      if (found) {
        setBooking(found);
      } else {
        setBooking(null);
        toast({
          title: "Not Found",
          description: "No repair found matching that Tracking ID and Phone.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error searching:", error);
      toast({
        title: "Error",
        description: "Failed to search. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [trackingId, customerPhone, toast]);

  useEffect(() => {
    const id = searchParams.get("id");
    const phone = searchParams.get("phone");
    if (id) setTrackingId(id.toUpperCase());
    if (phone) setCustomerPhone(phone);
  }, [searchParams]);

  useEffect(() => {
    if (trackingId && customerPhone) {
      handleSearch();
    }
  }, [trackingId, customerPhone, handleSearch]);


  const getCurrentStepIndex = () => {
    if (!booking) return -1;
    if (booking.status === "cancelled") return -1;
    return statusSteps.findIndex((step) => step.status === booking.status);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-500";
      case "in_progress":
        return "text-primary";
      case "completed":
        return "text-green-500";
      case "cancelled":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Truck className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-2">
              Track Your <span className="text-primary">Repair</span>
            </h1>
            <p className="text-muted-foreground">
              Enter your tracking ID to see the status of your repair
            </p>
          </div>

          {/* Search Form */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Enter tracking ID (e.g., REP-12345678)"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                    className="pl-10 font-mono"
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
                <div className="relative flex-1">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Enter phone used in booking"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="pl-10"
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
                <Button onClick={handleSearch} disabled={loading} className="md:col-span-1">
                  {loading ? "Searching..." : "Track"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {searched && !booking && !loading && (
            <Card className="border-destructive/50">
              <CardContent className="pt-6 text-center">
                <XCircle className="w-12 h-12 mx-auto mb-4 text-destructive" />
                <h3 className="text-lg font-semibold mb-2">Repair Not Found</h3>
                <p className="text-muted-foreground">
                  We couldn't find a repair with tracking ID "{trackingId}".
                  Please check and try again.
                </p>
              </CardContent>
            </Card>
          )}

          {booking && (
            <>
              {/* Status Card */}
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      {booking.tracking_id}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          booking.status === "completed"
                            ? "outline"
                            : booking.status === "cancelled"
                            ? "destructive"
                            : "default"
                        }
                        className={`${getStatusColor(booking.status)} text-sm`}
                      >
                        {booking.status.replace("_", " ").toUpperCase()}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(booking.tracking_id || "");
                          toast({ title: "Copied", description: "Tracking ID copied to clipboard" });
                        }}
                      >
                        Copy ID
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Progress Steps */}
                  {booking.status !== "cancelled" && (
                    <div className="relative mb-8">
                      <div className="absolute top-5 left-0 right-0 h-0.5 bg-border" />
                      <div
                        className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500"
                        style={{
                          width: `${(getCurrentStepIndex() / (statusSteps.length - 1)) * 100}%`,
                        }}
                      />
                      <div className="relative flex justify-between">
                        {statusSteps.map((step, index) => {
                          const isActive = getCurrentStepIndex() >= index;
                          const isCurrent = getCurrentStepIndex() === index;
                          const Icon = step.icon;
                          return (
                            <div
                              key={step.status}
                              className="flex flex-col items-center"
                            >
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                                  isActive
                                    ? "bg-primary border-primary text-primary-foreground"
                                    : "bg-background border-border text-muted-foreground"
                                } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}
                              >
                                <Icon className="w-5 h-5" />
                              </div>
                              <span
                                className={`mt-2 text-sm font-medium ${
                                  isActive ? "text-foreground" : "text-muted-foreground"
                                }`}
                              >
                                {step.label}
                              </span>
                              <span className="text-xs text-muted-foreground text-center max-w-[100px] hidden md:block">
                                {step.description}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {booking.status === "cancelled" && (
                    <div className="text-center py-4 mb-6 bg-destructive/10 rounded-lg">
                      <XCircle className="w-8 h-8 mx-auto mb-2 text-destructive" />
                      <p className="text-destructive font-medium">
                        This repair has been cancelled
                      </p>
                    </div>
                  )}

                  {/* Details Grid */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Phone className="w-4 h-4 mt-1 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Device</p>
                          <p className="font-medium">{booking.device_model}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Wrench className="w-4 h-4 mt-1 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Service</p>
                          <p className="font-medium">{booking.service_type}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-4 h-4 mt-1 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Booking Date
                          </p>
                          <p className="font-medium">
                            {format(new Date(booking.booking_date), "PPP")}
                          </p>
                        </div>
                      </div>
                      {booking.estimated_completion && (
                        <div className="flex items-start gap-3">
                          <Clock className="w-4 h-4 mt-1 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Est. Completion
                            </p>
                            <p className="font-medium">
                              {format(
                                new Date(booking.estimated_completion),
                                "PPP"
                              )}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Issue Description */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex items-start gap-3">
                      <FileText className="w-4 h-4 mt-1 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Issue Description
                        </p>
                        <p>{booking.issue_description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Technician Notes */}
                  {booking.technician_notes && (
                    <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium mb-1">Technician Notes</p>
                      <p className="text-muted-foreground">
                        {booking.technician_notes}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Help Section */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <h4 className="font-medium">Need help with your repair?</h4>
                      <p className="text-sm text-muted-foreground">
                        Contact our support team for assistance
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        const phone = "254707907223";
                        const msg = encodeURIComponent(
                          `Hello Nzuri Mobiles, my Tracking ID is "${booking?.tracking_id || trackingId}". Please assist.`
                        );
                        window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
                      }}
                    >
                      Contact Support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
      <WhatsAppFloating phoneNumber="+254707907223" businessName="Nzuri Mobiles" />
    </div>
  );
};

export default TrackOrder;
