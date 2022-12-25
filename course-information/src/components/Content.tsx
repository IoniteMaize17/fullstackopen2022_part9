import { CoursePart } from "../type.all"
import { Part } from "./Part"

interface IContentProps {
    courseParts: CoursePart[]
}
export const Content = ({ courseParts }: IContentProps) => {
    return (
        <>
            {courseParts.map(coursePart => (
                <Part key={coursePart.name} coursePart={coursePart} />
            ))}
        </>
    )
}