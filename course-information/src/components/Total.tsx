import { CoursePart } from "../type.all"

interface IContentProps {
    courseParts: CoursePart[]
}
export const Total = ({ courseParts }: IContentProps) => {
    return (
        <p>
            Number of exercises{" "}
            {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p>
    )
}