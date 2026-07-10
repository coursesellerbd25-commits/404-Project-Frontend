import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import ImageUploader from "../components/annotation/ImageUploader";
import PolygonCanvas from "../components/annotation/PolygonCanvas";

import { getImages } from "../services/image";
import { getPolygons } from "../services/polygon";

export default function AnnotationPage() {
  const [images, setImages] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [polygons, setPolygons] = useState<any[]>([]);

  const fetchImages = async () => {
    try {
      const data = await getImages();

      setImages(data);

      // Select first image automatically
      if (data.length > 0 && !selectedImage) {
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

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (selectedImage) {
      fetchPolygons(selectedImage.id);
    }
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-white p-6">
      <Navbar />

      <div className="mt-6 grid grid-cols-[260px_220px_1fr] gap-10">

        {/* ================= Sidebar ================= */}
        <div className="flex flex-col w-[260px]">

          <h2 className="text-4xl font-bold mb-8">
            Images
          </h2>

          <ImageUploader refresh={fetchImages} />

          <div className="mt-8 flex-1 overflow-y-auto space-y-5 h-[720px]">

            {images.map((image) => {

              return (
                <button
                  key={image.id}
                  onClick={() => {
                    setSelectedImage(image);
                  }}
                  className={`relative w-full rounded-2xl p-5 bg-cyan-400 text-white text-left transition
                  ${
                    selectedImage?.id === image.id
                      ? "border-2 border-black"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-center h-40">

                    <span className="text-2xl font-medium">
                      {image.filename}
                    </span>

                  </div>
                </button>
              );
            })}

          </div>
        </div>

        {/* ================= Toolbar ================= */}

        <div className="space-y-5">

          <button className="w-full h-14 bg-gray-200 rounded-md hover:bg-gray-300 transition text-left pl-8">
            Draw
          </button>

          <button className="w-full h-14 bg-gray-200 rounded-md hover:bg-gray-300 transition text-left pl-8">
            Delete
          </button>

          <button className="w-full h-14 bg-gray-200 rounded-md hover:bg-gray-300 transition text-left pl-8">
            Save
          </button>

          <div className="w-full h-14 bg-gray-200 rounded-md hover:bg-gray-300 transition text-left pl-8">
            Mode: Draw Polygon
          </div>

        </div>

        {/* ================= Right ================= */}

        <div className="flex flex-col">

          <div className="flex justify-end mb-6">

            <div className="text-right">

              <p className="text-xl font-semibold">
                Selected Image
              </p>

              <p className="text-lg">
                {selectedImage?.filename}
              </p>

            </div>

          </div>

          <PolygonCanvas
            image={selectedImage}
            polygons={polygons}
            refreshPolygons={() => {
              if (selectedImage) {
                fetchPolygons(selectedImage.id);
              }
            }}
          />

        </div>

      </div>

      <footer className="mt-12 pb-4 text-center text-gray-500">
        © 2026 404 Project
      </footer>

    </div>
  );
}