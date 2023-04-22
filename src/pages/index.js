import Board from '@/components/Board'
import { BsMoonStars, BsFillSunFill } from "react-icons/bs"
import Image from 'next/image'
import useThemeSwitcher from '@/components/hooks/useThemeSwitcher'
import Editable from '@/components/Editable'
import { useEffect, useState } from 'react'

export default function Home() {
  const [mode, setMode] = useThemeSwitcher()

  const [boards, setBoards] = useState([])

  useEffect(() => {
    if (localStorage.getItem('boards')) {
      setBoards(JSON.parse(localStorage.getItem('boards')))
    }
  }, []);

  useEffect(() => {
    if (boards) {
      if (boards.length !== 0) {
        localStorage.setItem("boards", JSON.stringify(boards))
      }
    }
  }, [boards]);

  const [target, setTarget] = useState({
    cid: "",
    bid: ""
  });

  const [boardTarget, setBoardTarget] = useState("");

  const addCard = (title, bid) => {
    const card = {
      id: Date.now() + Math.random(),
      title,
      labels: [],
      tasks: [],
      date: "",
      desc: ""
    }

    const index = boards.findIndex((item) => item.id === bid)
    if (index < 0) return

    const tempBoards = [...boards]
    tempBoards[index].cards.push(card)
    setBoards(tempBoards)
  }

  const removeCard = (cid, bid) => {
    const bIndex = boards.findIndex((item) => item.id === bid)
    if (bIndex < 0) return

    const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cid)
    if (cIndex < 0) return

    const tempboards = [...boards]
    tempboards[bIndex].cards.splice(cIndex, 1)
    setBoards(tempboards)
  }

  const addBoard = (title) => {
    setBoards([...boards, {
      id: Date.now() + Math.random(),
      title,
      cards: []
    }])
  }

  const removeBoard = (bid) => {
    const tempBoards = boards.filter(item => item.id !== bid)
    setBoards(tempBoards)
  }

  const handleDragEnter = (cid, bid) => {
    setTarget({
      cid,
      bid
    })
  }

  const handleDragEnd = (cid, bid) => {
    let s_bIndex, s_cIndex, t_bIndex, t_cIndex

    s_bIndex = boards.findIndex((item) => item.id === bid)
    if (s_bIndex < 0) return

    s_cIndex = boards[s_bIndex].cards.findIndex((item) => item.id === cid)
    if (s_cIndex < 0) return

    t_bIndex = boards.findIndex((item) => item.id === target.bid)
    if (t_bIndex < 0) return

    t_cIndex = boards[t_bIndex].cards.findIndex((item) => item.id === target.cid)

    const tempBoards = [...boards]
    const tempCard = tempBoards[s_bIndex].cards[s_cIndex]

    tempBoards[s_bIndex].cards.splice(s_cIndex, 1)

    if (t_cIndex >= 0) {
      tempBoards[t_bIndex].cards.splice(t_cIndex, 0, tempCard)
    } else {
      tempBoards[t_bIndex].cards.push(tempCard)
    }

    setBoards(tempBoards)
  }

  const handleBoardDragEnter = (bid) => {
    setBoardTarget(bid)
  }

  const handleBoardDragEnd = (bid) => {
    let s_bIndex, t_bIndex

    s_bIndex = boards.findIndex((item) => item.id === bid)
    if (s_bIndex < 0) return

    t_bIndex = boards.findIndex((item) => item.id === boardTarget)
    if (t_bIndex < 0) return

    const tempBoards = [...boards]
    const tempBoard = tempBoards[s_bIndex]
    tempBoards.splice(s_bIndex, 1)
    tempBoards.splice(t_bIndex, 0, tempBoard)
    setBoards(tempBoards)
  }

  const updateCard = (cid, bid, card) => {
    const bIndex = boards.findIndex((item) => item.id === bid)
    if (bIndex < 0) return

    const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cid)
    if (cIndex < 0) return

    const tempBoards = [...boards]
    tempBoards[bIndex].cards[cIndex] = card
    setBoards(tempBoards)
  }

  return (
    <section className='flex h-screen w-full flex-col bg-light dark:bg-dark text-light dark:text-dark'>
      <nav className='w-full py-3 px-7 border-b-2 border-primary-light dark:border-primary-dark text-2xl font-bold flex items-center justify-between'>
        <h2 className='text-primary-light dark:text-primary-dark'>Kanban</h2>
        <div onClick={() => { mode === "light" ? setMode("dark") : setMode("light") }}>
          {
            mode === "dark" ?
              <BsFillSunFill className="w-5 h-5" /> :
              <BsMoonStars className='h-5 w-5' />
          }
        </div>
      </nav>
      <div className='flex-grow w-ful overflow-x-auto p-4 pb-0'>
        <div className='min-w-fit flex gap-6 h-full'>
          {
            boards && boards.map((item) => (
              <Board
                key={item.id}
                board={item}
                removeBoard={removeBoard}
                addCard={addCard}
                removeCard={removeCard}
                handleDragEnter={handleDragEnter}
                handleDragEnd={handleDragEnd}
                handleBoardDragEnd={handleBoardDragEnd}
                handleBoardDragEnter={handleBoardDragEnter}
                updateCard={updateCard}
              />
            ))
          }
          <Editable
            text='Add Board'
            placeholder='Enter Board Title'
            className='bg-cards-light dark:bg-cards-dark border border-primary-light dark:border-primary-dark shadow-[4px_3px_5px_0_rgba(0,0,0,0.75)] rounded-none font-semibold p-3'
            onSubmit={(value) => addBoard(value)}
          />
        </div>
      </div>
    </section>
  )
}
