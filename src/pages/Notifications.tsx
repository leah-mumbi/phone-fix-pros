import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  BellOff,
  Check,
  CheckCheck,
  Info,
  AlertCircle,
  Wrench,
  Calendar,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";

const Notifications = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { notifications, loading, unreadCount, markAsRead, markAllAsRead } =
    useNotifications();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "status_update":
        return <Wrench className="w-5 h-5 text-primary" />;
      case "reminder":
        return <Calendar className="w-5 h-5 text-yellow-500" />;
      case "alert":
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      default:
        return <Info className="w-5 h-5 text-muted-foreground" />;
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Bell className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">Notifications</h1>
                <p className="text-muted-foreground">
                  {unreadCount > 0
                    ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                    : "All caught up!"}
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <CheckCheck className="w-4 h-4 mr-2" />
                Mark all read
              </Button>
            )}
          </div>

          {notifications.length === 0 ? (
            <Card>
              <CardContent className="pt-12 pb-12 text-center">
                <BellOff className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-xl font-semibold mb-2">No notifications</h3>
                <p className="text-muted-foreground">
                  You'll see updates about your repairs here
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`transition-all ${
                    !notification.is_read
                      ? "border-primary/50 bg-primary/5"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-full bg-background border border-border">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-medium flex items-center gap-2">
                              {notification.title}
                              {!notification.is_read && (
                                <Badge variant="default" className="text-xs">
                                  New
                                </Badge>
                              )}
                            </h4>
                            <p className="text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                          </div>
                          {!notification.is_read && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => markAsRead(notification.id)}
                              className="shrink-0"
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {formatDistanceToNow(new Date(notification.created_at), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Notifications;
