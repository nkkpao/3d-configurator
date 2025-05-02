import { observer } from "mobx-react-lite";
import { modelSettingsStore } from "@/entities/model/model/modelSettingsStore";

export const ModelSettingsPanel = observer(() => {
  const { rotation, scale } = modelSettingsStore;

  return (
    <div style={{ marginBottom: 16, display: "flex", gap: 16 }}>
      <div>
        <label>Масштаб: </label>
        <input
          type="range"
          min="0.1"
          max="5"
          step="0.1"
          value={scale}
          onChange={(e) =>
            modelSettingsStore.setScale(parseFloat(e.target.value))
          }
        />
        <span>{scale.toFixed(1)}</span>
      </div>

      <div>
        <label>Вращение X: </label>
        <input
          type="range"
          min="0"
          max={(2 * Math.PI).toFixed(2)}
          step="0.1"
          value={rotation.x}
          onChange={(e) =>
            modelSettingsStore.setRotation("x", parseFloat(e.target.value))
          }
        />
      </div>
      <div>
        <label>Вращение Y: </label>
        <input
          type="range"
          min="0"
          max={(2 * Math.PI).toFixed(2)}
          step="0.1"
          value={rotation.y}
          onChange={(e) =>
            modelSettingsStore.setRotation("y", parseFloat(e.target.value))
          }
        />
      </div>
      <div>
        <label>Вращение Z: </label>
        <input
          type="range"
          min="0"
          max={(2 * Math.PI).toFixed(2)}
          step="0.1"
          value={rotation.z}
          onChange={(e) =>
            modelSettingsStore.setRotation("z", parseFloat(e.target.value))
          }
        />
      </div>
    </div>
  );
});
