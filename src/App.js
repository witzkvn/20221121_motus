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

  const [wordToGuess, setWordToGuess] = useState("");
  const [isWordToGuessOk, setIsWordToGuessOk] = useState(null);
  const [validatedWordToGuess, setValidatedWordToGuess] = useState([]);
  const [validatedWordToGuessCount, setValidatedWordToGuessCount] = useState(
    {}
  );
  const [userGuess, setUserGuess] = useState([]);
  const [round, setRound] = useState(0);
  const [isWin, setIsWin] = useState(false);

  const resetGame = () => {
    setWordToGuess("");
    setIsWordToGuessOk(null);
    setValidatedWordToGuess([]);
    setValidatedWordToGuessCount({});
    setUserGuess([]);
    setRound(0);
    setIsWin(false);
  };

  if (!wordToGuess || !isWordToGuessOk) {
    return (
      <Home
        setUserGuess={setUserGuess}
        setValidatedWordToGuess={setValidatedWordToGuess}
        setValidatedWordToGuessCount={setValidatedWordToGuessCount}
        wordToGuess={wordToGuess}
        setWordToGuess={setWordToGuess}
        isWordToGuessOk={isWordToGuessOk}
        setIsWordToGuessOk={setIsWordToGuessOk}
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
