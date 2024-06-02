type TypeProps = {
    title: string,
    desc: string
}

const HeaderDesc = ({ title, desc }: TypeProps) => {
    return (
        <header className="pl-2">
            <h1 className="pb-1 text-gray-600">{title}</h1>
            <p className="text-gray-400 text-xs pb-2">{desc}</p>
        </header>
    )
}

export default HeaderDesc;