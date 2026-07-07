type ImagePreviewProps = {
  image: any;
};

export default function ImagePreview({
  image,
}: ImagePreviewProps) {
  if (!image) {
    return (
      <div className="flex items-center justify-center h-80 bg-gray-100 rounded-xl text-gray-400">
        No image selected
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="font-semibold mb-4">
        Preview
      </h2>

      <img
        src={image.image}
        alt={image.filename || "Uploaded image"}
        className="max-w-full max-h-[500px] mx-auto rounded-lg object-contain"
      />
    </div>
  );
}