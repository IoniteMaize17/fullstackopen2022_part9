/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IDiagnoses {
  code: string;
  name: string;
  latin?: string;
}

export type NonSensitiveDiagnoses = Omit<IDiagnoses, "code" | "name" | "latin">;

export enum EGender {
  Male = "male",
  Female = "female",
  Other = "other",
}
export const isGender = (param: any): param is EGender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EGender).includes(param);
};
export const parseGender = (gender: unknown): EGender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

interface IBaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<IDiagnoses["code"]>;
  type: string;
}

interface IHospitalEntryDischarge {
  date: string;
  criteria: string;
}

interface IHospitalEntry extends IBaseEntry {
  type: "Hospital";
  discharge: IHospitalEntryDischarge;
}

interface IOccupationalHealthcareEntrySickLeave {
  startDate: string;
  endDate: string;
}

interface IOccupationalHealthcareEntry extends IBaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: IOccupationalHealthcareEntrySickLeave;
}

export enum EHealthCheckRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3,
}

interface IHealthCheckEntry extends IBaseEntry {
  type: "HealthCheck";
  healthCheckRating: EHealthCheckRating;
}

export type IEntry =
  | IHospitalEntry
  | IOccupationalHealthcareEntry
  | IHealthCheckEntry;

export interface IPatients {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: EGender;
  occupation: string;
  entries: IEntry[];
}

export type PublicPatient = Omit<IPatients, "ssn" | "entries">;

export type INewIPatient = Omit<IPatients, "id">;

export type NonSensitivePatients = Omit<
  IPatients,
  "id" | "name" | "dateOfBirth" | "ssn" | "gender" | "occupation" | "entries"
>;

export type EntryFormHospitalValues = Omit<IHospitalEntry, "id">;
export type EntryFormOccupationalHealthcareValues = Omit<IOccupationalHealthcareEntry, "id">;
export type EntryFormHealthCheckValues = Omit<IHealthCheckEntry, "id">;

export type BaseEntryFormValues = EntryFormHospitalValues | EntryFormOccupationalHealthcareValues | EntryFormHealthCheckValues;