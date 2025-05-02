import { observer } from "mobx-react-lite";
import { modelStore } from "@/entities/model/model/modelStore";
import { useEffect, useState } from "react";

export const ModelTransformPanel = observer(() => {
  const selected = modelStore.selectedModel;
  if (!selected) return null;

  const settings = selected.settings;
  const { position, rotation, scale } = settings;

  const [posInput, setPosInput] = useState({ x: 0, y: 0, z: 0 });
  const [rotInput, setRotInput] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    if (!selected) return;

    setPosInput({
      x: position.x,
      y: position.y,
      z: position.z,
    });

    setRotInput({
      x: rotation.x,
      y: rotation.y,
      z: rotation.z,
    });
  }, [selected.id]);

  const updateScale = (value: number) => {
    settings.updateScale(value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h4>Трансформация модели: {selected.name}</h4>

      {/* Позиция */}
      <fieldset>
        <legend>Позиция</legend>
        {(["x", "y", "z"] as const).map((axis) => (
          <div
            key={axis}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <label style={{ width: 12 }}>{axis.toUpperCase()}:</label>
            <input
              type="number"
              step={0.1}
              value={posInput[axis]}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                const next = { ...posInput, [axis]: val } as typeof posInput;
                setPosInput(next);
                settings.updatePosition(next.x, next.y, next.z);
              }}
            />
          </div>
        ))}
      </fieldset>

      {/* Вращение */}
      <fieldset>
        <legend>Вращение</legend>
        {(["x", "y", "z"] as const).map((axis) => (
          <div
            key={axis}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <label style={{ width: 12 }}>{axis.toUpperCase()}:</label>
            <input
              type="number"
              step={0.1}
              value={rotInput[axis]}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                const next = { ...rotInput, [axis]: val } as typeof rotInput;
                setRotInput(next);
                settings.updateRotation(next.x, next.y, next.z);
              }}
            />
          </div>
        ))}
      </fieldset>

      {/* Масштаб */}
      <fieldset>
        <legend>Масштаб</legend>
        <input
          type="range"
          min={0.1}
          max={5}
          step={0.1}
          value={scale}
          onChange={(e) => updateScale(parseFloat(e.target.value))}
        />
        <span style={{ marginLeft: 8 }}>{scale.toFixed(2)}</span>
      </fieldset>
    </div>
  );
});
