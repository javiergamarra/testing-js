import { render, screen } from "@testing-library/react";
import App from "../App";

test("debug returns the output of the component", () => {
  const { container, debug } = render(<App />);
  debug();
  const buttonElement = screen.getByText("Enable");

  expect(buttonElement).toBeInTheDocument();
});