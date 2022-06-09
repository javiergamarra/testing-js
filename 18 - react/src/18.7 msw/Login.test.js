import { rest } from "msw";
import { setupServer } from "msw/node";
import { LoginForm } from "../Login";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

describe("testing with msw", () => {
  beforeAll(() => {
    setupServer().use(rest.post("/login", (req, res, ctx) => {
      const { username } = req.body;

      return res(ctx.json({
        id: "f79e82e8-c34a-4dc7-a49e-9fadc0979fda", username, firstName: "John", lastName: "Maverick"
      }));
    }));
    setupServer().listen();
  });

  afterEach(() => {
    setupServer().resetHandlers();
  });

  afterAll(() => {
    setupServer().close();
  });

  it("should allow a user to log in", async () => {
    render(<LoginForm />);

    await userEvent.type(screen.getByLabelText(/username/i), "johnUser");

    userEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(await screen.findByText("f79e82e8-c34a-4dc7-a49e-9fadc0979fda")).toBeInTheDocument();
    expect(await screen.findByText("John")).toBeInTheDocument();
    expect(await screen.findByText("Maverick")).toBeInTheDocument();
  });
});

