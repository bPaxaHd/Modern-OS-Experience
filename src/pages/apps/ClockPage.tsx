import Clock from "@/components/Apps/Clock";
import AppLayout from "@/components/Layout/AppLayout";
import { Clock as ClockIcon } from "lucide-react";

const ClockPage = () => {
  return (
    <AppLayout title="Clock" icon={ClockIcon}>
      <Clock />
    </AppLayout>
  );
};

export default ClockPage;
