import React, { useState } from "react";
import { Folder, FileText, Image, Video, Music, File, Home, Star, Trash2, Search, Grid3x3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

const FileManager = () => {
  const isMobile = useIsMobile();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const folders = [
    { id: 1, name: "Documents", icon: Folder, items: 124, color: "text-primary" },
    { id: 2, name: "Downloads", icon: Folder, items: 89, color: "text-accent" },
    { id: 3, name: "Pictures", icon: Image, items: 456, color: "text-secondary" },
    { id: 4, name: "Videos", icon: Video, items: 23, color: "text-primary/70" },
    { id: 5, name: "Music", icon: Music, items: 234, color: "text-accent/70" },
    { id: 6, name: "Projects", icon: Folder, items: 56, color: "text-secondary/70" },
  ];

  const files = [
    { id: 1, name: "Report.docx", type: "Document", size: "2.4 MB", icon: FileText },
    { id: 2, name: "Presentation.pdf", type: "PDF", size: "5.1 MB", icon: File },
    { id: 3, name: "Photo.jpg", type: "Image", size: "1.8 MB", icon: Image },
  ];

  const sidebar = [
    { icon: Home, label: "Home", active: true },
    { icon: Star, label: "Favorites", active: false },
    { icon: Folder, label: "Files", active: false },
    { icon: Trash2, label: "Trash", active: false },
  ];

  return (
    <div className={`h-full ${isMobile ? 'flex flex-col' : 'flex'}`}>
      {/* Sidebar */}
      {!isMobile && <div className="w-48 border-r border-border p-4 space-y-2">
        {sidebar.map((item) => (
          <Button
            key={item.label}
            variant={item.active ? "secondary" : "ghost"}
            className="w-full justify-start"
          >
            <item.icon className="h-4 w-4 mr-2" />
            {item.label}
          </Button>
        ))}
      </div>}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="border-b border-border p-4 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search files..." className="pl-9" />
          </div>
          <div className="flex gap-1">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className={`flex-1 ${isMobile ? 'p-4' : 'p-6'} overflow-auto`}>
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">Folders</h3>
            <div className={`grid ${viewMode === "grid" ? (isMobile ? "grid-cols-2" : "grid-cols-3") : "grid-cols-1"} gap-3`}>
              {folders.map((folder, index) => (
                <Card key={folder.id} className="p-4 cursor-pointer hover:bg-muted/50 transition-os animate-zoom-in" style={{ animationDelay: `${index * 60}ms` }}>
                  <div className="flex items-center gap-3">
                    <folder.icon className={`h-10 w-10 ${folder.color}`} />
                    <div className="flex-1">
                      <p className="font-medium">{folder.name}</p>
                      <p className="text-sm text-muted-foreground">{folder.items} items</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">Recent Files</h3>
            <div className="space-y-2">
              {files.map((file, index) => (
                <Card key={file.id} className="p-3 cursor-pointer hover:bg-muted/50 transition-os animate-slide-in-left" style={{ animationDelay: `${400 + index * 80}ms` }}>
                  <div className="flex items-center gap-3">
                    <file.icon className="h-8 w-8 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{file.type} • {file.size}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileManager;