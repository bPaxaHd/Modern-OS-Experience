import React, { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Plus, Trash2, Download, X, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { VirtualList } from "@/components/Optimized/VirtualList";
import { ProgressiveImage } from "@/components/Optimized/ProgressiveImage";

interface GalleryImage {
  id: string;
  url: string;
  name: string;
  addedAt: string;
}

const Gallery = () => {
  const isMobile = useIsMobile();
  const [images, setImages] = useLocalStorage<GalleryImage[]>("gallery-images", []);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const handleAddImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newImage: GalleryImage = {
            id: Date.now().toString(),
            url: event.target?.result as string,
            name: file.name,
            addedAt: new Date().toISOString(),
          };
          setImages([newImage, ...images]);
          toast.success("Image added to gallery");
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleDeleteImage = (id: string) => {
    setImages(images.filter(img => img.id !== id));
    if (selectedImageIndex !== null && images[selectedImageIndex]?.id === id) {
      setSelectedImageIndex(null);
    }
    toast.success("Image deleted");
  };

  const handleDownload = (image: GalleryImage) => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = image.name;
    link.click();
    toast.success("Image downloaded");
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImageIndex === null) return;
    if (direction === 'prev') {
      setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : images.length - 1);
    } else {
      setSelectedImageIndex(selectedImageIndex < images.length - 1 ? selectedImageIndex + 1 : 0);
    }
  };

    return (
      <div className={`h-full bg-background ${isMobile ? 'p-2' : 'p-4'}`}>
        <div className="mb-4">
        <Button
          onClick={handleAddImage}
          className="bg-primary hover:bg-primary/90 burgundy-glow"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Image
        </Button>
      </div>

      <div className="h-[calc(100%-4rem)]">
        {images.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
            <ImageIcon className="h-16 w-16 mb-4 opacity-50" />
            <p className="text-lg mb-2">No images yet</p>
            <p className="text-sm">Click "Add Image" to upload photos</p>
          </div>
        ) : (
          <VirtualList
            items={images}
            height={window.innerHeight - 200}
            itemHeight={isMobile ? 180 : 220}
            className="px-2"
            renderItem={(image, index) => (
              <div
                onClick={() => setSelectedImageIndex(index)}
                className="aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer group relative transition-os hover:scale-105 hover:shadow-window animate-zoom-in mb-4 mx-2"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProgressiveImage
                  src={image.url}
                  alt={image.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-white" />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteImage(image.id);
                  }}
                  className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 hover:bg-destructive/20 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          />
        )}
      </div>

      {selectedImageIndex !== null && images[selectedImageIndex] && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-4 right-4 h-12 w-12 text-white hover:bg-white/10"
          >
            <X className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateImage('prev')}
            className="absolute left-4 h-12 w-12 text-white hover:bg-white/10"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateImage('next')}
            className="absolute right-4 h-12 w-12 text-white hover:bg-white/10"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          <div className="max-w-4xl max-h-[80vh] flex flex-col items-center">
            <ProgressiveImage
              src={images[selectedImageIndex].url}
              alt={images[selectedImageIndex].name}
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-window mb-4"
            />
            <div className="flex items-center gap-4 text-white">
              <span className="text-sm">{images[selectedImageIndex].name}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm">
                {selectedImageIndex + 1} / {images.length}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
                onClick={() => handleDownload(images[selectedImageIndex])}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-destructive/20 hover:text-destructive"
                onClick={() => handleDeleteImage(images[selectedImageIndex].id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
