// Project files
import { apartment, holidayHome, terracedHouse, house } from "../helpers/constants";

export type PropertyType = typeof apartment | typeof holidayHome | typeof terracedHouse | typeof house | undefined;
