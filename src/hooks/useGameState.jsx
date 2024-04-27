import { useState, useEffect } from 'react'
import shuffleArray from '../utils/shuffleArray'

const useGameState = (emojis, emojisAmount) => {
  const [emojiList, setEmojiList] = useState([])
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [emojiHistory, setEmojiHistory] = useState([])

  useEffect(() => {
    if (emojis && emojiList.length < emojisAmount) {
      getEmojiList()
    }
  }, [emojis, emojisAmount, emojiList.length])

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score)
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
      setEmojiHistory([])
      getEmojiList()
      shuffleArray(emojiList)
      flipCards()
      return
    }
    setEmojiHistory((emojiHistory) => [...emojiHistory, id])
    setScore((score) => score + 1)
    shuffleArray(emojiList)
    flipCards()
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

  return { emojiList, score, bestScore, emojiHistory, handleCardClick }
}

export default useGameState
