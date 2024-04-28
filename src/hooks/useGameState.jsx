import { useState, useEffect } from 'react'
import shuffleArray from '../utils/shuffleArray'
import DIFFICULTY from '../utils/constants'

const useGameState = (emojis) => {
  const [emojiList, setEmojiList] = useState([])
  const [score, setScore] = useState(0)
  const [counter, setCounter] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [emojiHistory, setEmojiHistory] = useState([])
  const [difficulty, setDifficulty] = useState('MEDIUM')
  const [emojisAmount, setEmojisAmount] = useState(DIFFICULTY[difficulty])
  const [currentMenu, setCurrentMenu] = useState('DIFFICULTY')

  useEffect(() => {
    if (emojis && emojiList.length < emojisAmount) {
      getEmojiList()
    }
  }, [emojis, emojisAmount, emojiList.length])

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score)
    }
    // get new emojis when counter is equal to the amount of emojis
    if (counter === emojisAmount) {
      getEmojiList()
      setCounter(0)
    }
  }, [score, bestScore])

  const getEmojiList = () => {
    setEmojiList([])
    for (let i = 0; i < emojisAmount; i++) {
      const randomIndex = Math.floor(Math.random() * emojis.length)
      const emoji = emojis[randomIndex]
      // Flags aren't rendered nicely, so we remove them from the list
      if (emoji.slug.includes('flag')) {
        i--
        continue
      }
      setEmojiList((emojiList) => [...emojiList, emojis[randomIndex]])
    }
  }

  const handleCardClick = (id) => {
    // reset game if the user clicked on the same emoji twice
    if (emojiHistory.includes(id)) {
      setScore(0)
      setCounter(0)
      setEmojiHistory([])
      getEmojiList()
      shuffleArray(emojiList)
      flipCards()
      setCurrentMenu('GAME-OVER')
      return
    }
    // increase score and add id to history
    setEmojiHistory((emojiHistory) => [...emojiHistory, id])
    setScore((score) => score + 1)
    setCounter((counter) => counter + 1)
    // shuffle the list and flip cards
    shuffleArray(emojiList)
    flipCards()
  }

  const handleSelectDifficulty = (e) => {
    const difficulty = e.target.innerHTML.toUpperCase()
    setDifficulty(difficulty)
    setEmojisAmount(DIFFICULTY[difficulty])
    setCurrentMenu('GAME')
  }

  const flipCards = () => {
    const cards = document.querySelectorAll('.card')
    cards.forEach((card) => {
      card.classList.add('animate-flip-x')
    })
    setTimeout(() => {
      cards.forEach((card) => {
        card.classList.remove('animate-flip-x')
      })
    }, 600)
  }

  const handleChangeMenu = (MENU) => {
    setCurrentMenu(MENU)
  }

  return {
    emojiList,
    score,
    bestScore,
    emojiHistory,
    handleCardClick,
    handleSelectDifficulty,
    handleChangeMenu,
    currentMenu
  }
}

export default useGameState
