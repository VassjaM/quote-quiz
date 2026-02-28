import ProfileCard from "./components/ProfileCard";

function App() {
  return (
    <div className="app-body">
      <div className="bento">
        <ProfileCard lastCorrect={state.lastCorrect} phase={state.phase} />
      </div>
    </div>
  );
}

export default App;
