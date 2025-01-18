interface SelectionProps {
    options: {[key: string]: string[]}
}

export default function Selection(props: SelectionProps) {
    return (
        <select>
            {props.options &&  props.options.key.map((option, index) => (
                <option key={index}>{option}</option>
            )) }
        </select>
    )
}