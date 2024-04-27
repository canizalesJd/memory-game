import { useState, useEffect } from 'react'

const useEmojisFetch = (apiUrl, apiKey) => {
  const [emojis, setEmojis] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`${apiUrl}${apiKey}`)
      .then((response) => response.json())
      .then((json) => {
        setEmojis(json)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }, [apiUrl, apiKey])

  return { emojis, loading }
}

export default useEmojisFetch
