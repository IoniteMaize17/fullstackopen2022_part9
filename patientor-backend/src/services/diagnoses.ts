// hardcoded data import
import diagnoses from "../../hardcoded_data/diagnoses.json";
import { NonSensitiveDiagnoses, IDiagnoses } from '../types';

const getEntries = (): IDiagnoses[] => {
  return diagnoses;
};

const getNonSensitiveEntries = (): NonSensitiveDiagnoses[] => {
    return diagnoses.map(({ code, name, latin }) => ({
        code,
        name,
        latin
      }));
};

const addDiagnose = () => {
  return null;
};

export const diagnoseService = {
  getEntries,
  addDiagnose,
  getNonSensitiveEntries
};