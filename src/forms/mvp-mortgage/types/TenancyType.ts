// Project files
import { agreement, ownership } from "../data/tenancyTypes";

/** Available kind of ownership types for terraced house properties. */
export type TenancyType = typeof agreement | typeof ownership | undefined;
