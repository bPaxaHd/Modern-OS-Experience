import Phone from "@/components/Apps/Phone";
import AppLayout from "@/components/Layout/AppLayout";
import { Phone as PhoneIcon } from "lucide-react";

const PhonePage = () => {
  return (
    <AppLayout title="Phone" icon={PhoneIcon}>
      <Phone />
    </AppLayout>
  );
};

export default PhonePage;
