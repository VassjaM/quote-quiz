import { useKanyeQuote } from "./hooks/useKanyeQuote";
import { useGameState } from "./hooks/useGameState";
import ProfileCard from "./components/ProfileCard";
import StreakCard from "./components/StreakCard";
import QuoteCard from "./components/QuoteCard";
import ScoreCard from "./components/ScoreCard";
import HistoryCard from "./components/HistoryCard";
import SkipCard from "./components/SkipCard";
import AboutCard from "./components/AboutCard";
import GameTitle from "./components/GameTitle";
import Footer from "./components/Footer";

function App() {
  const { currentQuote, loading, fetchQuote } = useKanyeQuote();
  const { state, theme, answer, isAnimating } = useGameState(
    currentQuote,
    fetchQuote,
  );

  const handleSkip = () => {
    if (isAnimating) return;
    fetchQuote();
  };

  return (
    <div className={`app-body state-${theme}`}>
      <GameTitle />
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

        <div className=" card-bottom-right">
          <SkipCard onSkip={handleSkip} />
          <AboutCard />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
