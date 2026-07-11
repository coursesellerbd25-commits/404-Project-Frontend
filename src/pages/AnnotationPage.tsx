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
  <div className={`min-h-screen px-4 sm:px-6 lg:px-8 py-5 sm:py-6 transition-colors duration-300 ${
        darkMode
          ? "bg-black"
          : "bg-white"
    }`}
  >

    <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

    <div className="mt-6 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">


      {/* ================= Sidebar ================= */}
      <div className="flex flex-col w-full lg:w-[260px]">

        <h2 className={`text-3xl sm:text-4xl font-bold mb-8 ${
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
          lg:h-[720px]
          max-h-[400px]
          pr-2
        ">

          {images.map((image) => (

            <button
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className={`
                group
                relative
                w-full
                h-44 sm:h-52
                overflow-hidden
                rounded-2xl
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

               {/* Uploaded Image */}
                <img
                  src={image.image}
                  alt={image.filename}
                  className="h-full w-full object-cover"
                />

              {/* Hover Overlay */}
                <div
                  className={`
                    absolute inset-0
                    flex flex-col items-center justify-center
                   bg-cyan-400/90
                   text-white
                    opacity-0
                    transition-opacity
                    duration-300
                    group-hover:opacity-100

                  ${
                  selectedImage?.id === image.id
                    ? "opacity-100"
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
              </div>
            </button>

          ))}

        </div>

      </div>


      {/* ================= Right Side ================= */}

      <div className="flex flex-col">


        {/* Top Controls Row */}
        <div className="
          flex
          flex-col
          lg:flex-row
          gap-5
          lg:justify-between
          lg:items-start
          mb-6
        ">


          {/* Toolbar */}
          <div className="
            flex
            gap-6
          ">

            <div
              className="
                w-full
                sm:w-60
                h-12
                sm:h-14
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
            text-left
            lg:text-right
            mr-0
            lg:mr-8
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
          p-2 sm:p-4 lg:p-5
          w-full
          min-h-[420px]
          sm:min-h-[550px]
          lg:min-h-[720px]
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