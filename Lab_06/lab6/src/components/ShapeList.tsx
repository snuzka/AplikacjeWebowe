import React, { useEffect, useState } from "react";
import Square from "./Square";
import Rectangle from "./Rectangle";
import Circle from "./Circle";

export type ShapeType = "square" | "rectangle" | "circle";

export interface ShapeItem {
  id: number;
  type: ShapeType;
}

const STORAGE_KEY = "shapes";

const defaultShapes: ShapeItem[] = [
  { id: 1, type: "square" },
  { id: 2, type: "rectangle" },
  { id: 3, type: "circle" },
];

const ShapeList: React.FC = () => {
  const [shapes, setShapes] = useState<ShapeItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setShapes(JSON.parse(saved));
    } else {
      setShapes(defaultShapes);
    }
  }, []);

  useEffect(() => {
    if (shapes.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(shapes));
    }
  }, [shapes]);

  const addShape = (type: ShapeType) => {
    const nextId = shapes.length ? Math.max(...shapes.map((s) => s.id)) + 1 : 1;

    setShapes([...shapes, { id: nextId, type }]);
  };

  const removeShape = (id: number) => {
    setShapes((prev) => prev.filter((shape) => shape.id !== id));
  };

  const showAll = () => {};

  return (
    <div>
      <h2>Lista kształtów</h2>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <button onClick={() => addShape("square")}>Dodaj kwadrat</button>
        <button onClick={() => addShape("rectangle")}>Dodaj prostokąt</button>
        <button onClick={() => addShape("circle")}>Dodaj koło</button>
        <select>
          <option value="all" onSelect={() => showAll()}>
            Wszystkie
          </option>
          <option value="squares">Kwadraty</option>
          <option value="rectangles">Prostokąty</option>
          <option value="circles">Koła</option>
        </select>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {shapes.map((shape) => {
          switch (shape.type) {
            case "square":
              return (
                <div style={{ gap: 10, margin: 20 }}>
                  <Square key={shape.id} id={shape.id} />

                  <button onClick={() => removeShape(shape.id)}>Usuń</button>
                </div>
              );
            case "rectangle":
              return (
                <div style={{ gap: 10, margin: 20 }}>
                  <Rectangle key={shape.id} id={shape.id} />

                  <button onClick={() => removeShape(shape.id)}>Usuń</button>
                </div>
              );
            case "circle":
              return (
                <div style={{ gap: 10, margin: 20 }}>
                  <Circle key={shape.id} id={shape.id} />

                  <button onClick={() => removeShape(shape.id)}>Usuń</button>
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default ShapeList;
