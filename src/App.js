import { useEffect, useState } from "react";
import "./App.css";
import End from "./End";
import Home from "./Home";
import Play from "./Play";

function App() {
  // TODO : 2 équipes avec compte points chacune
  // TODO : Bouton restart game set points 2 équipes à 0
  // TODO : Ajouter un bouton ajouter une lettre : une lettre est dévoilée et ça passe à l'équipe suivante
  // TODO : redesign propre

  // word to guess states
  const [wordToGuess, setWordToGuess] = useState("");
  const [validatedWordToGuess, setValidatedWordToGuess] = useState([]);
  const [validatedWordToGuessCount, setValidatedWordToGuessCount] = useState(
    {}
  );

  // teams states
  const [teamAdata, setTeamAdata] = useState({ name: "", score: 0 });
  const [teamBdata, setTeamBdata] = useState({ name: "", score: 0 });
  const [isTeamATurn, setIsTeamATurn] = useState(true);

  // round play states
  const [userGuess, setUserGuess] = useState([]);
  const [round, setRound] = useState(0);
  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    if (round === 8) {
      setIsTeamATurn((prev) => !prev);
      // TODO ajouter une lettre à l'affichage
    }
  }, [round]);

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
      <div className="max-w-sm">
        <div className="max-w-sm mx-auto">
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
        </div>
      </div>
    );
  }

  if (round === 8) {
    return (
      <End resetGame={resetGame} validatedWordToGuess={validatedWordToGuess} />
    );
  }

  return (
    <div className="w-full bg-gradient-to-b from-orange-200 to-orange-400">
      <div className="max-w-sm mx-auto">
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
          setIsTeamATurn={setIsTeamATurn}
          isTeamATurn={isTeamATurn}
          setTeamAdata={setTeamAdata}
          setTeamBdata={setTeamBdata}
          teamAdata={teamAdata}
          teamBdata={teamBdata}
        />
      </div>
    </div>
  );
}

export default App;
