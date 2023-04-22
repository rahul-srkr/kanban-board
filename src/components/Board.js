import { FiMoreHorizontal } from "react-icons/fi"
import Card from "./Card"
import Editable from "./Editable"
import Dropdown from "./Dropdown"
import { useState } from "react"

const Board = ({ board, removeBoard, addCard, removeCard, handleDragEnd, handleDragEnter, handleBoardDragEnd, handleBoardDragEnter, updateCard }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    return (
        <div
            className="min-w-[20rem] max-w-[20rem] max-h-full flex flex-col space-y-4 p-2 pb-0 overflow-hidden border border-primary-light dark:border-x-primary-dark shadow-[4px_3px_5px_0_rgba(0,0,0,0.75)] bg-board-light dark:bg-board-dark"
            id="board"
            onDragEnter={(e) => {
                if (e.target.id === "board") {
                    handleBoardDragEnter(board.id)
                }

                if (board.cards.length === 0) {
                    handleDragEnter("", board.id)
                }
            }}
            onDrag={(e) => {

                if (e.target.id === "board") {
                    e.target.style.opacity = 0
                }
            }}
            onDragEnd={(e) => {
                if (e.target.id === "board") {
                    e.target.style.opacity = 1
                    handleBoardDragEnd(board.id)
                }
            }}

            draggable
        >
            <div className="flex items-center">
                <p className="flex-grow text-lg font-semibold">
                    {board.title}&nbsp;
                    <span className="text-dark dark:text-light self-start text-xs rounded-full px-1.5 bg-dark dark:bg-light">
                        {board.cards.length}
                    </span>
                </p>
                <div className="relative cursor-pointer" onClick={(e) => {
                    e.stopPropagation()
                    setShowDropdown(true)
                }}>
                    <FiMoreHorizontal className="w-5 h-5" />
                    {
                        showDropdown && (
                            <Dropdown onClose={() => setShowDropdown(false)}>
                                <p onClick={() => removeBoard(board.id)} className="bg-button-light dark:bg-button-dark px-3 py-2 shadow-md w-max">Delete Board</p>
                            </Dropdown>
                        )
                    }

                </div>
            </div>
            <div className="bg-cards-light dark:bg-cards-dark p-3 pb-0 flex flex-col flex-grow gap-4 overflow-y-auto">
                {
                    board.cards.map((item) => (
                        <Card
                            key={item.id}
                            card={item}
                            removeCard={removeCard}
                            boardId={board.id}
                            handleDragEnd={handleDragEnd}
                            handleDragEnter={handleDragEnter}
                            updateCard={updateCard}
                        />
                    ))
                }
                <Editable
                    text="Add Card"
                    placeholder="Enter Card Title"
                    onSubmit={(value) => addCard(value, board.id)}
                />
            </div>
        </div>
    )
}
export default Board