import Weather from "@/components/Apps/Weather";
import AppLayout from "@/components/Layout/AppLayout";
import { Cloud } from "lucide-react";

const WeatherPage = () => {
  return (
    <AppLayout title="Weather" icon={Cloud}>
      <Weather />
    </AppLayout>
  );
};

export default WeatherPage;
