import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

test("fireEvent and userEvent simulate interactions", async () => {
  const { container, debug } = render(<App />);

  const buttonElement = screen.getByText("Enable");

  fireEvent.click(buttonElement);

  expect(screen.getByText("enabled")).toBeInTheDocument();

  var input = container.querySelector("#name");

  await userEvent.type(input, "Hola!");

  expect(screen.getByDisplayValue(/Hola/)).toBeInTheDocument();
});
