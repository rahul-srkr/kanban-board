import { FiMoreHorizontal } from "react-icons/fi"
import { AiOutlineClockCircle, AiOutlineCheckSquare } from "react-icons/ai"
import { FiCheckSquare } from "react-icons/fi"
import Chip from "./Chip"
import Dropdown from "./Dropdown"
import { useState } from "react"
import CardInfo from "./CardInfo"

const Card = ({ card, removeCard, boardId, handleDragEnd, handleDragEnter, updateCard }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            {
                showModal && <CardInfo
                    onClose={() => setShowModal(false)}
                    updateCard={updateCard}
                    boardId={boardId}
                    card={card}
                />
            }
            <div
                className="p-2 rounded-md bg-light dark:bg-dark group flex flex-col gap-2 shadow-md"
                draggable
                onDragEnd={(e) => {
                    e.target.style.opacity = 1
                    handleDragEnd(card.id, boardId)
                }}
                onDragEnter={(e) => {
                    handleDragEnter(card.id, boardId)
                }}
                onDrag={(e) => {
                    e.target.style.opacity = 0
                }}
                onClick={() => setShowModal(true)}

                id="card"
            >
                <div className="flex items-center">
                    <div className="flex-grow flex gap-2 w-1/4 overflow-x-auto">
                        {
                            card.labels.map((item) => (
                                <Chip
                                    id={item.id}
                                    key={item.id}
                                    text={item.text}
                                    backgroundColor={item.color}
                                />
                            ))
                        }

                    </div>
                    <div className="relative cursor-pointer" onClick={(e) => {
                        e.stopPropagation()
                        setShowDropdown(true)
                    }}>
                        <FiMoreHorizontal className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in" />
                        {
                            showDropdown && (
                                <Dropdown onClose={() => setShowDropdown(false)}>
                                    <p onClick={() => removeCard(card.id, boardId)} className="bg-button-light dark:bg-button-dark px-3 py-1 shadow-md w-max">Delete Card</p>
                                </Dropdown>
                            )
                        }

                    </div>
                </div>
                <div>
                    {card.title}
                </div>
                <div className="flex items-center justify-between  text-sm">
                    {
                        card.date && <div className="flex items-center gap-1">
                            <AiOutlineClockCircle />
                            <span>{card.date}</span>
                        </div>
                    }

                    <div className="flex items-center gap-1 text-sm">
                        <FiCheckSquare />
                        <span>{card.tasks.filter(item => item.complete).length}/{card.tasks.length}</span>
                    </div>
                </div>
            </div>
        </>

    )
}
export default Card