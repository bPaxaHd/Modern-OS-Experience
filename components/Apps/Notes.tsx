import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Edit } from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

const Notes = () => {
  const isMobile = useIsMobile();
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", [
    { id: "1", title: "Welcome", content: "Welcome to Notes app! Create your first note.", createdAt: new Date().toISOString() }
  ]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(notes[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    if (notes.length > 0 && !selectedNote) {
      setSelectedNote(notes[0]);
    }
  }, [notes, selectedNote]);

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "New Note",
      content: "",
      createdAt: new Date().toISOString(),
    };
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    setSelectedNote(newNote);
    setEditTitle(newNote.title);
    setEditContent(newNote.content);
    setIsEditing(true);
    toast.success("New note created");
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter(n => n.id !== id);
    setNotes(updatedNotes);
    if (selectedNote?.id === id) {
      setSelectedNote(updatedNotes[0] || null);
    }
    toast.success("Note deleted");
  };

  const startEditing = (note: Note) => {
    setSelectedNote(note);
    setEditTitle(note.title);
    setEditContent(note.content);
    setIsEditing(true);
  };

  const saveNote = () => {
    if (selectedNote) {
      const updatedNotes = notes.map(n => 
        n.id === selectedNote.id 
          ? { ...n, title: editTitle, content: editContent }
          : n
      );
      setNotes(updatedNotes);
      setSelectedNote({ ...selectedNote, title: editTitle, content: editContent });
      setIsEditing(false);
      toast.success("Note saved");
    }
  };

  return (
    <div className={`h-full ${isMobile ? 'flex flex-col' : 'flex'} bg-background`}>
      {/* Notes List */}
      <div className={`${isMobile ? 'w-full max-h-48 border-b' : 'w-64 border-r'} border-border flex flex-col`}>
        <div className="p-3 border-b border-border">
          <Button
            onClick={createNewNote}
            className="w-full bg-primary hover:bg-primary/90 burgundy-glow"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Note
          </Button>
        </div>
        <div className="flex-1 overflow-auto">
          {notes.map((note, index) => (
            <div
              key={note.id}
              onClick={() => {
                setSelectedNote(note);
                setIsEditing(false);
              }}
              className={`p-3 border-b border-border cursor-pointer transition-os hover:bg-muted/50 group animate-slide-in-left ${
                selectedNote?.id === note.id ? "bg-muted burgundy-border" : ""
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{note.title}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {note.content || "No content"}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNote(note.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        </div>

        <div className="flex-1 flex flex-col">
        {selectedNote ? (
          <>
            <div className="p-4 border-b border-border flex items-center justify-between">
              {isEditing ? (
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="text-xl font-semibold border-0 bg-transparent px-0 focus-visible:ring-0"
                />
              ) : (
                <h2 className="text-xl font-semibold">{selectedNote.title}</h2>
              )}
              <div className="flex gap-2">
                {isEditing ? (
                  <Button onClick={saveNote} className="bg-primary hover:bg-primary/90">
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={() => startEditing(selectedNote)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>
            </div>
            <div className="flex-1 p-4 overflow-auto">
              {isEditing ? (
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="min-h-full resize-none border-0 bg-transparent focus-visible:ring-0"
                  placeholder="Start typing..."
                />
              ) : (
                <div className="whitespace-pre-wrap">{selectedNote.content}</div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a note or create a new one
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
