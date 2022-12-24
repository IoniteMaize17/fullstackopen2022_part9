interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

interface IBMI_TABLE {
  name: string;
  ranges: number[];
}
export function calculateBmi(height: number, weight: number): string {
  const TABLE_BMI_BASIC: IBMI_TABLE[] = [
    { name: "Underweight (Severe thinness)", ranges: [Number.MIN_VALUE, 16.0] },
    { name: "Underweight (Moderate thinness)", ranges: [16.0, 17.0] },
    { name: "Underweight (Mild thinness)", ranges: [17.0, 18.5] },
    { name: "Normal (healthy weight)", ranges: [18.5, 25.0] },
    { name: "Overweight (Pre-obese)", ranges: [25.0, 30.0] },
    { name: "Obese (Class I)", ranges: [30.0, 35.0] },
    { name: "Obese (Class II)", ranges: [35.0, 40.0] },
    { name: "Obese (Class III)", ranges: [40.0, Number.MAX_VALUE] },
  ];
  const bmiResult = weight / Math.pow(height / 100, 2);
  for (const iterator of TABLE_BMI_BASIC) {
    if (bmiResult >= iterator.ranges[0] && bmiResult < iterator.ranges[1]) {
      return iterator.name;
    }
  }
  return "";
}

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
