import Header from './components/Header'
import Spinner from './components/Spinner'
import Scores from './components/Scores'
import Footer from './components/Footer'
import Card from './components/Card'
import React, { useState, useEffect } from 'react'

const apiUrl = import.meta.env.VITE_API_URL
const apiKey = import.meta.env.VITE_API_KEY
// To do: add a difficulty selector to change this size
const emojisAmount = 12

export default function App () {
  const [emojis, setEmojis] = useState(null)
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [emojiList, setEmojiList] = useState([])
  const [loading, setLoading] = useState(true)
  const [emojiHistory, setEmojiHistory] = useState([])

  // fetch emojis from API
  useEffect(() => {
    fetch(apiUrl + apiKey)
      .then((response) => response.json())
      .then((json) => {
        setEmojis(json)
      })
      .catch((error) => console.error(error))
  }, [])

  // get random emojis from the complete API result
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

  // update emojiList when emojis change
  useEffect(() => {
    if (emojis && emojiList.length < emojisAmount) {
      getEmojiList()
      setLoading(false)
    }
  }, [emojis])

  // update bestScore when score changes
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score)
    }
  }, [score])

  // update emojiHistory when score changes
  const handleCardClick = (id) => {
    // if clicked twice on the same emoji, reset the game
    if (emojiHistory.includes(id)) {
      setScore(0)
      setEmojiHistory([])
      getEmojiList()
      shuffle(emojiList)
      flipCards()
      return
    }
    setEmojiHistory((emojiHistory) => [...emojiHistory, id])
    setScore((score) => score + 1)
    shuffle(emojiList)
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

  // shuffle emojiList
  const shuffle = (list) => {
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[list[i], list[j]] = [list[j], list[i]]
    }
    return list
  }

  return (
    <div className="flex flex-col min-h-screen container mx-auto justify-between">
      <Header />
      <div id="game" className="min-h-[400px] max-w-xl mx-auto flex flex-col">
        {!loading && <Scores bestScore={bestScore} score={score} />}
        <div className="game-board flex-1 p-5 mt-5">
          {!loading && emojiList && emojiList.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 justify-center animate-fade-in-up">
              {emojiList.map((emoji, index) => (
              <Card key={index} emoji={ emoji } handleCardClick={handleCardClick}/>
              ))}
            </div>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
