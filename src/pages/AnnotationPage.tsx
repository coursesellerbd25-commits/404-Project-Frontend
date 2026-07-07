import { useEffect, useState } from "react";

import ImageUploader from "../components/annotation/ImageUploader";
import PolygonCanvas from "../components/annotation/PolygonCanvas";

import { getImages } from "../services/image";
import { getPolygons } from "../services/polygon";

export default function AnnotationPage() {
  const [images, setImages] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [polygons, setPolygons] = useState<any[]>([]);

  const fetchImages = async () => {
    try {
      const data = await getImages();

      setImages(data);

      // Select first image automatically
      if (data.length > 0 && !selectedImage) {
        setCurrentIndex(0);
        setSelectedImage(data[0]);
      }
    } catch (err) {
      console.error("Failed to fetch images", err);
    }
  };

  const fetchPolygons = async (imageId: number) => {
    try {
      setPolygons([]);
      const data = await getPolygons(imageId);
      setPolygons(data);
    } catch (err) {
      console.error("Failed to fetch polygons", err);
    }
  };

  const nextImage = () => {
    if (images.length === 0) return;

    const nextIndex =
        (currentIndex + 1) % images.length;

    setCurrentIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
 };

  const previousImage = () => {
    if (images.length === 0) return;

    const previousIndex =
        (currentIndex - 1 + images.length) % images.length;

    setCurrentIndex(previousIndex);
    setSelectedImage(images[previousIndex]);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (selectedImage) {
      fetchPolygons(selectedImage.id);
    }
  }, [selectedImage]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Image Annotation
      </h1>

      {/* Upload */}
      <ImageUploader refresh={fetchImages} />

      {/* Image List */}
      {images.length > 0 && (
        <div className="mt-6 flex gap-3 flex-wrap">
          {images.map((image) => (
            <button
              key={image.id}
              onClick={() => {
                const index = images.findIndex(
                    (img) => img.id === image.id
                );
                setCurrentIndex(index);
                setSelectedImage(image);
             }}
              className="border rounded-lg p-2"
            >
              <img
                src={image.image}
                alt={image.filename}
                className="w-24 h-24 object-cover rounded"
              />
            </button>
          ))}
        </div>
      )}

      {/* Preview */}
      {images.length > 0 && (
        <div className="mt-6 flex items-center justify-center gap-6">

        <button
            onClick={previousImage}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
            ← Previous
        </button>


        <span className="text-sm text-gray-600">
            Image {currentIndex + 1} / {images.length}
        </span>

        <button
            onClick={nextImage}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
            Next →
        </button>

        </div>
      )}

      <div className="mt-6">
        <PolygonCanvas image={selectedImage} polygons={polygons} refreshPolygons={() => {if (selectedImage) {fetchPolygons(selectedImage.id);}}} />
      </div>
    </div>
  );
}