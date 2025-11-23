import FileManager from "@/components/Apps/FileManager";
import AppLayout from "@/components/Layout/AppLayout";
import { Folder } from "lucide-react";

const FilesPage = () => {
  return (
    <AppLayout title="Files" icon={Folder}>
      <FileManager />
    </AppLayout>
  );
};

export default FilesPage;
