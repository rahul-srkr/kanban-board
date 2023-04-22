import { useState } from "react"
import { AiOutlineClose } from "react-icons/ai"

const Editable = (props) => {
    const { btnText = "Add", placeholder = "Enter Your Text", text = "Add", inputText = "", className = "bg-light dark:bg-dark shadow-md p-3", } = props
    const [showEdit, setShowEdit] = useState(false);
    const [inputValue, setInputValue] = useState(inputText);
    return (
        <div>
            {
                showEdit ?
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            if (props.onSubmit) props.onSubmit(inputValue)
                            setShowEdit(false)
                            setInputValue("")
                        }}
                    >
                        <input
                            type="text"
                            className={`text-light w-full p-2 rounded-md min-w-max shadow-md dark:text-dark border border-primary-light dark:border-primary-dark bg-light dark:bg-dark focus:outline-none`}
                            autoFocus
                            placeholder={placeholder}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <div className="flex items-center gap-2 mt-2">
                            <button type="submit" className="bg-button-light text-sm  shadow-md dark:bg-button-dark hover:bg-button-hover-light transition-all duration-100 ease-in dark:hover:bg-button-hover-dark px-2 py-1 rounded-md font-semibold">{btnText}</button>
                            <AiOutlineClose onClick={() => setShowEdit(false)} className="cursor-pointer" />
                        </div>
                    </form> :
                    <p onClick={() => setShowEdit(true)} className={`transition-all duration-100 ease-in cursor-pointer min-w-max ${className} text-center rounded-md hover:bg-hover-light dark:hover:bg-hover-dark`}>{text}</p>
            }
        </div>
    )
}
export default Editable