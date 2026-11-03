
import type {
  SanshinString,
  TuningMode,
} from "./types";

export interface BaseEvent {
  id: string;
  duration: number;
}

export interface NoteEvent extends BaseEvent {
  type: "note";
  string: SanshinString;
  position: number;
  lyric?: string;
}

export interface RestEvent extends BaseEvent {
  type: "rest";
}

export type ScoreEvent = NoteEvent | RestEvent;

export interface TimeSignature {
  numerator: number;
  denominator: number;
}

export interface ScoreDocument {
  schemaVersion: 1;
  id: string;
  title: string;
  artist?: string;
  tuning: TuningMode;
  basePitch: number;
  tempo: number;
  timeSignature: TimeSignature;
  events: ScoreEvent[];
}
