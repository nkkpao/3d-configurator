import { observer } from "mobx-react-lite";
import { partColorStore } from "@/entities/model/model/partColorStore";
import { modelStore } from "@/entities/model/model/modelStore";

export const PartColorEditor = observer(() => {
  const model = modelStore.selectedModel;
  if (!model) return null;

  const modelId = model.id;
  const parts = model.parts;

  const handleColorChange = (partName: string, color: string) => {
    partColorStore.setColor(partName, color);
  };

  return (
    <div>
      <h4>Цвета деталей модели</h4>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: 12,
        }}
      >
        {parts.map((part) => {
          const currentColor =
            partColorStore.getColor(modelId, part.name) ||
            part.originalColor ||
            "#ffffff";

          return (
            <div
              key={part.name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <label style={{ fontSize: 12 }}>{part.name}</label>
              <input
                type="color"
                value={currentColor}
                onChange={(e) => handleColorChange(part.name, e.target.value)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
});
