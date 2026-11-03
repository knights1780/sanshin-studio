
import { useState } from "react";
import type { SanshinTabNote } from "./features/tablature/converter";
import { symbolToTab } from "./features/tablature/converter";
import {
  KUNKUNSHI_POSITIONS,
  findSymbolByPosition,
} from "./features/kunkunshi/symbols";
import "./App.css";

const STRINGS = [
  { number: 3, name: "女弦", y: 40 },
  { number: 2, name: "中弦", y: 85 },
  { number: 1, name: "男弦", y: 130 },
] as const;

const COLUMN_WIDTH = 54;
const LEFT_MARGIN = 78;

function App() {
  const [notes, setNotes] = useState<SanshinTabNote[]>([]);

  function addNote(symbol: string) {
    const id = crypto.randomUUID();
    const note = symbolToTab(symbol, id);
    setNotes((previous) => [...previous, note]);
  }

  function undo() {
    setNotes((previous) => previous.slice(0, -1));
  }

  function clear() {
    setNotes([]);
  }

  const svgWidth = Math.max(
    650,
    LEFT_MARGIN + notes.length * COLUMN_WIDTH + 40
  );

  return (
    <main className="app">
      <header className="app-header">
        <div>
          <h1>Sanshin Studio</h1>
          <p>工工四・三線TAB譜エディター</p>
        </div>
        <span className="version">Prototype 0.1</span>
      </header>

      <section className="panel">
        <div className="section-header">
          <h2>工工四入力</h2>
          <span>{notes.length} 音</span>
        </div>

        <div className="symbol-grid">
          {KUNKUNSHI_POSITIONS.map((item) => (
            <button
              key={`${item.string}-${item.position}`}
              className="symbol-button"
              onClick={() => addNote(item.symbol)}
              title={`${item.string}弦 / 勘所 ${item.position}`}
            >
              {item.symbol}
            </button>
          ))}
        </div>

        <div className="toolbar">
          <button onClick={undo} disabled={notes.length === 0}>
            1音戻す
          </button>
          <button onClick={clear} disabled={notes.length === 0}>
            すべて削除
          </button>
        </div>
      </section>

      <section className="panel">
        <h2>工工四</h2>

        <div className="notation-sheet">
          {notes.length === 0 ? (
            <p className="placeholder">
              上の記号を選択すると楽譜が表示されます。
            </p>
          ) : (
            <div className="notation-notes">
              {notes.map((note) => (
                <div className="notation-note" key={note.id}>
                  {findSymbolByPosition(
                    note.string,
                    note.position
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="panel">
        <h2>三線TAB譜</h2>
        <p className="description">
          現在は勘所の順序を数字で表示しています。
        </p>

        <div className="tab-scroll">
          <svg
            width={svgWidth}
            height={175}
            viewBox={`0 0 ${svgWidth} 175`}
            role="img"
            aria-label="三線TAB譜"
          >
            {STRINGS.map((string) => (
              <g key={string.number}>
                <text
                  x={12}
                  y={string.y + 5}
                  className="string-label"
                >
                  {string.name}
                </text>
                <line
                  x1={LEFT_MARGIN}
                  y1={string.y}
                  x2={svgWidth - 20}
                  y2={string.y}
                  className="string-line"
                />
              </g>
            ))}

            {notes.map((note, index) => {
              const target = STRINGS.find(
                (item) => item.number === note.string
              );

              if (!target) return null;

              const x =
                LEFT_MARGIN +
                30 +
                index * COLUMN_WIDTH;

              return (
                <g key={note.id}>
                  <rect
                    x={x - 14}
                    y={target.y - 15}
                    width={28}
                    height={30}
                    rx={5}
                    className="tab-note-background"
                  />
                  <text
                    x={x}
                    y={target.y + 6}
                    textAnchor="middle"
                    className="tab-note"
                  >
                    {note.position}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </section>

      <footer>
        Sanshin Studio — Kunkunshi & TAB Editor
      </footer>
    </main>
  );
}

export default App;
