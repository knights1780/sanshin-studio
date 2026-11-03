
import type {
  SanshinString,
  TuningMode,
} from "../notation/types";

// C3 = MIDI 48
// MIDIノート番号で音高を管理する
export const DEFAULT_BASE_PITCH = 48;

export type StringPitches = Record<SanshinString, number>;

// 男弦を基準とした半音差
export const TUNING_INTERVALS: Record<
  TuningMode,
  StringPitches
> = {
  honchoshi: {
    1: 0,
    2: 5,
    3: 12,
  },
  niage: {
    1: 0,
    2: 7,
    3: 12,
  },
  sansage: {
    1: 0,
    2: 5,
    3: 10,
  },
};

export function getOpenStringPitches(
  tuning: TuningMode,
  basePitch: number = DEFAULT_BASE_PITCH
): StringPitches {
  if (
    !Number.isInteger(basePitch) ||
    basePitch < 0 ||
    basePitch > 115
  ) {
    throw new RangeError("Invalid base MIDI pitch");
  }

  const intervals = TUNING_INTERVALS[tuning];

  return {
    1: basePitch + intervals[1],
    2: basePitch + intervals[2],
    3: basePitch + intervals[3],
  };
}

export function getOpenStringPitch(
  tuning: TuningMode,
  string: SanshinString,
  basePitch: number = DEFAULT_BASE_PITCH
): number {
  return getOpenStringPitches(tuning, basePitch)[string];
}

// MIDI番号を周波数に変換
// A4 = 440Hz
export function midiToFrequency(
  midiNote: number
): number {
  return 440 * Math.pow(2, (midiNote - 69) / 12);
}
