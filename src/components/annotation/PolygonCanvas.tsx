import { useState } from "react";
import {
  Stage,
  Layer,
  Image as KonvaImage,
  Line,
  Circle,
} from "react-konva";
import useImage from "use-image";
import { savePolygon, deletePolygon, } from "../../services/polygon";

type PolygonCanvasProps = {
  image: any;
  polygons: any[];
  refreshPolygons: () => void;
};

export default function PolygonCanvas({
  image,
  polygons,
  refreshPolygons,
}: PolygonCanvasProps) {
  const [img] = useImage(image?.image || "");
  const [hoveredPolygon, setHoveredPolygon] = useState<number | null>(null);
  const [points, setPoints] = useState<number[]>([]);

  const handleClick = (e: any) => {
    const stage = e.target.getStage();
    const pointer = stage.getPointerPosition();

    if (!pointer) return;

    setPoints((prev) => [
      ...prev,
      pointer.x,
      pointer.y,
    ]);
  };

  const convertPoints = () => {
    const converted: number[][] = [];

    for (let i = 0; i < points.length; i += 2) {
      converted.push([
        points[i],
        points[i + 1],
      ]);
    }

    return converted;
  };

  const handleSave = async () => {
    if (!image) return;

    try {
      await savePolygon(
        image.id,
        convertPoints()
      );

      setPoints([]);
      refreshPolygons();

      alert("Polygon saved!");
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this polygon?"
    );

    if (!confirmed) return;

    try {
      await deletePolygon(id);

      refreshPolygons();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <Stage
        width={800}
        height={600}
        onClick={handleClick}
      >
        <Layer>
          {img && (
            <KonvaImage
              image={img}
              width={800}
              height={600}
            />
          )}

          {polygons.map((polygon) => (
            <Line
              key={polygon.id}
              points={polygon.points.flat()}
              closed
              stroke={hoveredPolygon === polygon.id ? "#2563eb" : "#16a34a"}
              strokeWidth={hoveredPolygon === polygon.id ? 4 : 3}
              fill={
                hoveredPolygon === polygon.id
                  ? "rgba(37, 99, 235, 0.2)"
                  : "rgba(22, 163, 74, 0.15)"
              }
              onMouseEnter={(e) => {e.target.getStage()?.container().style.setProperty("cursor", "pointer"); setHoveredPolygon(polygon.id)}}
              onMouseLeave={(e) => {e.target.getStage()?.container().style.setProperty("cursor", "default"); setHoveredPolygon(null)}}
            />
          ))}

          {polygons.map((polygon) =>
            polygon.points.map(
              (point: number[], index: number) => (
                <Circle
                  key={`${polygon.id}-${index}`}
                  x={point[0]}
                  y={point[1]}
                  radius={4}
                  fill="green"
                  onMouseEnter={(e) => {e.target.getStage()?.container().style.setProperty("cursor", "pointer"); setHoveredPolygon(polygon.id)}}
                  onMouseLeave={(e) => {e.target.getStage()?.container().style.setProperty("cursor", "default"); setHoveredPolygon(null)}}
                />
              )
            )
          )}

          {points.length >= 4 && (
            <Line
              points={points}
              closed
              stroke="red"
              strokeWidth={2}
            />
          )}

          {Array.from({ length: points.length / 2 }).map((_, i) => (
            <Circle
              key={i}
              x={points[i * 2]}
              y={points[i * 2 + 1]}
              radius={4}
              fill="blue"
            />
          ))}
        </Layer>
      </Stage>
      <button
        onClick={handleSave}
        disabled={points.length < 6}
        className={`mt-4 px-4 py-2 rounded text-white transition ${
          points.length >= 6
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Save Polygon
      </button>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">
          Saved Polygons
        </h3>

        {polygons.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No polygons saved.
          </p>
        ) : (
          polygons.map((polygon, index) => (
            <div
              key={polygon.id}
              className="flex items-center justify-between border rounded p-2 mb-2"
            >
              <span>
                Polygon {index + 1}
              </span>

              <button
                onClick={() => handleDelete(polygon.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}