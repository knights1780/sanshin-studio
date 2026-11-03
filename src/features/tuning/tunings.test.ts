
import { describe, expect, it } from "vitest";
import {
  getOpenStringPitch,
  getOpenStringPitches,
  midiToFrequency,
} from "./tunings";

describe("三線の調弦モデル", () => {
  it("本調子はC3-F3-C4", () => {
    expect(getOpenStringPitches("honchoshi")).toEqual({
      1: 48,
      2: 53,
      3: 60,
    });
  });

  it("二揚げはC3-G3-C4", () => {
    expect(getOpenStringPitches("niage")).toEqual({
      1: 48,
      2: 55,
      3: 60,
    });
  });

  it("三下げはC3-F3-Bb3", () => {
    expect(getOpenStringPitches("sansage")).toEqual({
      1: 48,
      2: 53,
      3: 58,
    });
  });

  it("基準音を変更できる", () => {
    expect(
      getOpenStringPitches("honchoshi", 50)
    ).toEqual({
      1: 50,
      2: 55,
      3: 62,
    });
  });

  it("弦ごとの音高を取得できる", () => {
    expect(
      getOpenStringPitch("niage", 2)
    ).toBe(55);
  });

  it("A4は440Hz", () => {
    expect(midiToFrequency(69)).toBeCloseTo(440);
  });

  it("無効な基準音を拒否する", () => {
    expect(() =>
      getOpenStringPitches("honchoshi", -1)
    ).toThrow(RangeError);
  });
});
