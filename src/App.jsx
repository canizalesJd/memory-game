import Spinner from './components/Spinner'
import React, { useState, useEffect } from 'react'

const apiUrl = import.meta.env.VITE_API_URL
const apiKey = import.meta.env.VITE_API_KEY
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
    for (let i = 0; i < emojisAmount; i++) {
      const randomIndex = Math.floor(Math.random() * emojis.length)
      const emoji = emojis[randomIndex]
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
    if (emojiHistory.includes(id)) {
      setScore(0)
      setEmojiHistory([])
      shuffle(emojiList)
      return
    }
    setEmojiHistory((emojiHistory) => [...emojiHistory, id])
    setScore((score) => score + 1)
    shuffle(emojiList)
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
    <div className="container mx-auto">
      <div className="p-7 flex items-center gap-4 flex-col">
        <h1 className="text-3xl font-bold">🗿 Memoji</h1>
        <p className="ml-2 text-lg text-gray-400">
          Don&apos;t click on the same emoji twice
        </p>
      </div>
      <div id="game" className="min-h-[400px] max-w-xl mx-auto flex flex-col">
        <div className="h-[100px] pl-5 pt-5">
          {!loading && (
            <div>
              <p className="text-lg">
                <span className="font-semibold">Score:</span>
                {' ' + score}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Best Score:</span>
                {' ' + bestScore}
              </p>
            </div>
          )}
        </div>
        <div className="game-board flex-1 p-5 mt-5">
          {!loading && emojiList && emojiList.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 justify-center">
              {emojiList.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => {
                    handleCardClick(emoji.slug)
                  }}
                >
                  <div
                    key={index}
                    className="card flex-1 h-40 rounded-xl bg-zinc-900  cursor-pointer hover:bg-zinc-800"
                  >
                    <div className="card-body flex flex-col h-full p-5 justify-center items-center">
                      <span className="card-title flex w-full flex-1 justify-center items-center text-6xl">
                        {emoji.character}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <Spinner/>
          )}
        </div>
      </div>
    </div>
  )
}
