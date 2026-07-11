import { useState } from "react";
import { uploadImage } from "../../services/image";

type ImageUploaderProps = {
  refresh: () => void;
  darkMode: boolean;
};

export default function ImageUploader({
  refresh,
  darkMode,
}: ImageUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    try {
      setUploading(true);

      await uploadImage(file);

      setFile(null);
      refresh();

      alert("Image uploaded successfully!");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className={`text-2xl font-bold mb-4 ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
        Upload Image
      </h2>

      <input
        id="upload-image"
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const selected = e.target.files?.[0];

          if (!selected) return;

          setFile(selected);
        }}
      />

      <button
        onClick={() =>
          document
            .getElementById("upload-image")
            ?.click()
        }
        className="w-full sm:w-auto rounded-xl bg-cyan-400 px-6 py-3 text-white hover:bg-cyan-500"
      >
        Upload
      </button>

      {file && (
        <button
          onClick={handleUpload}
          className="mt-3 sm:mt-0 sm:ml-4 w-full sm:w-auto rounded-xl bg-blue-600 px-6 py-3 text-white"
        >
          {uploading ? "Uploading..." : "Confirm"}
        </button>
      )}
    </div>
  );
}