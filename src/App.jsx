import React from 'react'
export default function App () {
  return (
    <div className="container mx-auto">
      <div className="p-7 flex items-center gap-4 flex-col">
        <h1 className="text-3xl font-bold">🗿 Memoji</h1>
        <p className="ml-2 text-lg text-gray-400">
          Don&apos;t click on the same emoji twice
        </p>
      </div>
      <div
        id="game"
        className="border h-[600px] max-w-2xl mx-auto flex flex-col"
      >
        <div className="h-[100px] pl-5 pt-5">
          <p className="text-lg">
            <span className="font-semibold">Score:</span>
            {' ' + 0}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Best Score:</span>
            {' ' + 0}
          </p>
        </div>
        <div className="game-board flex-1 border"></div>
      </div>
    </div>
  )
}
