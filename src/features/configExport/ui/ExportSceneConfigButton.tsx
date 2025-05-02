import { modelStore } from "@/entities/model/model/modelStore";
import { partColorStore } from "@/entities/model/model/partColorStore";
import JSZip from "jszip";
import { useState } from "react";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";

export const ExportSceneConfigButton = () => {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    const zip = new JSZip();

    const sceneData = await Promise.all(
      modelStore.models.map(async (model) => {
        const exporter = new GLTFExporter();

        const glbBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
          exporter.parse(
            model.gltf,
            (result) => {
              if (result instanceof ArrayBuffer) {
                resolve(result);
              } else {
                const str = JSON.stringify(result);
                resolve(new TextEncoder().encode(str));
              }
            },
            (err) => reject(err),
            { binary: true }
          );
        });

        const fileName = `${model.name || model.id}.glb`;
        zip.file(fileName, glbBuffer);

        return {
          modelId: model.id,
          name: model.name,
          fileName,
          colors: partColorStore.colors[model.id] || {},
          transform: {
            position: model.settings.position.toArray(),
            rotation: {
              x: model.settings.rotation.x,
              y: model.settings.rotation.y,
              z: model.settings.rotation.z,
            },
            scale: model.settings.scale,
          },
        };
      })
    );

    zip.file("scene.json", JSON.stringify({ scene: sceneData }, null, 2));

    const content = await zip.generateAsync({ type: "blob" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(content);
    a.download = "scene.zip";
    a.click();
    URL.revokeObjectURL(a.href);
    setLoading(false);
  };

  return (
    <button onClick={handleExport} disabled={loading} style={style}>
      {loading ? "Сохранение..." : "Сохранить сцену (ZIP)"}
    </button>
  );
};

const style = {
  padding: "8px 16px",
  marginRight: 8,
  border: "none",
  borderRadius: 6,
  backgroundColor: "#0abde3",
  color: "white",
  fontSize: 14,
  cursor: "pointer",
};
