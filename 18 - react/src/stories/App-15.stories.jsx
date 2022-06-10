import React from "react";

import App from "../App";

export default {
  title: "Example/AppControls",
  component: App,
  argTypes: { fontSize: { control: { type: "number", min: 1, max: 30, step: 2 } } }
};

const Template = (args) => <App {...args} />;

export const Default = Template.bind({});
Default.args = {};