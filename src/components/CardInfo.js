import Editable from "./Editable"
import Modal from "./Modal"
import { FiType, FiCheckSquare } from "react-icons/fi"
import { MdFormatListBulleted } from "react-icons/md"
import { AiOutlineCalendar, AiOutlineTag, AiOutlineDelete } from "react-icons/ai"
import { useEffect, useState } from "react"
import Chip from "./Chip"

const CardInfo = (props) => {
    const { boardId, updateCard } = props

    const [values, setValues] = useState({ ...props.card });
    const colors = [
        "#a8193d",
        "#4fcc25",
        "#1ebffa",
        "#8da377",
        "#9975bd",
        "#cf61a1",
        "#240959"
    ]

    const [activeColor, setActiveColor] = useState("");

    const calculatePercent = () => {
        if (values.tasks.length === 0) return "0"
        const complete = values.tasks?.filter(item => item.complete)?.length
        return (complete / values.tasks?.length) * 100 + ""
    }

    const [percent, setPercent] = useState(calculatePercent())

    useEffect(() => {
        updateCard(props.card.id, boardId, values)
    }, [values]);

    return (
        <Modal onClose={() => props.onClose()}>
            <div className="flex flex-col gap-5 min-w-[40rem]" draggable="false">
                <div className="flex flex-col gap-3">
                    <div className="flex gap-2 items-center">
                        <FiType className="w-5 h-5" />
                        <h2 className="text-lg font-medium">Title</h2>
                    </div>
                    <div className="w-fit">
                        <Editable
                            className="bg-board-light dark:bg-board-dark px-2 py-1"
                            text={values.title}
                            inputText={values.title}
                            placeholder="Enter Title"
                            btnText="Set Title"
                            onSubmit={(value) => setValues({ ...values, title: value })}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex gap-2 items-center">
                        <MdFormatListBulleted className="w-5 h-5" />
                        <h2 className="text-lg font-medium">Description</h2>
                    </div>
                    <div className="w-fit">
                        <Editable
                            className="bg-board-light dark:bg-board-dark px-2 py-1"
                            text={values.desc || "Add Description"}
                            inputText={values.desc}
                            placeholder="Enter Description"
                            btnText="Set Description"
                            onSubmit={(value) => setValues({ ...values, desc: value })}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex gap-2 items-center">
                        <AiOutlineCalendar className="w-5 h-5" />
                        <h2 className="text-lg font-medium">Date</h2>
                    </div>
                    <div className="w-fit">
                        <input
                            type="date"
                            className="bg-board-light dark:bg-board-dark px-2 py-1 focus:outline-none rounded-md"
                            defaultValue={values.date && new Date(values.date)?.toISOString().substring(0, 10)}
                            onChange={(e) => setValues({ ...values, date: e.target.value })}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex gap-2 items-center">
                        <AiOutlineTag className="w-5 h-5" />
                        <h2 className="text-lg font-medium">Labels</h2>
                    </div>
                    <ul className="flex-wrap flex items-center gap-2">
                        {
                            values.labels.map((item, i) => (
                                <Chip
                                    onClose={
                                        (id) => {
                                            setValues(
                                                {
                                                    ...values,
                                                    labels: values.labels.filter(item => item.id !== id)
                                                })
                                        }
                                    }
                                    key={item.text + i}
                                    text={item.text}
                                    backgroundColor={item.color}
                                    close={true}
                                    id={item.id}
                                />
                            ))
                        }
                    </ul>
                    <ul className="flex gap-2 items-center">
                        {
                            colors.map((item, i) => (
                                <li
                                    onClick={() => setActiveColor(item)}
                                    key={i}
                                    style={{ backgroundColor: item }}
                                    className={`h-4 w-4 rounded-full border-2 ${activeColor === item ? "border-light dark:border-dark" : "border-transparent"}`}
                                />
                            ))
                        }
                    </ul>
                    <div className="w-fit">
                        <Editable
                            className="bg-board-light dark:bg-board-dark px-2 py-1"
                            text="Add Label"
                            placeholder="Enter Label Name"
                            btnText="Add Label"
                            onSubmit={(value) => setValues({ ...values, labels: [...values.labels, { id: Date.now() + Math.random(), text: value, color: activeColor }] })}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex gap-2 items-center">
                        <FiCheckSquare className="w-5 h-5" />
                        <h2 className="text-lg font-medium">Tasks</h2>
                    </div>
                    <progress id="file" value={percent} max="100" className="h-2 w-full rounded-lg bg-primary-light" />
                    <ul className="w-full flex flex-col gap-2">
                        {
                            values.tasks.map((item, i) => (
                                <li key={item.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <input id={item.id} type="checkbox" checked={item.complete} onChange={
                                            (e) => {

                                                setValues({ ...values, ...values.tasks[values.tasks.findIndex(task => item.id === task.id)].complete = e.target.checked })

                                                setPercent(calculatePercent())
                                            }
                                        } className="w-4 h-4 focus:outline-none" />
                                        <label htmlFor={item.id} className={`${item.complete && "line-through"}`}>{item.text}</label>
                                    </div>
                                    <AiOutlineDelete className="h-5 w-5" onClick={
                                        () => {

                                            setValues({ ...values, ...values.tasks.splice(values.tasks.findIndex(task => item.id === task.id), 1) })
                                            setPercent(calculatePercent())
                                        }
                                    } />
                                </li>
                            ))
                        }
                    </ul>
                    <div className="w-fit">
                        <Editable
                            className="bg-board-light dark:bg-board-dark px-2 py-1"
                            text="Add Tasks"
                            placeholder="Enter Tasks Name"
                            btnText="Add Label"
                            onSubmit={(value) => {
                                setValues({ ...values, ...values.tasks.splice(values.tasks.length, 0, { id: Date.now() + Math.random(), text: value, complete: false }) })
                                setPercent(calculatePercent())
                            }
                            }
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
}
export default CardInfo

// setValues({ ...values, ...values.tasks[values.tasks.findIndex(tas => tas.id === item.id)].complete = e.target.checked })