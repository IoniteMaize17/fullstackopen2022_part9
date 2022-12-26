import { Box, Button, Typography } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Entry, BaseEntryFormValues, Gender, IHealthCheckEntry, IHospitalEntry, IOccupationalHealthcareEntry, Patient, EHealthCheckRating } from "../types";
import { Male, Female, Work, Favorite, MedicalServices, LocalHospital } from '@mui/icons-material';
import AddEntryModel from "../AddEntryModel";
import { addPatientToList, useStateValue } from "../state";

const PatientDetailPage = () => {
    const [, dispatch] = useStateValue();
    const [patient, setPation] = useState<Patient | null>(null);
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };

    const getColorHealthCheckRating = (rating: EHealthCheckRating): string => {
        switch (rating) {
            case EHealthCheckRating.Healthy: return '#009688';
            case EHealthCheckRating.LowRisk: return '#e3cd0d';
            case EHealthCheckRating.HighRisk: return '#ff9800';
            case EHealthCheckRating.CriticalRisk: return '#f44336';
            default: return '#009688';
        }
    };

    const submitNewEntry = async (values: BaseEntryFormValues) => {
        try {
            if (patient) {
                const { data: updatePatient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${patient.id}/entries`,
                values
                );
                dispatch(addPatientToList(updatePatient));
                setPation(updatePatient);
                closeModal();
            }
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
            console.error(e?.response?.data || "Unrecognized axios error");
            setError(String(e?.response?.data?.error) || "Unrecognized axios error");
            } else {
            console.error("Unknown error", e);
            setError("Unknown error");
            }
        }
    };

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
    const Hospital: React.FC<{ entry: IHospitalEntry }> = ({ entry }) => {
        return (<div>
            <Typography>
                {entry.date} <LocalHospital />
            </Typography>
            <Typography>
                <i>{entry.description}</i>
            </Typography>
            <Typography>
                diagnose by {entry.specialist}
            </Typography>
        </div>);
    };
    const OccupationalHealthcare: React.FC<{ entry: IOccupationalHealthcareEntry }> = ({ entry }) => {
        return (
            <div>
                <Typography>
                    {entry.date} <Work /> {entry.employerName}
                </Typography>
                <Typography>
                    <i>{entry.description}</i>
                </Typography>
                <Typography>
                    diagnose by {entry.specialist}
                </Typography>
            </div>
        );
    };
    const HealthCheck: React.FC<{ entry: IHealthCheckEntry }> = ({ entry }) => {
        return (
            <div>
                <Typography>
                    {entry.date} <MedicalServices />
                </Typography>
                <Typography>
                    <i>{entry.description}</i>
                </Typography>
                <Typography>
                    <Favorite sx={{color: getColorHealthCheckRating(entry.healthCheckRating)}} />
                </Typography>
                <Typography>
                    diagnose by {entry.specialist}
                </Typography>
            </div>
        );
    };
    const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
        switch (entry.type) {
            case "Hospital": return <Hospital entry={entry} />;
            case "OccupationalHealthcare": return <OccupationalHealthcare entry={entry} />;
            case "HealthCheck": return <HealthCheck entry={entry} />;
            default: return null;
        }
    };
    return (
        <div>
            <Box sx={{ fontWeight: 'bold', fontSize: 25, marginBottom: 10, marginTop: 10, fontFamily: 'Helvetica' }}> {patient?.name}{' '} {getIconGender()}</Box>
            <Box>
                <Typography>
                    ssh: {patient?.ssn}
                </Typography>
                <Typography>
                    occupation: {patient?.occupation}
                </Typography>
            </Box>
            <Box sx={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10, marginTop: 10, fontFamily: 'Helvetica' }}>entries</Box>
            {patient?.entries?.map((entry) => (
                <Box style={{
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderRadius: 5,
                    padding: 10,
                    marginBottom: 10
                }} key={entry.id}>
                    <EntryDetails entry={entry} />
                </Box>
            ))}
            <AddEntryModel
              modalOpen={modalOpen}
              onSubmit={submitNewEntry}
              error={error}
              onClose={closeModal}
            />
            <Button variant="contained" onClick={() => openModal()}>
              Add New Entry
            </Button>
        </div>
    );
};

export default PatientDetailPage;