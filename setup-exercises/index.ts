/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(express.json());
app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    if (typeof req.query.weight !== "string") throw new Error("malformatted parameters");
    if (typeof req.query.height !== "string") throw new Error("malformatted parameters");
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (isNaN(height)) throw new Error("malformatted parameters");
    if (isNaN(weight)) throw new Error("malformatted parameters");
    
      res
        .json({
          weight: weight,
          height: height,
          bmi: calculateBmi(height, weight),
        })
        .end();
  } catch (error: unknown) {
    const errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      res.status(400).json({ error: error.message }).end();
    } else {
      res.status(400).json({ error: errorMessage }).end();
    }
  }
});

app.post('/exercises', (req, res) => {
  try {
    const daily_exercises = req.body.daily_exercises;
    const target = req.body.target;
    if (typeof target !== 'number') throw new Error("malformatted parameters");
    if (! Array.isArray(daily_exercises)) throw new Error("malformatted parameters");
    if (! daily_exercises.every(m => typeof m === 'number')) throw new Error("malformatted parameters");
    const numbers_daily_exercises: number[] = daily_exercises;
    res.json(calculateExercises(numbers_daily_exercises, target));
  } catch (error: unknown) {
    const errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      res.status(400).json({ error: error.message }).end();
    } else {
      res.status(400).json({ error: errorMessage }).end();
    }
  }
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
