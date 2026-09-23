// Node modules
import * as v from "valibot";

// Project files
import BusinessFormConfig from "../data/BusinessFormConfig";

// Properties
const { MIN_AMOUNT, MAX_AMOUNT, MIN_PERIOD, MAX_PERIOD } = BusinessFormConfig;

// Fields
const loan_amount = v.pipe(
  v.string("Vänligen ange lånesumma."),
  v.nonEmpty("Vänligen ange lånesumma."),
  v.toNumber("Vänligen ange en giltig lånesumma."),
  v.integer("Vänligen ange lånesumman i hela kronor."),
  v.minValue(MIN_AMOUNT, `Måste vara minst ${MIN_AMOUNT.toLocaleString("sv-SE")} kr.`),
  v.maxValue(MAX_AMOUNT, `Måste vara maximalt ${MAX_AMOUNT.toLocaleString("sv-SE")} kr.`),
);

const loan_period = v.pipe(
  v.string("Vänligen ange lånetid."),
  v.nonEmpty("Vänligen ange lånetid."),
  v.toNumber("Vänligen ange en giltig lånetid."),
  v.integer("Vänligen ange lånetiden i hela år."),
  v.minValue(Math.ceil(MIN_PERIOD), `Måste vara minst ${Math.ceil(MIN_PERIOD)} år.`),
  v.maxValue(MAX_PERIOD, `Måste vara maximalt ${MAX_PERIOD.toLocaleString("sv-SE")} år.`),
);

// Schema
const schema = v.object({ loan_amount, loan_period });

export default schema;
