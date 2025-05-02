import { observer } from "mobx-react-lite";
import { modelStore } from "@/entities/model/model/modelStore";
import { exportModel } from "@/shared/lib/exportModel";

export const ExportButton = observer(() => {
  const model = modelStore.selectedModel;

  const handleExport = () => {
    if (!model) {
      alert("Сначала выберите модель");
      return;
    }

    exportModel(model.gltf, `${model.name || "model"}.glb`, model.id);
  };

  return (
    <button
      onClick={handleExport}
      style={{ ...baseStyle, backgroundColor: "#a55eea" }}
    >
      Скачать выбранную модель
    </button>
  );
});

const baseStyle = {
  padding: "8px 16px",
  color: "white",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  marginTop: 8,
  marginRight: 8,
  fontSize: "14px",
};
