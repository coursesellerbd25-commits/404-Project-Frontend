import { useState } from "react";
import { uploadImage } from "../../services/image";

type ImageUploaderProps = {
  refresh: () => void;
};

export default function ImageUploader({
  refresh,
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
    <div>
      <h2 className="text-3xl font-bold mb-6">
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
        className="rounded-xl bg-cyan-400 px-8 py-3 text-white hover:bg-cyan-500"
      >
        Upload
      </button>

      {file && (
        <button
          onClick={handleUpload}
          className="ml-4 rounded-xl bg-blue-600 px-6 py-3 text-white"
        >
          {uploading ? "Uploading..." : "Confirm"}
        </button>
      )}
    </div>
  );
}