
/**
 * @vitest-environment jsdom
 */

import { afterEach, describe, expect, it } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";

import App from "./App";

afterEach(() => {
  cleanup();
});

describe("Sanshin Studio 編集画面", () => {
  it("初期状態では楽譜が空になっている", () => {
    render(<App />);

    expect(
      screen.getByText("0 音")
    ).toBeTruthy();

    expect(
      screen.getByRole("button", { name: "1音戻す" })
        .hasAttribute("disabled")
    ).toBe(true);

    expect(
      screen.getByRole("button", { name: "すべて削除" })
        .hasAttribute("disabled")
    ).toBe(true);
  });

  it("工工四を入力するとTAB譜に反映される", () => {
    const { container } = render(<App />);

    fireEvent.click(
      screen.getByRole("button", { name: "合" })
    );

    fireEvent.click(
      screen.getByRole("button", { name: "上" })
    );

    expect(screen.getByText("2 音")).toBeTruthy();

    const notation = container.querySelectorAll(
      ".notation-note"
    );

    expect(
      Array.from(notation, (node) => node.textContent)
    ).toEqual(["合", "上"]);

    const tab = container.querySelectorAll(".tab-note");

    expect(
      Array.from(tab, (node) => node.textContent)
    ).toEqual(["0", "1"]);
  });

  it("最後の1音を取り消せる", () => {
    const { container } = render(<App />);

    fireEvent.click(
      screen.getByRole("button", { name: "合" })
    );

    fireEvent.click(
      screen.getByRole("button", { name: "四" })
    );

    fireEvent.click(
      screen.getByRole("button", { name: "1音戻す" })
    );

    expect(screen.getByText("1 音")).toBeTruthy();

    expect(
      container.querySelectorAll(".notation-note")
    ).toHaveLength(1);
  });

  it("楽譜を全削除できる", () => {
    const { container } = render(<App />);

    fireEvent.click(
      screen.getByRole("button", { name: "工" })
    );

    fireEvent.click(
      screen.getByRole("button", { name: "すべて削除" })
    );

    expect(screen.getByText("0 音")).toBeTruthy();

    expect(
      container.querySelectorAll(".notation-note")
    ).toHaveLength(0);

    expect(
      container.querySelectorAll(".tab-note")
    ).toHaveLength(0);
  });
});
