import SettingsApp from "@/components/Apps/Settings";
import AppLayout from "@/components/Layout/AppLayout";
import { Settings } from "lucide-react";

const SettingsPage = () => {
  return (
    <AppLayout title="Settings" icon={Settings}>
      <SettingsApp />
    </AppLayout>
  );
};

export default SettingsPage;
