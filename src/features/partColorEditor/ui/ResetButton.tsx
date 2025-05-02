import { observer } from "mobx-react-lite";
import { modelStore } from "@/entities/model/model/modelStore";
import { partColorStore } from "@/entities/model/model/partColorStore";
import { runInAction } from "mobx";

export const ResetCurrentModelButton = observer(() => {
  const model = modelStore.selectedModel;
  if (!model) return null;

  const handleReset = () => {
    runInAction(() => {
      partColorStore.reset(model.id);
    });
  };

  return (
    <button onClick={handleReset} style={style}>
      Сбросить цвета модели
    </button>
  );
});

const style: React.CSSProperties = {
  marginTop: 12,
  padding: "8px 12px",
  background: "#ff7675",
  color: "white",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
};
