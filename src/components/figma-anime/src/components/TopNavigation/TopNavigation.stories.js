import { TopNavigation } from ".";

export default {
  title: "Components/TopNavigation",
  component: TopNavigation,
  argTypes: {
    property1: {
      options: ["variant-5", "nav-1", "variant-4", "nav-2", "nav-3"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    property1: "variant-5",
    className: {},
    secondaryNavProperty1: "default",
    groupClassName: {},
  },
};
