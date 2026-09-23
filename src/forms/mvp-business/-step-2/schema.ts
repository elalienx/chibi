// Node modules
import * as v from "valibot";

// Fields
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
const schema = v.object({ email, phone });

export default schema;
