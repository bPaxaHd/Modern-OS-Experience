import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone as PhoneIcon, Delete, Video, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

const Phone = () => {
  const isMobile = useIsMobile();
  const [number, setNumber] = useState("");

  const contacts = [
    { id: 1, name: "John Doe", number: "+1 234 567 8900", recent: true },
    { id: 2, name: "Jane Smith", number: "+1 234 567 8901", recent: true },
    { id: 3, name: "Bob Johnson", number: "+1 234 567 8902", recent: false },
    { id: 4, name: "Alice Brown", number: "+1 234 567 8903", recent: false },
  ];

  const recentCalls = contacts.filter(c => c.recent);

  const handleNumberClick = (digit: string) => {
    setNumber(prev => prev + digit);
  };

  const handleDelete = () => {
    setNumber(prev => prev.slice(0, -1));
  };

  const handleCall = () => {
    if (number) {
      alert(`Calling ${number}...`);
    }
  };

  const buttonClass = isMobile ? "h-14 text-xl font-light" : "h-16 text-2xl font-light";

  return (
    <div className={`h-full bg-background ${isMobile ? 'p-3' : 'p-6'}`}>
      <Tabs defaultValue="dial" className="h-full">
        <TabsList className={`grid w-full grid-cols-3 ${isMobile ? 'mb-4' : 'mb-6'}`}>
          <TabsTrigger value="dial">Dial</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
        </TabsList>

        {/* Dial Pad */}
        <TabsContent value="dial" className="flex flex-col">
          <div className={`${isMobile ? 'mb-4 p-4' : 'mb-6 p-6'} bg-card rounded-xl border border-border`}>
            <Input
              value={number}
              readOnly
              placeholder="Enter number"
              className={`text-center ${isMobile ? 'text-2xl h-14' : 'text-3xl h-16'} font-light border-0 focus-visible:ring-0`}
            />
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit, index) => (
              <Button
                key={digit}
                variant="outline"
                className={`${buttonClass} animate-scale-in`}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => handleNumberClick(digit.toString())}
              >
                {digit}
              </Button>
            ))}
            <Button
              variant="outline"
              className={`${buttonClass} animate-scale-in`}
              style={{ animationDelay: '450ms' }}
              onClick={() => handleNumberClick("*")}
            >
              *
            </Button>
            <Button
              variant="outline"
              className={`${buttonClass} animate-scale-in`}
              style={{ animationDelay: '500ms' }}
              onClick={() => handleNumberClick("0")}
            >
              0
            </Button>
            <Button
              variant="outline"
              className={`${buttonClass} animate-scale-in`}
              style={{ animationDelay: '550ms' }}
              onClick={() => handleNumberClick("#")}
            >
              #
            </Button>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="icon"
              className={`${isMobile ? 'h-14 w-14' : 'h-16 w-16'}`}
              onClick={handleDelete}
            >
              <Delete className={isMobile ? 'h-5 w-5' : 'h-6 w-6'} />
            </Button>
            <Button
              className={`flex-1 ${isMobile ? 'h-14' : 'h-16'} bg-primary hover:bg-primary/90 burgundy-glow`}
              onClick={handleCall}
            >
              <PhoneIcon className={`${isMobile ? 'h-5 w-5 mr-2' : 'h-6 w-6 mr-2'}`} />
              Call
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={`${isMobile ? 'h-14 w-14' : 'h-16 w-16'}`}
            >
              <Video className={isMobile ? 'h-5 w-5' : 'h-6 w-6'} />
            </Button>
          </div>
        </TabsContent>

        {/* Recent Calls */}
        <TabsContent value="recent" className="space-y-3 overflow-auto">
          {recentCalls.map((contact, index) => (
            <Card key={contact.id} className="p-4 cursor-pointer hover:bg-muted/50 transition-os animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-muted-foreground">{contact.number}</p>
                </div>
                <Button variant="ghost" size="icon">
                  <PhoneIcon className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </TabsContent>

        {/* Contacts */}
        <TabsContent value="contacts" className="space-y-3 overflow-auto">
          {contacts.map((contact, index) => (
            <Card key={contact.id} className="p-4 cursor-pointer hover:bg-muted/50 transition-os animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-muted-foreground">{contact.number}</p>
                </div>
                <Button variant="ghost" size="icon">
                  <PhoneIcon className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Phone;
