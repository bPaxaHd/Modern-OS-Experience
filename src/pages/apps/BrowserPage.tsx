import UnifiedBrowser from "@/components/Apps/UnifiedBrowser";
import AppLayout from "@/components/Layout/AppLayout";
import { Globe } from "lucide-react";

const BrowserPage = () => {
  return (
    <AppLayout title="Browser" icon={Globe}>
      <UnifiedBrowser />
    </AppLayout>
  );
};

export default BrowserPage;
