
import type { SanshinString } from "../notation/types";

export interface KunkunshiPosition {
  symbol: string;
  string: SanshinString;
  position: number;
  label: string;
}

export const KUNKUNSHI_POSITIONS: KunkunshiPosition[] = [
  // 男弦
  { symbol: "合", string: 1, position: 0, label: "開放弦" },
  { symbol: "乙", string: 1, position: 1, label: "乙" },
  { symbol: "老", string: 1, position: 2, label: "老" },
  { symbol: "下老", string: 1, position: 3, label: "下老" },

  // 中弦
  { symbol: "四", string: 2, position: 0, label: "開放弦" },
  { symbol: "上", string: 2, position: 1, label: "上" },
  { symbol: "中", string: 2, position: 2, label: "中" },
  { symbol: "尺", string: 2, position: 3, label: "尺" },

  // 女弦
  { symbol: "工", string: 3, position: 0, label: "開放弦" },
  { symbol: "五", string: 3, position: 1, label: "五" },
  { symbol: "六", string: 3, position: 2, label: "六" },
  { symbol: "七", string: 3, position: 3, label: "七" },
  { symbol: "八", string: 3, position: 4, label: "八" },
  { symbol: "九", string: 3, position: 5, label: "九" },
];

export function findPositionBySymbol(
  symbol: string
): KunkunshiPosition | undefined {
  return KUNKUNSHI_POSITIONS.find(
    (item) => item.symbol === symbol
  );
}

export function findSymbolByPosition(
  string: SanshinString,
  position: number
): string | undefined {
  return KUNKUNSHI_POSITIONS.find(
    (item) =>
      item.string === string &&
      item.position === position
  )?.symbol;
}
