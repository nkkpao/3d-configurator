import { makeAutoObservable, runInAction } from "mobx";

class PartColorStore {
  colors: Record<string, Record<string, string>> = {};
  currentModelId: string | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setModel(id: string) {
    this.currentModelId = id;
    if (!this.colors[id]) {
      this.colors[id] = {};
    }
  }

  setColor(partName: string, color: string) {
    if (!this.currentModelId) return;
    const modelId = this.currentModelId;

    runInAction(() => {
      if (!this.colors[modelId]) {
        this.colors[modelId] = {};
      }
      this.colors[modelId][partName] = color;
    });
  }

  getColor(modelId: string, partName: string): string | undefined {
    return this.colors[modelId]?.[partName];
  }

  importColors(modelId: string, colorMap: Record<string, string>) {
    runInAction(() => {
      this.colors[modelId] = { ...colorMap };
    });
  }

  reset(modelId: string) {
    runInAction(() => {
      this.colors[modelId] = {};
    });
  }

  resetAll() {
    this.colors = {};
    this.currentModelId = null;
  }
}

export const partColorStore = new PartColorStore();
