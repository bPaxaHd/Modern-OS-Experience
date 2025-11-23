import Gallery from "@/components/Apps/Gallery";
import AppLayout from "@/components/Layout/AppLayout";
import { Image } from "lucide-react";

const GalleryPage = () => {
  return (
    <AppLayout title="Gallery" icon={Image}>
      <Gallery />
    </AppLayout>
  );
};

export default GalleryPage;
