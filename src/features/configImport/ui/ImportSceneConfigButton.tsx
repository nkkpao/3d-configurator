import { observer } from "mobx-react-lite";
import { useRef, useState } from "react";
import { modelStore } from "@/entities/model/model/modelStore";
import { partColorStore } from "@/entities/model/model/partColorStore";
import JSZip from "jszip";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const ImportSceneConfigButton = observer(() => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      modelStore.resetAll();
      partColorStore.resetAll();

      const zip = await JSZip.loadAsync(file);
      const jsonFile = zip.file("scene.json");
      if (!jsonFile) {
        alert("scene.json не найден в архиве");
        return;
      }

      const jsonText = await jsonFile.async("text");
      const config = JSON.parse(jsonText);

      for (const item of config.scene) {
        const glbBlob = await zip.file(item.fileName)?.async("blob");
        if (!glbBlob) continue;

        const url = URL.createObjectURL(glbBlob);
        const gltf = await loadGLTF(url);

        const model = await modelStore.addModelFromGLTF(gltf, item.name);
        URL.revokeObjectURL(url);

        if (item.colors) {
          partColorStore.importColors(model.id, item.colors);
        }

        const s = model.settings;
        if (item.transform?.position) {
          s.position.set(
            ...(item.transform.position as [number, number, number])
          );
        }
        if (item.transform?.rotation) {
          s.rotation.set(
            item.transform.rotation.x,
            item.transform.rotation.y,
            item.transform.rotation.z
          );
        }
        if (typeof item.transform?.scale === "number") {
          s.scale = item.transform.scale;
        }
      }
    } catch (err) {
      alert("Ошибка при импорте сцены");
      console.error(err);
    }

    e.target.value = "";
    setLoading(false);
  };

  const triggerInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <button onClick={triggerInput} disabled={loading} style={style}>
        {loading ? "Загрузка..." : "Загрузить сцену (ZIP)"}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".zip"
        onChange={handleImport}
        hidden
      />
    </>
  );
});

const style = {
  padding: "8px 16px",
  marginRight: 8,
  border: "none",
  borderRadius: 6,
  backgroundColor: "#1dd1a1",
  color: "white",
  fontSize: 14,
  cursor: "pointer",
};

function loadGLTF(url: string): Promise<THREE.Group> {
  const loader = new GLTFLoader();
  return new Promise((resolve, reject) => {
    loader.load(url, (gltf) => resolve(gltf.scene), undefined, reject);
  });
}
