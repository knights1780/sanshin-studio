
import type {
  SanshinNote,
  SanshinString,
} from "../notation/types";

import {
  findPositionBySymbol,
  findSymbolByPosition,
} from "../kunkunshi/symbols";

// 現段階では勘所の順序を数字として表す
export interface SanshinTabNote {
  id: string;
  string: SanshinString;
  position: number;
  duration: number;
}

// 工工四記号からTABデータへ変換
export function symbolToTab(
  symbol: string,
  id: string,
  duration: number = 1
): SanshinTabNote {
  const found = findPositionBySymbol(symbol);

  if (!found) {
    throw new Error(`Unknown kunkunshi symbol: ${symbol}`);
  }

  if (!Number.isFinite(duration) || duration <= 0) {
    throw new RangeError("Invalid note duration");
  }

  return {
    id,
    string: found.string,
    position: found.position,
    duration,
  };
}

// TABデータから工工四記号へ変換
export function tabToSymbol(
  string: SanshinString,
  position: number
): string {
  const symbol = findSymbolByPosition(string, position);

  if (!symbol) {
    throw new Error(
      `Unknown tablature position: ${string}/${position}`
    );
  }

  return symbol;
}

// 共通データモデルへ変換
export function tabToSanshinNote(
  tab: SanshinTabNote
): SanshinNote {
  const symbol = tabToSymbol(tab.string, tab.position);

  if (!Number.isFinite(tab.duration) || tab.duration <= 0) {
    throw new RangeError("Invalid note duration");
  }

  return {
    id: tab.id,
    string: tab.string,
    position: tab.position,
    duration: tab.duration,
    kunkunshiSymbol: symbol,
  };
}

// 工工四記号の配列をTABデータへ一括変換
export function symbolsToTabs(
  symbols: string[]
): SanshinTabNote[] {
  return symbols.map((symbol, index) =>
    symbolToTab(symbol, `note-${index + 1}`)
  );
}
