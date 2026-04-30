// Project files
import { agreement, ownership } from "../data/tenancyAgreements";

/** Available kind of ownership types for terraced house properties. */
export type TenancyAgreement = typeof agreement | typeof ownership | undefined;
