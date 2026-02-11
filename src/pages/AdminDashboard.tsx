import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import {
  Wrench,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Shield,
  Bell,
  TrendingUp,
  Calendar,
  Search,
  Edit,
} from "lucide-react";
import { format } from "date-fns";

interface Booking {
  id: string;
  tracking_id: string | null;
  user_id: string;
  service_type: string;
  device_model: string;
  issue_description: string;
  status: string;
  booking_date: string;
  created_at: string;
  estimated_completion: string | null;
  technician_notes: string | null;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
}

const AdminDashboard = () => {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [editStatus, setEditStatus] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate("/auth");
      } else if (!isAdmin) {
        navigate("/dashboard");
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges.",
          variant: "destructive",
        });
      }
    }
  }, [user, authLoading, isAdmin, navigate, toast]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchBookings();
    }
  }, [user, isAdmin]);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from("repair_bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast({
        title: "Error",
        description: "Failed to load bookings.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBooking = async () => {
    if (!selectedBooking) return;

    try {
      const { error } = await supabase
        .from("repair_bookings")
        .update({
          status: editStatus as "pending" | "in_progress" | "completed" | "cancelled" | "confirmed",
          technician_notes: editNotes,
        })
        .eq("id", selectedBooking.id);

      if (error) throw error;

      // Create notification for user
      await supabase.from("notifications").insert({
        user_id: selectedBooking.user_id,
        title: "Repair Status Updated",
        message: `Your repair for ${selectedBooking.device_model} is now ${editStatus.replace("_", " ")}.`,
        type: "status_update",
      });

      toast({
        title: "Success",
        description: "Booking updated successfully.",
      });

      setSelectedBooking(null);
      fetchBookings();
    } catch (error) {
      console.error("Error updating booking:", error);
      toast({
        title: "Error",
        description: "Failed to update booking.",
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

  const filteredBookings = bookings.filter(
    (b) =>
      b.tracking_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.device_model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.service_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) return null;

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    inProgress: bookings.filter((b) => b.status === "in_progress").length,
    completed: bookings.filter((b) => b.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage all repairs and notifications
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <div className="text-2xl font-bold">{stats.total}</div>
              </div>
              <p className="text-muted-foreground text-sm">Total Bookings</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-500" />
                <div className="text-2xl font-bold">{stats.pending}</div>
              </div>
              <p className="text-muted-foreground text-sm">Pending</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-blue-500" />
                <div className="text-2xl font-bold">{stats.inProgress}</div>
              </div>
              <p className="text-muted-foreground text-sm">In Progress</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div className="text-2xl font-bold">{stats.completed}</div>
              </div>
              <p className="text-muted-foreground text-sm">Completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Bookings Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              All Bookings
            </CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search bookings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tracking ID</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-mono text-primary">
                        {booking.tracking_id}
                      </TableCell>
                      <TableCell>{booking.device_model}</TableCell>
                      <TableCell>{booking.service_type}</TableCell>
                      <TableCell>
                        {format(new Date(booking.booking_date), "PP")}
                      </TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedBooking(booking);
                                setEditStatus(booking.status);
                                setEditNotes(booking.technician_notes || "");
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Update Booking: {booking.tracking_id}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 mt-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium">
                                  Device
                                </label>
                                <p className="text-muted-foreground">
                                  {booking.device_model}
                                </p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">
                                  Issue
                                </label>
                                <p className="text-muted-foreground">
                                  {booking.issue_description}
                                </p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">
                                  Status
                                </label>
                                <Select
                                  value={editStatus}
                                  onValueChange={setEditStatus}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">
                                      Pending
                                    </SelectItem>
                                    <SelectItem value="in_progress">
                                      In Progress
                                    </SelectItem>
                                    <SelectItem value="completed">
                                      Completed
                                    </SelectItem>
                                    <SelectItem value="cancelled">
                                      Cancelled
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">
                                  Technician Notes
                                </label>
                                <Textarea
                                  value={editNotes}
                                  onChange={(e) => setEditNotes(e.target.value)}
                                  placeholder="Add notes about the repair..."
                                />
                              </div>
                              <Button
                                className="w-full"
                                onClick={handleUpdateBooking}
                              >
                                Update Booking
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
