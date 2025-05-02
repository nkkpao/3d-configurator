import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { observer } from "mobx-react-lite";
import { modelStore } from "@/entities/model/model/modelStore";
import { SceneModelInstance } from "../../entities/model/ui/SceneModelInstance";
import {
  EffectComposer,
  Outline,
  Selection,
} from "@react-three/postprocessing";

export const ThreeViewer = observer(() => {
  return (
    <Canvas
      camera={{ position: [0, 2, 5], fov: 60 }}
      onPointerMissed={() => modelStore.clearSelection()}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 5]} intensity={1} />
      <OrbitControls />
      <gridHelper args={[10, 10]} />

      <Selection>
        {modelStore.models.map((model) => (
          <SceneModelInstance
            key={model.id}
            model={model}
            isSelected={model.id === modelStore.selectedModel?.id}
          />
        ))}

        <EffectComposer autoClear={false} multisampling={8}>
          <Outline
            visibleEdgeColor={0xffffff}
            hiddenEdgeColor={0x444444}
            blur
            edgeStrength={100}
            width={500}
          />
        </EffectComposer>
      </Selection>
    </Canvas>
  );
});
