/* eslint-disable @typescript-eslint/no-empty-interface */
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

interface IBaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

interface IHospitalEntryDischarge {
  date: string;
  criteria: string;
}

export interface IHospitalEntry extends IBaseEntry {
  type: "Hospital";
  discharge: IHospitalEntryDischarge;
}

interface IOccupationalHealthcareEntrySickLeave {
  startDate: string;
  endDate: string;
}

export interface IOccupationalHealthcareEntry extends IBaseEntry {
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

export interface IHealthCheckEntry extends IBaseEntry {
  type: "HealthCheck";
  healthCheckRating: EHealthCheckRating;
}

export type Entry =
| IHospitalEntry
| IOccupationalHealthcareEntry
| IHealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Entry[];
}
