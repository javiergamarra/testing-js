import { render, screen } from "@testing-library/react";
import App from "../App";

test("react renders", () => {
  const { container, debug } = render(<App />);
  debug();
  const buttonElement = screen.getByText("Enable");

  expect(buttonElement).toBeInTheDocument();
});
