import React, { useState, useEffect } from 'react'

const apiUrl = import.meta.env.VITE_API_URL
const apiKey = import.meta.env.VITE_API_KEY

export default function App () {
  const [data, setData] = useState(null)
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [indexes, setIndexes] = useState([])

  useEffect(() => {
    fetch(apiUrl + apiKey)
      .then(response => response.json())
      .then(json => {
        setData(json)
      })
      .catch(error => console.error(error))
  }, [])

  return (
    <div className="container mx-auto">
      <div className="p-7 flex items-center gap-4 flex-col">
        <h1 className="text-3xl font-bold">🗿 Memoji</h1>
        <p className="ml-2 text-lg text-gray-400">
          Don&apos;t click on the same emoji twice
        </p>
      </div>
      <div id="game" className="h-[600px] max-w-2xl mx-auto flex flex-col">
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
        <div className="game-board flex-1 border p-5"></div>
      </div>
    </div>
  )
}
