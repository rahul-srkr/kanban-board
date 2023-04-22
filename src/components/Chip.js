import { FiX } from "react-icons/fi"

const Chip = (props) => {
    const { id, text, close, backgroundColor = "blue" } = props

    return (
        <div style={{ backgroundColor }} className={`inline-flex gap-2 items-center px-2 py-1 rounded-full text-xs font-semibold text-dark`}>
            {text}
            {close && <FiX
                className="stroke-[4px]"
                onClick={() => {
                    if (props.onClose) props.onClose(id);
                }}
            />}
        </div>
    )
}
export default Chip