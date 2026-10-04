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
  v.toMinValue(MIN_AMOUNT),
  v.toMaxValue(MAX_AMOUNT),
);

const loan_period = v.pipe(
  v.string("Vänligen ange lånetid."),
  v.nonEmpty("Vänligen ange lånetid."),
  v.toNumber("Vänligen ange en giltig lånetid."),
  v.integer("Vänligen ange lånetiden i hela år."),
  v.toMinValue(MIN_PERIOD),
  v.toMaxValue(MAX_PERIOD),
);

const email = v.pipe(
  v.string("Vänligen ange din e-postadress."),
  v.trim(),
  v.nonEmpty("Vänligen ange din e-postadress."),
  v.email("Vänligen ange en giltig e-postadress."),
);

const phone = v.pipe(
  v.string("Vänligen ange ditt mobilnummer."),
  v.trim(),
  v.nonEmpty("Vänligen ange ditt mobilnummer."),
  v.check((input) => /^\+?\d{7,15}$/.test(input.replace(/[\s()-]/g, "")), "Vänligen ange ett giltigt mobilnummer."),
);

// Schema
const schema = v.object({ loan_amount, loan_period, email, phone });

export default schema;
