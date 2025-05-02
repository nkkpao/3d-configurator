import * as THREE from "three";

export function extractModelParts(gltf: THREE.Group): {
  name: string;
  mesh: THREE.Mesh;
  originalColor: string;
}[] {
  const parts: {
    name: string;
    mesh: THREE.Mesh;
    originalColor: string;
  }[] = [];

  gltf.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      const name = mesh.name || `part-${parts.length}`;

      const material = Array.isArray(mesh.material)
        ? mesh.material[0]
        : mesh.material;

      const color =
        material && "color" in material && material.color instanceof THREE.Color
          ? `#${material.color.getHexString()}`
          : "#ffffff";

      parts.push({ name, mesh, originalColor: color });
    }
  });

  return parts;
}
