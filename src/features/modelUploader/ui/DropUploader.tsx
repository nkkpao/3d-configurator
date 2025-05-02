import { observer } from "mobx-react-lite";
import { modelStore } from "@/entities/model/model/modelStore";
import { useEffect, useState } from "react";

export const DropUploader = observer(() => {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      setShowOverlay(true);
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      setShowOverlay(false);
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      setShowOverlay(false);

      const file = e.dataTransfer?.files?.[0];
      if (!file || !file.name.match(/\.(glb|gltf)$/i)) return;

      const objectUrl = URL.createObjectURL(file);
      const name = file.name.replace(/\.[^/.]+$/, "");
      modelStore.addModelFromUrl(objectUrl, name);
    };

    const preventDefaults = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("dragover", preventDefaults);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("dragover", preventDefaults);
      window.removeEventListener("drop", handleDrop);
    };
  }, []);

  return showOverlay ? (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        color: "white",
        fontSize: 20,
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        pointerEvents: "none",
      }}
    >
      📦 Отпустите файл .glb или .gltf для загрузки
    </div>
  ) : null;
});
