import React, { useState } from "react";
import { Mail, Inbox, Send, Star, Trash2, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

const Email = () => {
  const isMobile = useIsMobile();
  const [selectedEmail, setSelectedEmail] = useState<number | null>(1);
  const [activeFolder, setActiveFolder] = useState("Inbox");

  const folders = [
    { icon: Inbox, label: "Inbox", count: 12 },
    { icon: Send, label: "Sent", count: 0 },
    { icon: Star, label: "Starred", count: 3 },
    { icon: Trash2, label: "Trash", count: 5 },
  ];

  const emails = [
    {
      id: 1,
      from: "John Smith",
      subject: "Project Update - Q4 2024",
      preview: "Here's the latest update on our Q4 progress...",
      time: "10:30 AM",
      unread: true,
    },
    {
      id: 2,
      from: "Sarah Johnson",
      subject: "Meeting Tomorrow",
      preview: "Don't forget about our meeting scheduled for...",
      time: "9:15 AM",
      unread: true,
    },
    {
      id: 3,
      from: "Tech Team",
      subject: "System Maintenance Notice",
      preview: "We will be performing scheduled maintenance...",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 4,
      from: "Marketing Dept",
      subject: "New Campaign Launch",
      preview: "Excited to announce our new marketing campaign...",
      time: "Yesterday",
      unread: false,
    },
  ];

  const currentEmail = emails.find(e => e.id === selectedEmail);

  return (
    <div className={`h-full ${isMobile ? 'flex flex-col' : 'flex'}`}>
      {/* Sidebar */}
      {!isMobile && <div className="w-56 border-r border-border p-4 space-y-2">
        <Button className="w-full mb-4">
          <Plus className="h-4 w-4 mr-2" />
          Compose
        </Button>
        {folders.map((folder) => (
          <Button
            key={folder.label}
            variant={activeFolder === folder.label ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveFolder(folder.label)}
          >
            <folder.icon className="h-4 w-4 mr-2" />
            {folder.label}
            {folder.count > 0 && (
              <span className="ml-auto text-xs">{folder.count}</span>
            )}
          </Button>
        ))}
      </div>}

      {/* Email List */}
      <div className={`${isMobile ? 'w-full' : 'w-96 border-r'} ${isMobile && selectedEmail ? 'hidden' : 'flex'} border-border flex-col`}>
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search emails..." className="pl-9" />
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {emails.map((email, index) => (
            <Card
              key={email.id}
              className={`p-4 border-b border-border rounded-none cursor-pointer hover:bg-muted/50 transition-os animate-fade-in-up ${
                selectedEmail === email.id ? 'bg-muted' : ''
              }`}
              style={{ animationDelay: `${index * 80}ms` }}
              onClick={() => setSelectedEmail(email.id)}
            >
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className={`font-medium truncate ${email.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {email.from}
                    </p>
                    <span className="text-xs text-muted-foreground">{email.time}</span>
                  </div>
                  <p className={`text-sm mb-1 truncate ${email.unread ? 'font-medium' : ''}`}>
                    {email.subject}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {email.preview}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Email Content */}
      <div className={`flex-1 ${isMobile && !selectedEmail ? 'hidden' : 'flex'} flex-col`}>
        {currentEmail ? (
          <>
            <div className={`border-b border-border ${isMobile ? 'p-4' : 'p-6'}`}>
              {isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedEmail(null)}
                  className="mb-4"
                >
                  ← Back
                </Button>
              )}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-2`}>{currentEmail.subject}</h2>
                  <p className="text-muted-foreground">From: {currentEmail.from}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Star className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{currentEmail.time}</p>
            </div>
            <div className={`flex-1 ${isMobile ? 'p-4' : 'p-6'} overflow-auto`}>
              <p className="text-foreground leading-relaxed">
                {currentEmail.preview}
              </p>
              <p className="mt-4 text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select an email to read
          </div>
        )}
      </div>
    </div>
  );
};

export default Email;