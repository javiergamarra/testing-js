import { LoginForm } from "../Login";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import "jest-axe/extend-expect";

describe("checking a11y", () => {
  it("axe", async () => {
    const { container } = render(<LoginForm />);

    const results = await axe(container);

    // expect(results.violations).not.toBeNull();
    expect(results).toHaveNoViolations();
  });
});

