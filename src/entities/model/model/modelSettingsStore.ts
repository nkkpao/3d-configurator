import { makeAutoObservable } from "mobx";
import { modelStore } from "./modelStore";

export class ModelSettingsStore {
  color = "#ffffff";
  rotation = { x: 0, y: 0, z: 0 };
  scale = 1;

  constructor() {
    makeAutoObservable(this);
  }

  setRotation(axis: "x" | "y" | "z", value: number) {
    this.rotation[axis] = value;
  }

  setScale(value: number) {
    this.scale = value;
  }

  setTransform(data: {
    rotation?: { x: number; y: number; z: number };
    scale?: number;
  }) {
    if (data.rotation) {
      this.rotation = { ...data.rotation };
    }
    if (typeof data.scale === "number") {
      this.scale = data.scale;
    }
  }
}

export const modelSettingsStore = new ModelSettingsStore();
