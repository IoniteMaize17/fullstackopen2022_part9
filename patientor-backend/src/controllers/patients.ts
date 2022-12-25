/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import { body, validationResult } from 'express-validator';
import { patientService } from "../services/patients";
import { INewIPatient, isGender } from "../types";
const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
    res.json(patientService.getEntries()).end();
});

patientRouter.get('/:id', (req, res) => {
    const diary = patientService.findById(req.params.id);

    if (diary) {
        res.send(diary);
    } else {
        res.sendStatus(404);
    }
});

patientRouter.post('/',
    body('name').exists(),
    body('dateOfBirth').exists(),
    body('dateOfBirth').isDate(),
    body('ssn').exists(),
    body('occupation').exists(),
    body('gender').exists(),
    body('gender').custom((value): boolean => {
        if (!isGender(value)) {
            throw new Error("Invalid gender");
        }
        return true;
    }),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ error: errors.array()[0].msg + ' with ' + errors.array()[0].param });
        }
        const entry: INewIPatient = req.body;
        const newPatient = patientService.addPatient(entry);
        res.json(newPatient);
    });

export { patientRouter };