
import { describe, expect, it } from "vitest";
import type { ScoreEvent } from "./score";
import {
  appendEvent,
  insertEvent,
  updateEvent,
  removeEvent,
} from "./editor";

const note: ScoreEvent = {
  id: "n1",
  type: "note",
  string: 1,
  position: 0,
  duration: 1,
};

const rest: ScoreEvent = {
  id: "r1",
  type: "rest",
  duration: 1,
};

describe("楽譜編集エンジン", () => {
  it("音符を追加できる", () => {
    expect(appendEvent([], note)).toEqual([note]);
  });

  it("休符を追加できる", () => {
    expect(appendEvent([], rest)).toEqual([rest]);
  });

  it("任意の位置に挿入できる", () => {
    const result = insertEvent([note], 0, rest);

    expect(result.map((e) => e.id)).toEqual([
      "r1",
      "n1",
    ]);
  });

  it("音符を変更できる", () => {
    const updated: ScoreEvent = {
      ...note,
      position: 2,
    };

    const result = updateEvent(
      [note],
      "n1",
      updated
    );

    expect(result[0]).toEqual(updated);
  });

  it("音符を休符へ変更できる", () => {
    const replacement: ScoreEvent = {
      id: "n1",
      type: "rest",
      duration: 2,
    };

    expect(
      updateEvent([note], "n1", replacement)
    ).toEqual([replacement]);
  });

  it("指定したイベントを削除できる", () => {
    expect(removeEvent([note, rest], "n1"))
      .toEqual([rest]);
  });

  it("元の配列を変更しない", () => {
    const original = [note];

    insertEvent(original, 1, rest);

    expect(original).toEqual([note]);
  });

  it("不正な挿入位置を拒否する", () => {
    expect(() =>
      insertEvent([], 2, note)
    ).toThrow(RangeError);
  });

  it("不正な音の長さを拒否する", () => {
    expect(() =>
      appendEvent([], { ...rest, duration: 0 })
    ).toThrow(RangeError);
  });

  it("同じIDの重複を拒否する", () => {
    expect(() =>
      appendEvent([note], note)
    ).toThrow("Duplicate event ID");
  });
});
