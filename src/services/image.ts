import api from "./api";

// Upload image
export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await api.post("annotations/upload/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// Get all uploaded images
export const getImages = async () => {
  const res = await api.get("annotations/upload/");
  return res.data;
};