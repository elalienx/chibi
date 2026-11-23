// Node modules
import * as v from "valibot";

// Fields
const loan_amount = v.pipe(
  v.string("Vänligen ange lånesumma."),
  v.nonEmpty("Vänligen ange lånesumma."),
  v.toNumber("Vänligen ange en giltig lånesumma."),
);

const loan_period = v.pipe(
  v.string("Vänligen ange lånetid."),
  v.nonEmpty("Vänligen ange lånetid."),
  v.toNumber("Vänligen ange en giltig lånetid."),
);

// Schema
const schema = v.object({ loan_amount, loan_period });

export default schema;
