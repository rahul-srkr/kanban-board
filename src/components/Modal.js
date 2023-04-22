const Modal = (props) => {
    return (
        <div
            className="fixed top-0 left-0 h-screen w-full bg-[rgb(0,0,0,0.5)] flex justify-center items-center z-10"
            draggable="true"
            onDragStart={(e) => {
                e.preventDefault()
                e.stopPropagation()
            }}
            onClick={() => {
                props.onClose ? props.onClose() : ""
            }}
        >
            <div
                className="bg-light dark:bg-dark rounded-md p-5 max-h-[95vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {props.children}
            </div>
        </div>
    )
}
export default Modal