import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import ImageUploader from "../components/annotation/ImageUploader";
import PolygonCanvas from "../components/annotation/PolygonCanvas";
import Footer from "../components/Footer";

import { getImages } from "../services/image";
import { getPolygons } from "../services/polygon";

export default function AnnotationPage() {
  const [darkMode, setDarkMode] = useState(false);
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

    <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

    <div className="mt-6 grid grid-cols-[260px_1fr] gap-8">


      {/* ================= Sidebar ================= */}
      <div className="flex flex-col w-[260px]">

        <h2 className={`text-4xl font-bold mb-8 ${
              darkMode ? "text-white" : "text-black"
            }`}
        >
          Images
        </h2>


        <ImageUploader refresh={fetchImages} darkMode={darkMode} />


        <div className="
          mt-8
          overflow-y-auto
          space-y-5
          h-[720px]
          pr-2
        ">

          {images.map((image) => (

            <button
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className={`
                relative
                w-full
                h-52
                rounded-2xl
                bg-cyan-400
                text-white
                transition

                ${
                  selectedImage?.id === image.id
                  ? darkMode
                    ? "border-2 border-white"
                    : "border-2 border-black"
                  : ""
                }
              `}
            >

              <span className="
                text-xl
                font-medium
              ">
                {image.filename}
              </span>


              <span className="
                absolute
                bottom-4
                right-5
                text-sm
                text-red-600
              ">
                Delete
              </span>


            </button>

          ))}

        </div>

      </div>


      {/* ================= Right Side ================= */}

      <div className="flex flex-col">


        {/* Top Controls Row */}
        <div className="
          flex
          justify-between
          items-start
          mb-6
        ">


          {/* Toolbar */}
          <div className="
            flex
            gap-6
          ">


            <button
              className="
                w-60
                h-14
                bg-gray-200
                rounded-md
                text-lg
                hover:bg-gray-300
              "
            >
              Save
            </button>



            <div
              className="
                w-60
                h-14
                bg-gray-200
                rounded-md
                flex
                items-center
                justify-center
                text-lg
              "
            >
              Mode: Draw Polygon
            </div>


          </div>




          {/* Selected Image */}
          <div className="
            text-right
            mr-8
          ">

            <p className={`text-xl font-semibold ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Selected Image
            </p>


            <p className={`text-lg mt-2 ${
                  darkMode ? "text-white" : "text-black"
                }`}
            >
              {
                selectedImage?.filename ||
                "No image selected"
              }
            </p>


          </div>


        </div>





        {/* Canvas */}

        <div className="
          bg-gray-200
          rounded-none
          p-5
          w-full
          min-h-[720px]
          flex
          justify-center
          items-center
        ">


          <PolygonCanvas
            image={selectedImage}
            polygons={polygons}
            refreshPolygons={() => {
              if(selectedImage){
                fetchPolygons(selectedImage.id);
              }
            }}
          />


        </div>


      </div>


    </div>


    <Footer darkMode={darkMode}/>


  </div>
);
}