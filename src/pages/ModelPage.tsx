import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { modelStore } from "@/entities/model/model/modelStore";
import { ThreeViewer } from "@/widgets/ThreeViewer/ThreeViewer";
import { PartColorEditor } from "@/features/partColorEditor/ui/PartColorEditor";
import { ModelTransformPanel } from "@/features/modelTransformPanel/ui/ModelTransformPanel";
import { ExportButton } from "@/features/exportModel/ui/ExportButton";
import { ExportSceneConfigButton } from "@/features/configExport/ui/ExportSceneConfigButton";
import { ImportSceneConfigButton } from "@/features/configImport/ui/ImportSceneConfigButton";
import { ResetCurrentModelButton } from "@/features/partColorEditor/ui/ResetButton";
import { DropUploader } from "@/features/modelUploader/ui/DropUploader";
import { ModelListPanel } from "@/features/modelList/ui/ModelListPanel";

export const ModelPage = observer(() => {
  const hasSelected = !!modelStore.selectedModel;

  useEffect(() => {
    if (!hasSelected && modelStore.models.length > 0) {
      modelStore.selectModel(modelStore.models[0].id);
    }
  }, [modelStore.models.length]);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ flex: 1, position: "relative" }}>
          <DropUploader />
          <ThreeViewer />
        </div>
        <div style={{ padding: 16, display: "flex", gap: 8 }}>
          <ExportButton />
          <ExportSceneConfigButton />
          <ImportSceneConfigButton />
        </div>
      </div>
      <div
        style={{
          width: 320,
          borderLeft: "1px solid #ccc",
          padding: 16,
          overflowY: "auto",
        }}
      >
        <ModelListPanel />

        {modelStore.selectedModel ? (
          <div
            style={{
              width: 320,
              height: "100vh",
              overflowY: "auto",
              background: "#f9f9f9",
              borderLeft: "1px solid #ccc",
              padding: 16,
              boxSizing: "border-box",
              flexShrink: 0,
            }}
          >
            <ModelTransformPanel />
            <PartColorEditor />
            <ResetCurrentModelButton />
          </div>
        ) : (
          <div style={{ opacity: 0.5, textAlign: "center", marginTop: 32 }}>
            Выберите модель для редактирования
          </div>
        )}
      </div>
    </div>
  );
});
