import { Grid, Button } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { DiagnosisSelection, HealthCheckOption, SelectFieldHealthCheck, SelectFieldType, TextField } from "../AddPatientModal/FormField";
import { EHealthCheckRating, BaseEntryFormValues } from "../types";
import { useStateValue } from "../state";

interface Props {
  onSubmit: (values: BaseEntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: string[] = ["Hospital", "OccupationalHealthcare", "HealthCheck"];

const healthCheckOptions: HealthCheckOption[] = [
  { value: EHealthCheckRating.Healthy, label: "Healthy" },
  { value: EHealthCheckRating.LowRisk, label: "Low Risk" },
  { value: EHealthCheckRating.HighRisk, label: "High Risk" },
  { value: EHealthCheckRating.CriticalRisk, label: "Critical Risk" }
];


export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  const switchFormWithType = (values: BaseEntryFormValues) => {
    switch (values.type) {
      case "Hospital":
      if (!values.discharge) values.discharge = {
        date: '',
        criteria: ''
      };
      return (
        <div>
          <Field
            label="Date"
            placeholder="YYYY-MM-DD"
            name="discharge.date"
            component={TextField}
          />
          <Field
            label="Criteria"
            placeholder="Criteria"
            name="discharge.criteria"
            component={TextField}
          />
        </div>
      );
      case "OccupationalHealthcare":
        if (!values.employerName) values.employerName = '';
        if (!values.sickLeave) values.sickLeave = {
          startDate: '',
          endDate: ''
        };
        return (
        <div>
          <Field
            label="Employer Name"
            placeholder="Employer Name"
            name="employerName"
            component={TextField}
          />
          <Field
            label="Sick Leave Start Date"
            placeholder="YYYY-MM-DD"
            name="sickLeave.startDate"
            component={TextField}
          />
          <Field
            label="Sick Leave End Date"
            placeholder="YYYY-MM-DD"
            name="sickLeave.endDate"
            component={TextField}
          />
        </div>
      );
      case "HealthCheck":
      if (!values.healthCheckRating) values.healthCheckRating = 0;
      return (
        <div style={{marginTop: 10}}>
          <SelectFieldHealthCheck label="Health Check Rating" name="healthCheckRating" options={healthCheckOptions} />
        </div>
      );
      default: return null;
    }
  };
  return (
    <Formik
      initialValues={{
        type: "Hospital",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        discharge: {
          date: '',
          criteria: ''
        }
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type) {
          if (values.type === "Hospital") {
            if (! values.discharge.date) {
              errors['discharge.date'] = requiredError;
            }
            if (! values.discharge.criteria) {
              errors['discharge.criteria'] = requiredError;
            }
          }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectFieldType label="Type" name="type" options={typeOptions.map(m => ({
              value: m,
              label: m
            }))} />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Special List"
              placeholder="Special List"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection diagnoses={Object.values(diagnoses)} setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} />
            {switchFormWithType(values)}
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
