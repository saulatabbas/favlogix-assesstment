import { PolygonItem } from "@/components/icons/hexagonicons";
import { create } from "zustand";

type PolygonStage = "idle" | "loading" | "loaded" ;

interface PolygonStore {
  activePolygon: string | null;
  selectedPolygon: PolygonItem | null;

  stage: PolygonStage;

  setActivePolygon: (label: string) => void;
  setStage: (stage: PolygonStage) => void;
  setSelectedPolygon: (polygon: PolygonItem | null) => void;
  resetPolygon: () => void;
}

export const usePolygonStore = create<PolygonStore>((set) => ({
  activePolygon: null,
  stage: "idle",
  selectedPolygon: null,

  setActivePolygon: (label) =>
    set({
      activePolygon: label,
      stage: "loading",
    }),

  setStage: (stage) => set({ stage }),
  setSelectedPolygon: (polygon) =>
    set({
      selectedPolygon: polygon,
    }),
  resetPolygon: () =>
    set({
      activePolygon: null,
      stage: "idle",
    }),
}));