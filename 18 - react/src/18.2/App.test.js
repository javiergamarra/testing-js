import { render, screen } from "@testing-library/react";
import App from "../App";

test("3-react renders", () => {
  render(<App />);
  const buttonElement = screen.getByText("Enable");
  expect(buttonElement).toBeInTheDocument();
});