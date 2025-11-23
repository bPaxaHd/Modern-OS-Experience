import { 
  Folder, FileText, Image, Settings, Calculator as CalcIcon, 
  Clock as ClockIcon, Cloud, Music, Calendar as CalendarIcon, 
  Globe, Mail, Map, Phone as PhoneIcon, MessageSquare, Camera as CameraIcon
} from "lucide-react";

interface AppConfig {
  id: string;
  name: string;
  icon: any;
}

export const DESKTOP_APPS: AppConfig[] = [
  { id: "Calculator", name: "Calculator", icon: CalcIcon },
  { id: "Clock", name: "Clock", icon: ClockIcon },
  { id: "Notes", name: "Notes", icon: FileText },
  { id: "Gallery", name: "Gallery", icon: Image },
  { id: "Settings", name: "Settings", icon: Settings },
  { id: "Weather", name: "Weather", icon: Cloud },
  { id: "Music", name: "Music", icon: Music },
  { id: "Files", name: "Files", icon: Folder },
  { id: "Calendar", name: "Calendar", icon: CalendarIcon },
  { id: "Browser", name: "Browser", icon: Globe },
  { id: "Email", name: "Email", icon: Mail },
  { id: "Maps", name: "Maps", icon: Map },
  { id: "Phone", name: "Phone", icon: PhoneIcon },
  { id: "Messages", name: "Messages", icon: MessageSquare },
  { id: "Camera", name: "Camera", icon: CameraIcon },
];
