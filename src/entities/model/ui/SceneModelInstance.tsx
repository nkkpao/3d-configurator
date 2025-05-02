import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import * as THREE from "three";
import { SceneModel, modelStore } from "@/entities/model/model/modelStore";
import { partColorStore } from "@/entities/model/model/partColorStore";
import type { ThreeEvent } from "@react-three/fiber";

type Props = {
  model: SceneModel;
  isSelected: boolean;
};

export const SceneModelInstance = observer(({ model, isSelected }: Props) => {
  const { gltf, settings } = model;

  const baseInstance = useMemo(() => {
    const clone = gltf.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const mat = Array.isArray(mesh.material)
          ? mesh.material[0]
          : mesh.material;
        const cloned = mat.clone();
        const color = partColorStore.getColor(model.id, mesh.name);
        if (color && "color" in cloned && cloned.color instanceof THREE.Color) {
          cloned.color.set(color);
        }
        mesh.material = cloned;
      }
    });
    return clone;
  }, [
    gltf,
    model.id,
    JSON.stringify(partColorStore.colors[model.id] || {}),
    model.settings.version,
  ]);

  const outlineInstance = useMemo(() => {
    if (!isSelected) return null;
    const clone = gltf.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshBasicMaterial({
          color: 0xffff00,
          side: THREE.BackSide,
          transparent: true,
          opacity: 0.5,
          depthWrite: false,
        });
        mesh.scale.multiplyScalar(1.05);
      }
    });
    return clone;
  }, [gltf, model.id, isSelected]);

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    modelStore.selectModel(model.id);
  };

  return (
    <group
      position={settings.position.toArray()}
      rotation={[settings.rotation.x, settings.rotation.y, settings.rotation.z]}
      scale={[settings.scale, settings.scale, settings.scale]}
      onPointerDown={handlePointerDown}
    >
      <primitive object={baseInstance} />
      {outlineInstance && <primitive object={outlineInstance} />}
    </group>
  );
});
