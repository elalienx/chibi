import { apartment, holidayHome, terracedHouse, villa } from "../helpers/constants";

export type PropertyType = typeof apartment | typeof holidayHome | typeof terracedHouse | typeof villa | undefined;
