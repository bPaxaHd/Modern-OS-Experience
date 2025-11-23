import MusicPlayer from "@/components/Apps/MusicPlayer";
import AppLayout from "@/components/Layout/AppLayout";
import { Music } from "lucide-react";

const MusicPage = () => {
  return (
    <AppLayout title="Music" icon={Music}>
      <MusicPlayer />
    </AppLayout>
  );
};

export default MusicPage;
