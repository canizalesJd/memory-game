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

export default function App () {
  const { emojis, loading } = useEmojisFetch(apiUrl, apiKey)
  const { emojiList, score, bestScore, handleCardClick, handleSelectDifficulty, currentMenu } =
    useGameState(emojis)

  return (
    <div className="flex flex-col min-h-screen container mx-auto justify-between">
      <Header />
      <div
        id="game"
        className="min-h-[400px] max-w-xl mx-auto flex flex-col w-full"
      >
        {(() => {
          switch (currentMenu) {
            case 'GAME': {
              return (
                <>
                  {!loading && <Scores bestScore={bestScore} score={score} />}
                  <div className="game-board flex-1 p-5">
                    {!loading && emojiList && emojiList.length > 0 ? (
                      <div
                        className={`grid grid-cols-3 ${
                          emojiList.length === 12 ? 'md:grid-cols-4' : 'md:grid-cols-3'
                        } gap-5 justify-center animate-fade-in-up`}
                      >
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
                </>
              )
            }
            case 'GAME-OVER':
              return (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <h1 className="text-2xl font-bold mb-4">Game Over</h1>
                  <button
                    className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
                    onClick={handleCardClick}
                  >
                    Play Again
                  </button>
                </div>
              )
            case 'START':
              return (
                <div className="flex-1 flex flex-col items-center justify-center animate-fade-in-up">
                  <h2 className="text-3xl font-semibold">Difficulty</h2>
                  <div className="flex gap-5 mt-5">
                    <button
                      className="bg-indigo-600 hover:bg-indigo-800 text-white py-2 px-4 rounded"
                      onClick={handleSelectDifficulty}
                    >
                      Easy
                    </button>
                    <button
                      className="bg-indigo-600 hover:bg-indigo-800 text-white py-2 px-4 rounded"
                      onClick={handleSelectDifficulty}
                    >
                      Medium
                    </button>
                    <button
                      className="bg-indigo-600 hover:bg-indigo-800 text-white py-2 px-4 rounded"
                      onClick={handleSelectDifficulty}
                    >
                      Hard
                    </button>
                  </div>
                </div>
              )
          }
        })()}
      </div>
      <Footer />
    </div>
  )
}
