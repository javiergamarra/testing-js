import React from "react";

import App from "../App";

export default {
  title: "Example/App",
  component: App
};

const Template = (args) => <App {...args} />;

export const Default = Template.bind({});
Default.args = {};