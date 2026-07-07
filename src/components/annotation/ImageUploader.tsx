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
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4">
        Upload Image
      </h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setFile(e.target.files?.[0] || null)
        }
        className="mb-4 block w-full"
      />

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}