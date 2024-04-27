import Header from './components/Header'
import Spinner from './components/Spinner'
import Scores from './components/Scores'
import Footer from './components/Footer'
import Card from './components/Card'
import React from 'react'
import useEmojisFetch from './hooks/useEmojisFetch'
import useGameState from './hooks/useGameState'

const apiUrl = import.meta.env.VITE_API_URL
const apiKey = import.meta.env.VITE_API_KEY
const emojisAmount = 12

export default function App () {
  const { emojis, loading } = useEmojisFetch(apiUrl, apiKey)
  const { emojiList, score, bestScore, handleCardClick } =
    useGameState(emojis, emojisAmount)

  return (
    <div className="flex flex-col min-h-screen container mx-auto justify-between">
      <Header />
      <div id="game" className="min-h-[400px] max-w-xl mx-auto flex flex-col">
        {!loading && <Scores bestScore={bestScore} score={score} />}
        <div className="game-board flex-1 p-5 mt-5">
          {!loading && emojiList && emojiList.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 justify-center animate-fade-in-up">
              {emojiList.map((emoji, index) => (
                <Card
                  key={index}
                  emoji={emoji}
                  handleCardClick={handleCardClick}
                />
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
