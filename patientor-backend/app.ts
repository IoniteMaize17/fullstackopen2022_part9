import express from 'express';
import cors from 'cors';
import { pingRouter } from './src/controllers/ping';
import { diagnoseRouter } from './src/controllers/diagnoses';
import { patientRouter } from './src/controllers/patients';
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/ping', pingRouter);
app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

export { app };