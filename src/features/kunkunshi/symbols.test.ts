
import { describe, expect, it } from "vitest";
import {
  findPositionBySymbol,
  findSymbolByPosition,
  KUNKUNSHI_POSITIONS,
} from "./symbols";

describe("工工四マスター", () => {
  it("開放弦を正しく取得できる", () => {
    expect(findPositionBySymbol("合")).toMatchObject({
      string: 1,
      position: 0,
    });

    expect(findPositionBySymbol("四")).toMatchObject({
      string: 2,
      position: 0,
    });

    expect(findPositionBySymbol("工")).toMatchObject({
      string: 3,
      position: 0,
    });
  });

  it("弦と勘所から記号を取得できる", () => {
    expect(findSymbolByPosition(1, 1)).toBe("乙");
    expect(findSymbolByPosition(2, 2)).toBe("中");
    expect(findSymbolByPosition(3, 1)).toBe("五");
  });

  it("全記号を逆変換できる", () => {
    for (const item of KUNKUNSHI_POSITIONS) {
      expect(
        findSymbolByPosition(item.string, item.position)
      ).toBe(item.symbol);
    }
  });

  it("存在しない記号はundefinedを返す", () => {
    expect(findPositionBySymbol("不明")).toBeUndefined();
  });
});
