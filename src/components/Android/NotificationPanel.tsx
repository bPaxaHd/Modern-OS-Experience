import React, { useState, memo } from "react";
import { X, Mail, MessageSquare, Calendar, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/SettingsContext";

interface NotificationPanelProps {
  onClose: () => void;
}

const NotificationPanel = memo(({ onClose }: NotificationPanelProps) => {
  const { performanceMode } = useSettings();
  const isLowPerformance = performanceMode === "low";
  const [notifications] = useState([
    {
      id: "1",
      icon: Mail,
      app: "Email",
      title: "New message from John",
      message: "Hey, check out this new project idea!",
      time: "5 min ago",
      color: "bg-primary/20",
    },
    {
      id: "2",
      icon: MessageSquare,
      app: "Messages",
      title: "Sarah sent you a message",
      message: "Are we still meeting tomorrow?",
      time: "15 min ago",
      color: "bg-accent/20",
    },
    {
      id: "3",
      icon: Calendar,
      app: "Calendar",
      title: "Event reminder",
      message: "Team meeting in 1 hour",
      time: "30 min ago",
      color: "bg-secondary/20",
    },
  ]);

  return (
    <div className={`fixed inset-0 bg-background/95 z-50 flex flex-col ${!isLowPerformance ? 'backdrop-blur-lg animate-slide-in-right' : ''}`}>
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border/50">
        <h2 className="text-xl font-medium">Notifications</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-9 w-9"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {notifications.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Bell className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-muted-foreground">No notifications</p>
            </div>
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`rounded-2xl p-4 border border-border/50 group ${!isLowPerformance ? 'glass-effect hover:bg-muted/30 transition-os' : 'bg-card'}`}
            >
              <div className="flex items-start gap-3">
                <div className={`h-10 w-10 rounded-xl ${notif.color} flex items-center justify-center shrink-0`}>
                  <notif.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-xs text-muted-foreground font-medium">{notif.app}</span>
                    <span className="text-xs text-muted-foreground">{notif.time}</span>
                  </div>
                  <h3 className="font-medium mb-1">{notif.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{notif.message}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
});

NotificationPanel.displayName = "NotificationPanel";

export default NotificationPanel;
