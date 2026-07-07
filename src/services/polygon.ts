import api from "./api";

// Get all polygons for an image
export const getPolygons = async (imageId: number) => {
  const res = await api.get(`annotations/polygon/?image=${imageId}`);
  return res.data;
};

// Save a new polygon
export const savePolygon = async (
  imageId: number,
  points: number[][],
  label = ""
) => {
  const res = await api.post("annotations/polygon/", {
    image: imageId,
    points,
    label,
  });

  return res.data;
};

// Delete a polygon
export const deletePolygon = async (id: number) => {
  await api.delete(`annotations/polygon/${id}/`);
};