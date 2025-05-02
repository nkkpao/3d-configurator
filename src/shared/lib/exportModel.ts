import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import { partColorStore } from "@/entities/model/model/partColorStore";

export function exportModel(
  original: THREE.Group,
  filename: string,
  modelId?: string
) {
  const cloned = original.clone(true);

  if (modelId) {
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const mat = Array.isArray(mesh.material)
          ? mesh.material[0]
          : mesh.material;
        const clonedMat = mat.clone();

        const color = partColorStore.getColor(modelId, mesh.name);
        if (
          color &&
          "color" in clonedMat &&
          clonedMat.color instanceof THREE.Color
        ) {
          clonedMat.color.set(color);
        }

        mesh.material = clonedMat;
      }
    });
  }

  const exporter = new GLTFExporter();
  exporter.parse(
    cloned,
    (gltf) => {
      const blob =
        gltf instanceof ArrayBuffer
          ? new Blob([gltf], { type: "model/gltf-binary" })
          : new Blob([JSON.stringify(gltf)], { type: "application/json" });

      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      a.click();
      URL.revokeObjectURL(a.href);
    },
    (error) => {
      console.error("Ошибка при экспорте модели", error);
      alert("Ошибка при экспорте модели");
    },
    { binary: true }
  );
}
