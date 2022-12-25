import { Box, Typography } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Diagnosis, Entry, Gender, IHealthCheckEntry, IHospitalEntry, IOccupationalHealthcareEntry, Patient } from "../types";
import { Male, Female } from '@mui/icons-material';
import { useStateValue } from "../state";

const PatientDetailPage = () => {
    const [{ diagnoses }] = useStateValue();
    const [patient, setPation] = useState<Patient | null>(null);
    const { id } = useParams<{ id: string }>();
    React.useEffect(() => {
        const fetchPatientDetail = async () => {
            try {
                const { data: patientDetailFromApi } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id ?? ''}`
                );
                setPation(patientDetailFromApi);
            } catch (e) {
                console.error(e);
            }
        };
        void fetchPatientDetail();
    }, []);
    const getIconGender = () => {
        switch (patient?.gender) {
            case Gender.Female: return <Female />;
            case Gender.Male: return <Male />;
            default: return "Other";
        }
    };
    // const getDiagnoseDetail = (code: string): Diagnosis | undefined => {
    //     return Object.values(diagnoses).find(f => f.code === code);
    // };
    const Hospital: React.FC<{entry: IHospitalEntry}> = ({entry}) => {
        return (<>{entry.type}</>);
    };
    const OccupationalHealthcare: React.FC<{entry: IOccupationalHealthcareEntry}> = ({entry}) => {
        return (<>{entry.type}</>);
    };
    const HealthCheck: React.FC<{entry: IHealthCheckEntry}> = ({entry}) => {
        return (<>{entry.type}</>);
    };
    const EntryDetails: React.FC<{entry: Entry}> = ({entry}) => {
        switch (entry.type) {
            case "Hospital": return <Hospital entry={entry} />;
            case "OccupationalHealthcare": return <OccupationalHealthcare entry={entry} />;
            case "HealthCheck": return <HealthCheck entry={entry} />;
            default: return null;
        }
    };
    return (
        <div>
            <Box sx={{fontWeight: 'bold', fontSize: 25, marginBottom: 10, marginTop: 10, fontFamily: 'Helvetica'}}> {patient?.name}{' '} {getIconGender()}</Box>
            <Box>
                <Typography>
                    ssh: {patient?.ssn}
                </Typography>
                <Typography>
                    occupation: {patient?.occupation}
                </Typography>
            </Box>
            <Box sx={{fontWeight: 'bold', fontSize: 20, marginBottom: 10, marginTop: 10, fontFamily: 'Helvetica'}}>entries</Box>
            {patient?.entries?.map((entry) => (
                <EntryDetails key={entry.id} entry={entry} />
                // <Box key={entry.id}>
                //     <Typography>
                //         {entry.date} {entry.description}
                //     </Typography>
                //     <ul>
                //         {entry.diagnosisCodes?.map(code => (
                //             <li key={code}><Typography>{code} {getDiagnoseDetail(code)?.name}</Typography></li>
                //         ))}
                //     </ul>
                // </Box>
            ))}
        </div>
    );
};

export default PatientDetailPage;