interface SubmitButtonProps {
    text: string
    className: string
    disable?: boolean
}

export default function SubmitButton(props: SubmitButtonProps) {
    return (
        <button className={`font-semibold rounded-xl ${props.className ? props.className : 'text-3xl'}`}>{props.text}</button>
    )
}