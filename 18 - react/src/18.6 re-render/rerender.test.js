import { render, screen } from "@testing-library/react";
import App from "../App";

test("rerender reloads props values", () => {
  const { rerender } = render(<App />);

  expect(screen.queryByText("hola")).toBeNull();

  rerender(<App value="hola" />);

  expect(screen.getByText("hola")).not.toBeNull();
});
