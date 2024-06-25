import { HomePrimaryMenu } from ".";

export default {
  title: "Components/HomePrimaryMenu",
  component: HomePrimaryMenu,
  argTypes: {
    property1: {
      options: ["variant-2", "variant-3", "default"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    property1: "variant-2",
    className: {},
  },
};
