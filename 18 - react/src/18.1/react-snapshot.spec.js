import App from "../App";
import renderer from "react-test-renderer";

describe("testing with snapshots", () => {
  test("appears when clicking the button", async () => {
    const component = renderer.create(<App />);

    expect(component.toJSON()).toMatchSnapshot();

    const button = await component.root.findByType("button");
    button.props.onClick();

    expect(component.toJSON()).toMatchSnapshot();
  });
});