import Camera from "@/components/Apps/Camera";
import AppLayout from "@/components/Layout/AppLayout";
import { Camera as CameraIcon } from "lucide-react";

const CameraPage = () => {
  return (
    <AppLayout title="Camera" icon={CameraIcon}>
      <Camera />
    </AppLayout>
  );
};

export default CameraPage;
