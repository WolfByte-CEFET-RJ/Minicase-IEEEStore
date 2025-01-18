interface SelectionProps {
    group_options?: {[key: string]: string[]}
    text: string
    options?: string[]
}

export default function Select(props: SelectionProps) {
    return (
        
        <select className="focus:outline-none bg-amber-50 border-b border-solid border-black text-xl mr-5 text-gray-600 w-48">
            <option value="" selected disabled>Escolha de {props.text}</option>
            {Object.keys(props.group_options ?? {}).map(key => (  // Verificação de `group_options` undefined
                <optgroup label={key} key={key}>
                    {props.group_options?.[key]?.map(valor => (  // Verificação de undefined para as propriedades
                        <option value={valor} key={valor}>
                            {valor}
                        </option>
                    ))}
                </optgroup>
            ))}

            {props.options?.map(option => (
                <option value={option}>{option}</option>
            ))}
        </select>
    )
}