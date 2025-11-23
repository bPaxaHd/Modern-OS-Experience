import Email from "@/components/Apps/Email";
import AppLayout from "@/components/Layout/AppLayout";
import { Mail } from "lucide-react";

const EmailPage = () => {
  return (
    <AppLayout title="Email" icon={Mail}>
      <Email />
    </AppLayout>
  );
};

export default EmailPage;
