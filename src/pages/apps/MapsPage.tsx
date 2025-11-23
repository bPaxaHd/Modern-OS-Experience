import Maps from "@/components/Apps/Maps";
import AppLayout from "@/components/Layout/AppLayout";
import { Map } from "lucide-react";

const MapsPage = () => {
  return (
    <AppLayout title="Maps" icon={Map}>
      <Maps />
    </AppLayout>
  );
};

export default MapsPage;
