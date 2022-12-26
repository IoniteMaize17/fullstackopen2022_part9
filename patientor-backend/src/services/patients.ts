/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
// hardcoded data import
import patients from "../../hardcoded_data/patients";
import { NonSensitivePatients, IPatients, INewIPatient, parseGender, PublicPatient, BaseEntryFormValues } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getEntries = (): IPatients[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatients[] => {
  return patients.map(({ id, name, dateOfBirth, ssn, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
    entries
  }));
};

const addPatient = (patient: INewIPatient): IPatients => {
  const newPatient: IPatients = {
    id: uuidv4(),
    ...patient,
    gender: parseGender(patient.gender)
  };
  patients.push(newPatient);
  return newPatient;
};

const findById = (id: string): PublicPatient | undefined => {
  const patient = getEntries().find(d => d.id === id);
  return patient;
};

const detailById = (id: string): IPatients | undefined => {
  const patient = getEntries().find(d => d.id === id);
  return patient;
};

const addEntry = (patient: IPatients, entry: BaseEntryFormValues): IPatients => {
  const entryNew = {
    ...entry,
    id: uuidv4()
  };
  patient.entries.push(entryNew);
  return patient;
};

export const patientService = {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  findById,
  addEntry,
  detailById
};