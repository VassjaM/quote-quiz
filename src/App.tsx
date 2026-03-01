import ProfileCard from "./components/ProfileCard";
import StreakCard from './components/StreakCard'
import QuoteCard from './components/QuoteCard'
import ScoreCard from './components/ScoreCard'
import HistoryCard from './components/HistoryCard'
import SkipCard from './components/SkipCard'
import AboutCard from './components/AboutCard'

function App() {
  return (
    <div className="app-body">
      <div className="bento">
        <ProfileCard lastCorrect={state.lastCorrect} phase={state.phase} />

        <StreakCard streak={state.streak} />

        <QuoteCard
          currentQuote={currentQuote}
          loading={loading}
          phase={state.phase}
          quoteIndex={state.quoteIndex}
          lastCorrect={state.lastCorrect}
          onAnswer={answer}
        />

        <ScoreCard score={state.score} played={state.played} />

        <HistoryCard history={state.history} />

        <SkipCard onSkip={handleSkip} />

        <AboutCard />
      </div>
    </div>
  );
}

export default App;
