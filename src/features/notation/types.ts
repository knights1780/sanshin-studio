export type SanshinString = 1 | 2 | 3;

export type TuningMode =
  | "honchoshi"
  | "niage"
  | "sansage";

export interface SanshinNote {
  id: string;
  string: SanshinString;
  position: number;
  duration: number;
  kunkunshiSymbol?: string;
}

export interface SanshinScore {
  id: string;
  title: string;
  artist?: string;
  tuning: TuningMode;
  basePitch: number;
  tempo: number;
  notes: SanshinNote[];
}