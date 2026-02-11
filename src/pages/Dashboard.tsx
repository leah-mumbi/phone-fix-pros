import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Wrench,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Mail,
  Phone,
  Calendar,
  Search,
} from "lucide-react";
import { format } from "date-fns";

interface Booking {
  id: string;
  tracking_id: string | null;
  service_type: string;
  device_model: string;
  issue_description: string;
  status: string;
  booking_date: string;
  created_at: string;
  estimated_completion: string | null;
}

interface Profile {
  full_name: string | null;
  phone: string | null;
}

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    if (!user) return;

    try {
      // Fetch bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from("repair_bookings")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (bookingsError) throw bookingsError;
      setBookings(bookingsData || []);

      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("full_name, phone")
        .eq("user_id", user.id)
        .maybeSingle();

      if (profileError) throw profileError;
      setProfile(profileData);
      setFullName(profileData?.full_name || "");
      setPhone(profileData?.phone || "");
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to load your data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ full_name: fullName.trim(), phone: phone.trim() })
        .eq("user_id", user.id);

      if (error) throw error;

      setProfile({ full_name: fullName, phone });
      setEditingProfile(false);
      toast({
        title: "Success",
        description: "Profile updated successfully.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ReactNode }> = {
      pending: { variant: "secondary", icon: <Clock className="w-3 h-3" /> },
      in_progress: { variant: "default", icon: <Wrench className="w-3 h-3" /> },
      completed: { variant: "outline", icon: <CheckCircle className="w-3 h-3" /> },
      cancelled: { variant: "destructive", icon: <XCircle className="w-3 h-3" /> },
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <Badge variant={config.variant} className="gap-1">
        {config.icon}
        {status.replace("_", " ").toUpperCase()}
      </Badge>
    );
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === "pending").length,
    inProgress: bookings.filter(b => b.status === "in_progress").length,
    completed: bookings.filter(b => b.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome, <span className="text-primary">{profile?.full_name || "User"}</span>
          </h1>
          <p className="text-muted-foreground">Manage your repairs and profile</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-muted-foreground text-sm">Total Repairs</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-500">{stats.pending}</div>
              <p className="text-muted-foreground text-sm">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">{stats.inProgress}</div>
              <p className="text-muted-foreground text-sm">In Progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-500">{stats.completed}</div>
              <p className="text-muted-foreground text-sm">Completed</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                My Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              {editingProfile ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleUpdateProfile}>
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingProfile(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>{profile?.full_name || "Not set"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{profile?.phone || "Not set"}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingProfile(true)}
                  >
                    Edit Profile
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Repairs */}
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-5 h-5" />
                My Repairs
              </CardTitle>
              <Button size="sm" onClick={() => navigate("/book-repair")}>
                Book New Repair
              </Button>
            </CardHeader>
            <CardContent>
              {bookings.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Wrench className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No repairs yet</p>
                  <Button
                    variant="link"
                    className="mt-2"
                    onClick={() => navigate("/book-repair")}
                  >
                    Book your first repair
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.slice(0, 5).map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/track?id=${booking.tracking_id}`)}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{booking.device_model}</span>
                          {getStatusBadge(booking.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {booking.service_type}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(booking.booking_date), "PPP")}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm font-mono text-primary">
                          <Search className="w-3 h-3" />
                          {booking.tracking_id}
                        </div>
                      </div>
                    </div>
                  ))}
                  {bookings.length > 5 && (
                    <Button variant="link" className="w-full">
                      View all {bookings.length} repairs
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <WhatsAppFloating phoneNumber="+254707907223" businessName="Nzuri Mobiles" />
    </div>
  );
};

export default Dashboard;
