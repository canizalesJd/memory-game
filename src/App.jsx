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

  useEffect(() => {
    fetch(apiUrl + apiKey)
      .then((response) => response.json())
      .then((json) => {
        setEmojis(json)
      })
      .catch((error) => console.error(error))
  }, [])

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

  useEffect(() => {
    if (emojis && emojiList.length < emojisAmount) {
      getEmojiList()
      setLoading(false)
    }
  }, [emojis])

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
          <p className="text-lg">
            <span className="font-semibold">Score:</span>
            {' ' + score}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Best Score:</span>
            {' ' + bestScore}
          </p>
        </div>
        <div className="game-board flex-1 p-5 mt-5">
          {!loading && emojiList && emojiList.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 justify-center">
              {emojiList.map((emoji, index) => (
                <div
                  key={index}
                  data-emoji-id={emoji.slug}
                  className="card flex-1 h-40 rounded-xl bg-zinc-900  cursor-pointer hover:bg-zinc-700"
                >
                  <div className="card-body flex flex-col h-full p-5 justify-center items-center">
                    <span className="card-title flex w-full flex-1 justify-center items-center text-5xl">
                      {emoji.character}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              role="status"
              className="flex h-full justify-center items-center"
            >
              <svg
                aria-hidden="true"
                className="w-12 h-12 text-gray-200 animate-spin dark:text-zinc-500 fill-indigo-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
