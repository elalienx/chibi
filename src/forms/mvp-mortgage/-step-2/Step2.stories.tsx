// Project files
import preview from "../../../../.storybook/preview";
import { apartment, holidayHome, terracedHouse, house } from "../data/propertyTypes";
import Step2 from "./Step2";

// Metadata
const meta = preview.meta({
  title: "MVP Mortgage/Step 2: About the property",
  component: Step2,
});

// Stories
export const House = meta.story({
  name: "House",
  render: () => <Step2 propertyType={house} />,
});

export const Apartment = meta.story({
  name: "Apartment",
  render: () => <Step2 propertyType={apartment} />,
});

export const TerracedHouse = meta.story({
  name: "Terraced house",
  render: () => <Step2 propertyType={terracedHouse} />,
});

export const HolidayHome = meta.story({
  name: "Holiday home",
  render: () => <Step2 propertyType={holidayHome} />,
});

export default meta;
