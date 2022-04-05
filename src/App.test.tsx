import { describe, expect, it } from "vitest";
import { render, screen, userEvent } from "../testUtils";

import App from "./App";

describe("Simple working test", () => {
  it("the title is visible", () => {
    render(<App />);

    const welcomeText = screen.getByText(/Hello Vite \+ React!/i);

    screen.debug(welcomeText);

    expect(screen.getByText(/Hello Vite \+ React!/i)).toBeInTheDocument();
  });

  it("should increment count on click", async () => {
    render(<App />);

    userEvent.click(screen.getByRole("button"));

    const count = await screen.findByText(/count is: 1/i);
    expect(count.textContent).to.match(/1/);
  });
});
