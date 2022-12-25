// hardcoded data import
import patients from "../../hardcoded_data/patients.json";
import { NonSensitivePatients, IPatients, INewIPatient, parseGender } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getEntries = (): IPatients[] => {
  return <IPatients[]>patients;
};

const getNonSensitiveEntries = (): NonSensitivePatients[] => {
  return patients.map(({ id, name, dateOfBirth, ssn, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
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

const findById = (id: string): IPatients | undefined => {
  const entry = <IPatients | undefined>patients.find(d => d.id === id);
  return entry;
};

export const patientService = {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  findById
};