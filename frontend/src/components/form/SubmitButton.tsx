interface SubmitButtonProps {
    text: string
    className: string
    disable?: boolean
}

export default function SubmitButton(props: SubmitButtonProps) {
    return (
        <button className={`font-semibold text-3xl rounded-xl ${props.className ? props.className : ''}`}>{props.text}</button>
    )
}