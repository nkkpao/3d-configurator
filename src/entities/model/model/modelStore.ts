import { makeAutoObservable, runInAction } from "mobx";
import * as THREE from "three";
import { nanoid } from "nanoid";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { extractModelParts } from "@/shared/lib/extractModelParts";
import { partColorStore } from "./partColorStore";

export class ModelSettings {
  position = new THREE.Vector3();
  rotation = new THREE.Euler();
  scale = 1;

  version = 0;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  updatePosition(x: number, y: number, z: number) {
    this.position.set(x, y, z);
    this.bumpVersion();
  }

  updateScale(value: number) {
    this.scale = value;
    this.bumpVersion();
  }

  updateRotation(x: number, y: number, z: number) {
    this.rotation.set(x, y, z);
    this.bumpVersion();
  }

  private bumpVersion() {
    this.version++;
  }

  clone(): ModelSettings {
    const copy = new ModelSettings();
    copy.position.copy(this.position);
    copy.rotation.copy(this.rotation);
    copy.scale = this.scale;
    copy.version = this.version;
    return copy;
  }
}

export type SceneModel = {
  id: string;
  name: string;
  gltf: THREE.Group;
  settings: ModelSettings;
  parts: {
    name: string;
    mesh: THREE.Mesh;
    originalColor: string;
  }[];
};

class ModelStore {
  models: SceneModel[] = [];
  selectedModel: SceneModel | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  getModelById(id: string) {
    return this.models.find((m) => m.id === id) || null;
  }

  clearSelection() {
    runInAction(() => {
      this.selectedModel = null;
    });
  }

  selectModel(id: string) {
    const model = this.getModelById(id);
    if (!model) return;
    runInAction(() => {
      this.selectedModel = model;
    });
    partColorStore.setModel(model.id);
  }

  async addModelFromUrl(url: string, name = "Модель") {
    const gltf = await this.loadGltf(url);
    const parts = extractModelParts(gltf);

    const model: SceneModel = {
      id: nanoid(),
      name,
      gltf,
      settings: new ModelSettings(),
      parts,
    };

    runInAction(() => {
      this.models.push(model);
      this.selectedModel = model;
    });

    partColorStore.setModel(model.id);
  }

  removeModel(id: string) {
    runInAction(() => {
      this.models = this.models.filter((m) => m.id !== id);
      if (this.selectedModel?.id === id) {
        this.selectedModel = this.models[0] || null;
      }
    });
  }

  async addModelFromGLTF(
    gltf: THREE.Group,
    name = "Модель"
  ): Promise<SceneModel> {
    const parts = extractModelParts(gltf);

    const model: SceneModel = {
      id: nanoid(),
      name,
      gltf,
      settings: new ModelSettings(),
      parts,
    };

    runInAction(() => {
      this.models.push(model);
      this.selectedModel = model;
    });

    partColorStore.setModel(model.id);
    return model;
  }

  resetAll() {
    runInAction(() => {
      this.models = [];
      this.selectedModel = null;
    });
  }

  private async loadGltf(url: string): Promise<THREE.Group> {
    const loader = new GLTFLoader();
    return new Promise((resolve, reject) => {
      loader.load(url, (gltf) => resolve(gltf.scene), undefined, reject);
    });
  }
}

export const modelStore = new ModelStore();
