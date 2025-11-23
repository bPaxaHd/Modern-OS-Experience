import Messages from "@/components/Apps/Messages";
import AppLayout from "@/components/Layout/AppLayout";
import { MessageSquare } from "lucide-react";

const MessagesPage = () => {
  return (
    <AppLayout title="Messages" icon={MessageSquare}>
      <Messages />
    </AppLayout>
  );
};

export default MessagesPage;
