import CalendarApp from "@/components/Apps/Calendar";
import AppLayout from "@/components/Layout/AppLayout";
import { Calendar } from "lucide-react";

const CalendarPage = () => {
  return (
    <AppLayout title="Calendar" icon={Calendar}>
      <CalendarApp />
    </AppLayout>
  );
};

export default CalendarPage;
