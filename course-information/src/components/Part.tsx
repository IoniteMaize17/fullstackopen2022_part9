import { CoursePart } from "../type.all"

interface IPartProps {
    coursePart: CoursePart
}

export const Part = ({ coursePart }: IPartProps) => {
    const switchCaseTypeContent = () => {
        switch (coursePart.type) {
            case "normal": return null
            case "groupProject": return (
                <p>project exercises {coursePart.groupProjectCount}</p>
            )
            case "submission": return (
                <p>submit to {coursePart.exerciseSubmissionLink}</p>
            )
            case "special": return (
                <p>required skils: {coursePart.requirements.join(', ')}</p>
            )
        }
        return null
    }
    return (
        <div>
            <b>{coursePart.name} {coursePart.exerciseCount}</b>
            {coursePart.description ? (
                <p><i>{coursePart.description}</i></p>
            ) : null}
            {switchCaseTypeContent()}
        </div>
    )
}