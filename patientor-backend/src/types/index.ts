/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IDiagnoses {
    code: string;
    name: string;
    latin?: string;
}

export type NonSensitiveDiagnoses = Omit<IDiagnoses, 'code' | 'name' | 'latin'>;

export enum EGender {
    Male = "male",
    Female = "female",
    Other = "other"
}
export const isGender = (param: any): param is EGender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(EGender).includes(param);
};
export const parseGender = (gender: unknown): EGender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

export interface IPatients {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: EGender;
    occupation: string;
}

export type INewIPatient = Omit<IPatients, 'id'>;

export type NonSensitivePatients = Omit<IPatients, 'id' | 'name' | 'dateOfBirth' | 'ssn' | 'gender' | 'occupation'>;