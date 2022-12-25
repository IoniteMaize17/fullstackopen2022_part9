interface IHeaderProps {
    name: string
}
export const Header = ({name}: IHeaderProps) => {
    return (
        <h1>{name}</h1>
    )
}