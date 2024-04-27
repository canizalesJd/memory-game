import React from 'react'
const Scores = (props) => {
  const { score, bestScore } = props
  return (
    <div className="h-[100px] pl-5 pt-5 animate-fade-in-down">
      <p className="text-lg">
        <span className="font-semibold">Score:</span>
        {' ' + score}
      </p>
      <p className="text-lg">
        <span className="font-semibold">Best Score:</span>
        {' ' + bestScore}
      </p>
    </div>
  )
}
export default Scores
