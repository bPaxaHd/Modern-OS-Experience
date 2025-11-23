import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, User, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface Message {
  id: number;
  text: string;
  sender: "me" | "other";
  time: string;
}

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: Message[];
}

const Messages = () => {
  const isMobile = useIsMobile();
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState("");

  const chats: Chat[] = [
    { 
      id: 1, 
      name: "John Doe", 
      lastMessage: "See you tomorrow!", 
      time: "10:30 AM", 
      unread: 2,
      messages: [
        { id: 1, text: "Hey! How are you?", sender: "other", time: "10:25 AM" },
        { id: 2, text: "I'm good, thanks! How about you?", sender: "me", time: "10:26 AM" },
        { id: 3, text: "Doing great! Want to meet tomorrow?", sender: "other", time: "10:28 AM" },
        { id: 4, text: "Sure! What time works for you?", sender: "me", time: "10:29 AM" },
        { id: 5, text: "See you tomorrow!", sender: "other", time: "10:30 AM" },
      ]
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      lastMessage: "Thanks for the help", 
      time: "Yesterday", 
      unread: 0,
      messages: [
        { id: 1, text: "Can you help me with this?", sender: "other", time: "Yesterday 2:00 PM" },
        { id: 2, text: "Sure! What do you need?", sender: "me", time: "Yesterday 2:05 PM" },
        { id: 3, text: "Thanks for the help", sender: "other", time: "Yesterday 3:30 PM" },
      ]
    },
    { 
      id: 3, 
      name: "Team Group", 
      lastMessage: "Meeting at 3 PM", 
      time: "Yesterday", 
      unread: 5,
      messages: [
        { id: 1, text: "Don't forget about the meeting", sender: "other", time: "Yesterday 1:00 PM" },
        { id: 2, text: "What time?", sender: "me", time: "Yesterday 1:15 PM" },
        { id: 3, text: "Meeting at 3 PM", sender: "other", time: "Yesterday 1:20 PM" },
      ]
    },
    { 
      id: 4, 
      name: "Bob Johnson", 
      lastMessage: "Great work!", 
      time: "Monday", 
      unread: 0,
      messages: [
        { id: 1, text: "I reviewed your work", sender: "other", time: "Monday 10:00 AM" },
        { id: 2, text: "Thanks! Any feedback?", sender: "me", time: "Monday 10:30 AM" },
        { id: 3, text: "Great work!", sender: "other", time: "Monday 11:00 AM" },
      ]
    },
  ];

  const currentChat = chats.find(c => c.id === selectedChat);
  const currentMessages = currentChat?.messages || [];

  const handleSend = () => {
    if (newMessage.trim()) {
      setNewMessage("");
    }
  };

  return (
    <div className={`h-full ${isMobile ? 'flex flex-col' : 'flex'} bg-background`}>
      {/* Chats List */}
      <div className={`${isMobile ? (selectedChat ? 'hidden' : 'w-full') : 'w-80 border-r'} border-border flex flex-col`}>
        <div className={`${isMobile ? 'p-3' : 'p-4'} border-b border-border`}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search messages..." className="pl-9" />
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {chats.map((chat, index) => (
            <Card
              key={chat.id}
              className={`p-4 border-b border-border rounded-none cursor-pointer hover:bg-muted/50 transition-os animate-fade-in-up ${
                selectedChat === chat.id ? 'bg-muted' : ''
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setSelectedChat(chat.id)}
            >
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium truncate">{chat.name}</p>
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <span className="ml-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center flex-shrink-0">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className={`flex-1 ${isMobile && !selectedChat ? 'hidden' : 'flex'} flex-col`}>
        {currentChat ? (
          <>
            {/* Header */}
            <div className={`border-b border-border ${isMobile ? 'p-3' : 'p-4'} flex items-center gap-3`}>
              {isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedChat(null)}
                >
                  ←
                </Button>
              )}
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{currentChat.name}</p>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>

            {/* Messages */}
            <div className={`flex-1 ${isMobile ? 'p-3' : 'p-6'} overflow-auto space-y-4`}>
              {currentMessages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "me" ? "justify-end animate-slide-in-right" : "justify-start animate-slide-in-left"}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`max-w-[70%] ${isMobile ? 'p-3' : 'p-4'} rounded-2xl ${
                      message.sender === "me"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className={isMobile ? 'text-sm' : ''}>{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className={`border-t border-border ${isMobile ? 'p-3' : 'p-4'} flex gap-2`}>
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
