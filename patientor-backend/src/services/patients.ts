/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
// hardcoded data import
import patients from "../../hardcoded_data/patients";
import { NonSensitivePatients, IPatients, INewIPatient, parseGender, PublicPatient } from '../types';
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

const addPatient = (entry: INewIPatient): IPatients => {
  const newPatient: IPatients = {
    id: uuidv4(),
    ...entry,
    gender: parseGender(entry.gender)
  };
  patients.push(newPatient);
  return newPatient;
};

const findById = (id: string): PublicPatient | undefined => {
  const entry = <PublicPatient | undefined>getEntries().find(d => d.id === id);
  return entry;
};

export const patientService = {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  findById
};