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
  const emojisAmount = DIFFICULTY[difficulty]
  const [currentMenu, setCurrentMenu] = useState('START')

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
    if (emojiHistory.includes(id)) {
      setScore(0)
      setCounter(0)
      setEmojiHistory([])
      getEmojiList()
      shuffleArray(emojiList)
      flipCards()
      return
    }
    setEmojiHistory((emojiHistory) => [...emojiHistory, id])
    setScore((score) => score + 1)
    setCounter((counter) => counter + 1)
    shuffleArray(emojiList)
    flipCards()
  }

  const handleSelectDifficulty = (e) => {
    setDifficulty(e.target.innerHTML.toUpperCase())
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

  return {
    emojiList,
    score,
    bestScore,
    emojiHistory,
    handleCardClick,
    handleSelectDifficulty,
    currentMenu
  }
}

export default useGameState
