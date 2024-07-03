import { PrimaryNavigation } from ".";

export default {
  title: "Components/PrimaryNavigation",
  component: PrimaryNavigation,
  argTypes: {
    property1: {
      options: ["accelerate-sales-tools", "home", "play-book", "no-select"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    property1: "accelerate-sales-tools",
    className: {},
  },
};
