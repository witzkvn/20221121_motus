import { useState } from "react";
import "./App.css";
import End from "./End";
import Home from "./Home";
import Play from "./Play";

function App() {
  // TODO : 2 équipes avec compte points chacune
  // TODO : Bouton restart game set points 2 équipes à 0
  // TODO : Ajouter un bouton ajouter une lettre : une lettre est dévoilée et ça passe à l'équipe suivante
  // TODO : redesign propre
  // TODO : api dictionnaire ?

  // word to guess states
  const [wordToGuess, setWordToGuess] = useState("");
  const [validatedWordToGuess, setValidatedWordToGuess] = useState([]);
  const [validatedWordToGuessCount, setValidatedWordToGuessCount] = useState(
    {}
  );

  // teams states
  const [teamAdata, setTeamAdata] = useState({ name: "", score: 0 });
  const [teamBdata, setTeamBdata] = useState({ name: "", score: 0 });

  // round play states
  const [userGuess, setUserGuess] = useState([]);
  const [round, setRound] = useState(0);
  const [isWin, setIsWin] = useState(false);

  const resetGame = () => {
    setWordToGuess("");
    setValidatedWordToGuess([]);
    setValidatedWordToGuessCount({});
    setUserGuess([]);
    setRound(0);
    setIsWin(false);
  };

  if (!wordToGuess) {
    return (
      <Home
        setUserGuess={setUserGuess}
        setValidatedWordToGuess={setValidatedWordToGuess}
        setValidatedWordToGuessCount={setValidatedWordToGuessCount}
        wordToGuess={wordToGuess}
        setWordToGuess={setWordToGuess}
        setTeamAdata={setTeamAdata}
        teamAdata={teamAdata}
        setTeamBdata={setTeamBdata}
        teamBdata={teamBdata}
      />
    );
  }

  if (round === 8) {
    return (
      <End resetGame={resetGame} validatedWordToGuess={validatedWordToGuess} />
    );
  }

  return (
    <Play
      resetGame={resetGame}
      validatedWordToGuess={validatedWordToGuess}
      validatedWordToGuessCount={validatedWordToGuessCount}
      isWin={isWin}
      setIsWin={setIsWin}
      round={round}
      setRound={setRound}
      userGuess={userGuess}
      setUserGuess={setUserGuess}
    />
  );
}

export default App;
