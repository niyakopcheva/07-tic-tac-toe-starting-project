import Player from "./components/Player";

function App() {

  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player name='Plqyer1' symbol='X'/>
          <Player name='Player2' symbol='O'/>
        </ol>
        Game Board
      </div>
    </main>
  );
}

export default App
