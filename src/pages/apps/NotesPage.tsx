import Notes from "@/components/Apps/Notes";
import AppLayout from "@/components/Layout/AppLayout";
import { FileText } from "lucide-react";

const NotesPage = () => {
  return (
    <AppLayout title="Notes" icon={FileText}>
      <Notes />
    </AppLayout>
  );
};

export default NotesPage;
