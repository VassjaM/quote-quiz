import { useState, useCallback, useRef } from 'react'
import { CurrentQuote } from '../types'
import fakeQuotesData from '../data/fakeQuotes.json'

const fakeQuotes: string[] = fakeQuotesData as string[]

// 50/50 chance real vs fake each round
const REAL_PROBABILITY = 0.5

interface UseKanyeQuoteReturn {
  currentQuote: CurrentQuote | null
  loading: boolean
  fetchQuote: () => Promise<void>
}

export function useKanyeQuote(): UseKanyeQuoteReturn {
  const [currentQuote, setCurrentQuote] = useState<CurrentQuote | null>(null)
  const [loading, setLoading] = useState<boolean>(false)


  const usedFakeIndicesRef = useRef<number[]>([])

  const getRandomFakeQuote = useCallback((): string => {
    let available = fakeQuotes
      .map((_, i) => i)
      .filter(i => !usedFakeIndicesRef.current.includes(i))

    // Reset when all fake quotes have been used, so we can start reusing them (but in a new random order)
    if (available.length === 0) {
      usedFakeIndicesRef.current = []
      available = fakeQuotes.map((_, i) => i)
    }

    const randomIndex = available[Math.floor(Math.random() * available.length)]
    usedFakeIndicesRef.current = [...usedFakeIndicesRef.current, randomIndex]
    return fakeQuotes[randomIndex]
  }, [])

  const fetchQuote = useCallback(async () => {
    setLoading(true)

    try {
      const serveReal = Math.random() < REAL_PROBABILITY

      if (serveReal) {
        const res = await fetch('https://api.kanye.rest')
        if (!res.ok) throw new Error('API error')
        const data = await res.json()
        setCurrentQuote({ text: data.quote as string, isReal: true })
      } else {
        const fakeText = getRandomFakeQuote()
        setCurrentQuote({ text: fakeText, isReal: false })
      }
    } catch {
      // API error or similar - fallback to a fake quote
      const fakeText = getRandomFakeQuote()
      setCurrentQuote({ text: fakeText, isReal: false })
    } finally {
      setLoading(false)
    }
  }, [getRandomFakeQuote])

  return { currentQuote, loading, fetchQuote }
}