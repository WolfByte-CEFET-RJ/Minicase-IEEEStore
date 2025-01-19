interface SelectionProps {
    group_options?: {[key: string]: string[]}
    text: string
    options?: string[]
}

export default function Select(props: SelectionProps) {
    return (
        
        <select className="focus:outline-none bg-amber-50 border-b border-solid border-black text-xl mr-5 text-gray-600 w-48" defaultValue=''>
            <option value="" disabled>Escolha de {props.text}</option>
            {Object.keys(props.group_options ?? {}).map((key, index) => (  // Verificação de `group_options` undefined
                <optgroup label={key} key={index}>
                    {props.group_options?.[key]?.map((valor, index) => (  // Verificação de undefined para as propriedades
                        <option value={valor} key={index}>
                            {valor}
                        </option>
                    ))}
                </optgroup>
            ))}

            {props.options?.map((option, index) => (
                <option value={option} key={index}>{option}</option>
            ))}
        </select>
    )
}