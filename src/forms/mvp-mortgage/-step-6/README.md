# Step 6: Co-applicant employment

Step 6 mirrors [Step 5](../-step-5/README.md) for the co-applicant. The variants are the same, but they depend on `co_employment_type` from Step 4.

The form, schema, and CSS are a separate copy on purpose, so stakeholders can add or remove a field for one applicant without affecting the other.

The tooltips and helpers (`getEmploymentFields`, `getStartMonths`) are identical for both applicants, so Step 6 imports them from Step 5 instead of copying them.
