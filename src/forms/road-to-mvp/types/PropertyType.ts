// Project files
import { apartment, holidayHome, terracedHouse, house } from "../helpers/constants";

/** Available kind of assets that can be purchased via a mortgage. */
export type PropertyType = typeof apartment | typeof holidayHome | typeof terracedHouse | typeof house | undefined;
