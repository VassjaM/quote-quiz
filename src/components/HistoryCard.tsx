interface Props {
  history: boolean[]
}

const TOTAL_DOTS = 10

export default function HistoryCard({ history }: Props) {
  const dots = Array.from({ length: TOTAL_DOTS }, (_, i) => {
    const historyIndex = history.length - TOTAL_DOTS + i
    if (historyIndex < 0) return 'empty'
    return history[historyIndex] ? 'correct' : 'wrong'
  })

  return (
    <div className="card card-history">
      <span className="annotation">history</span>
      <div className="history-title">Last answers</div>
      <div className="history-dots">
        {dots.map((status, i) => (
          <div
            key={i}
            className={`dot ${status === 'empty' ? '' : status} ${
              // new dot if it's the last one and history is not full yet
              i === history.length - 1 && history.length <= TOTAL_DOTS ? 'new' : ''
            }`}
          />
        ))}
      </div>
    </div>
  )
}