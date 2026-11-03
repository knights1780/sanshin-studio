
import { describe, expect, it } from "vitest";

import {
  symbolToTab,
  tabToSymbol,
  tabToSanshinNote,
  symbolsToTabs,
} from "./converter";

import {
  KUNKUNSHI_POSITIONS,
} from "../kunkunshi/symbols";

describe("工工四とTABの相互変換", () => {
  it("工工四からTABへ変換できる", () => {
    expect(symbolToTab("合", "n1")).toEqual({
      id: "n1",
      string: 1,
      position: 0,
      duration: 1,
    });

    expect(symbolToTab("上", "n2")).toMatchObject({
      string: 2,
      position: 1,
    });
  });

  it("TABから工工四へ変換できる", () => {
    expect(tabToSymbol(1, 0)).toBe("合");
    expect(tabToSymbol(2, 0)).toBe("四");
    expect(tabToSymbol(3, 0)).toBe("工");
  });

  it("全登録記号を往復変換できる", () => {
    for (const item of KUNKUNSHI_POSITIONS) {
      const tab = symbolToTab(item.symbol, "test");

      expect(
        tabToSymbol(tab.string, tab.position)
      ).toBe(item.symbol);
    }
  });

  it("共通ノート型へ変換できる", () => {
    const tab = symbolToTab("中", "n1", 0.5);
    const note = tabToSanshinNote(tab);

    expect(note.kunkunshiSymbol).toBe("中");
    expect(note.duration).toBe(0.5);
  });

  it("複数記号をまとめて変換できる", () => {
    const tabs = symbolsToTabs(["合", "四", "工"]);

    expect(tabs).toHaveLength(3);
    expect(tabs.map((item) => item.string)).toEqual([
      1, 2, 3,
    ]);
  });

  it("不明な記号を拒否する", () => {
    expect(() =>
      symbolToTab("不明", "n1")
    ).toThrow();
  });

  it("不正な勘所を拒否する", () => {
    expect(() =>
      tabToSymbol(1, 999)
    ).toThrow();
  });

  it("不正な音の長さを拒否する", () => {
    expect(() =>
      symbolToTab("合", "n1", 0)
    ).toThrow(RangeError);
  });
});
