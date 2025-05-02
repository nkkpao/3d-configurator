import { observer } from "mobx-react-lite";
import { modelStore } from "@/entities/model/model/modelStore";
import { partColorStore } from "@/entities/model/model/partColorStore";
import { useRef } from "react";

export const ModelListPanel = observer(() => {
  const models = modelStore.models;
  const selectedId = modelStore.selectedModel?.id;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddClick = () => {
    inputRef.current?.click();
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.name.match(/\.(glb|gltf)$/i)) return;

    const objectUrl = URL.createObjectURL(file);
    const name = file.name.replace(/\.[^/.]+$/, "");

    modelStore.addModelFromUrl(objectUrl, name);
  };

  const handleDelete = () => {
    if (selectedId) {
      modelStore.removeModel(selectedId);
    }
  };

  const handleClone = () => {
    if (!modelStore.selectedModel) return;

    const orig = modelStore.selectedModel;
    const gltf = orig.gltf.clone(true);
    const parts = orig.parts.map((p) => ({
      name: p.name,
      mesh: p.mesh.clone(),
      originalColor: p.originalColor,
    }));

    const cloned = {
      id: crypto.randomUUID(),
      name: `${orig.name} (копия)`,
      gltf,
      parts,
      settings: orig.settings.clone(),
    };

    modelStore.models.push(cloned);
    modelStore.selectModel(cloned.id);

    const colors = partColorStore.colors[orig.id];
    if (colors) {
      partColorStore.importColors(cloned.id, { ...colors });
    }
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={handleAddClick}>➕ Добавить</button>
        <button onClick={handleClone} disabled={!selectedId}>
          🔁 Клонировать
        </button>
        <button onClick={handleDelete} disabled={!selectedId}>
          🗑️ Удалить
        </button>

        <input
          ref={inputRef}
          type="file"
          accept=".glb,.gltf"
          style={{ display: "none" }}
          onChange={handleFileSelected}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {models.map((model) => (
          <button
            key={model.id}
            onClick={() => modelStore.selectModel(model.id)}
            style={{
              textAlign: "left",
              padding: "6px 8px",
              background: model.id === selectedId ? "#e0f0ff" : "#f8f8f8",
              border: "1px solid #ccc",
              borderRadius: 4,
              fontWeight: model.id === selectedId ? "bold" : "normal",
              cursor: "pointer",
            }}
          >
            {model.name}
          </button>
        ))}
      </div>
    </div>
  );
});
