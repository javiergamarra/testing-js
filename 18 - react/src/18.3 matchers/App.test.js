import { render, screen } from "@testing-library/react";
import App from "../App";

test("react renders", () => {
  render(<App />);
  const buttonElement = screen.getByText("Enable");

  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveTextContent("Enable");
  expect(buttonElement).toHaveAttribute("class", "button");
});
