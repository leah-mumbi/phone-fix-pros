import { useNavigate } from "react-router-dom";
import { useNotifications } from "@/hooks/useNotifications";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

const NotificationBell = () => {
  const navigate = useNavigate();
  const { unreadCount } = useNotifications();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="relative"
      onClick={() => navigate("/notifications")}
    >
      <Bell className="w-5 h-5" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </Button>
  );
};

export default NotificationBell;
