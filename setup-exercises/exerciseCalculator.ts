interface CustomMultiplyValues {
    target: number;
    hours: number[];
}

const parseCustomArguments = (args: Array<string>): CustomMultiplyValues => {
    const result: CustomMultiplyValues = {
        target: Number(args[2]),
        hours: []
    };
    if (args.length < 4) throw new Error("Not enough arguments");
    if (isNaN(result.target)) throw new Error("Provided values were not numbers!");
    for (let i = 3; i < args.length; i++) {
        if (isNaN(Number(args[i]))) throw new Error("Provided values were not numbers!");
        result.hours.push(Number(args[i]));
    }
    return result;
  };


interface IRangeRating {
    point: number,
    ranges: number[],
    description: string
}

interface IExerciseResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export function calculateExercises(hours: number[], target: number): IExerciseResult {
    const RATINGS: IRangeRating[] = [
        {point: 1, ranges: [0,1], description: 'Too lazy, need more effort'},
        {point: 2, ranges: [1,3], description: 'Good. Keep it up.'},
        {point: 3, ranges: [3,24], description: 'Too much can be bad'}
    ];
    let totlaHours = 0;
    const result = {
        periodLength: 0,
        trainingDays: 0,
        success: false,
        rating: 0,
        ratingDescription: '',
        target: target,
        average: 0
    };
    hours.forEach(hour => {
        result.periodLength ++;
        if (hour > 0) {
            result.trainingDays ++;
            totlaHours += hour;
        }
    });
    if (result.periodLength > 0) result.average = totlaHours / result.periodLength;
    RATINGS.forEach(rating => {
        if (result.average >= rating.ranges[0] && result.average < rating.ranges[1]) {
            result.rating = rating.point;
            result.ratingDescription = rating.description;
        }
    });
    result.success = result.average >= target;
    return result;
}


try {
    const { target , hours } = parseCustomArguments(process.argv);
    console.log(calculateExercises(hours, target));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
