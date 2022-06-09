import { render, screen } from "@testing-library/react";
import App from "../App";

test("button element is presen in the screen", () => {
  render(<App />);
  const buttonElement = screen.getByText("Enable");

  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveTextContent("Enable");
  expect(buttonElement).toHaveAttribute("class", "button");
});
