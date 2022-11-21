import { useState } from "react";
import "./App.css";
import Button from "./Button";
import Letter from "./Letter";
import status from "./status";

function App() {
  const [wordToGuess, setWordToGuess] = useState("");
  const [isWordToGuessOk, setIsWordToGuessOk] = useState(null);
  const [validatedWordToGuess, setValidatedWordToGuess] = useState([]);
  const [validatedWordToGuessCount, setValidatedWordToGuessCount] = useState(
    {}
  );
  const [userGuess, setUserGuess] = useState([]);
  const [round, setRound] = useState(0);
  const [isWin, setIsWin] = useState(false);

  const [guessValue, setGuessValue] = useState("");

  const wordRegex = /^[a-zA-Z]{4,9}$/;

  const checkWordToGuess = (e) => {
    e.preventDefault();

    const isWordOk = wordRegex.test(wordToGuess.trim());

    if (!isWordOk) {
      console.log("nok");
      setIsWordToGuessOk(false);
    } else {
      setIsWordToGuessOk(true);
      const wordInArray = wordToGuess.trim().toUpperCase().split("");
      setValidatedWordToGuess(wordInArray);

      const count = {};
      for (const element of wordInArray) {
        if (count[element]) {
          count[element] += 1;
        } else {
          count[element] = 1;
        }
      }
      setValidatedWordToGuessCount(count);

      const userGuessArray = wordInArray.map((el) => {
        return {
          letter: ".",
          status: status.wrong,
        };
      });
      userGuessArray[0] = {
        letter: wordInArray[0],
        status: status.wrong,
      };
      setUserGuess((prev) => [...prev, userGuessArray]);
    }
  };

  const playRound = (e) => {
    e.preventDefault();

    const result = validatedWordToGuess.map((el) => undefined);
    const guessArray = guessValue.trim().toUpperCase().split("");

    const count = {};

    // do good first
    for (let i = 0; i < validatedWordToGuess.length; i++) {
      if (guessArray[i] === validatedWordToGuess[i]) {
        const letterObj = {
          letter: guessArray[i],
          status: status.good,
        };

        if (count[letterObj.letter]) {
          count[letterObj.letter] += 1;
        } else {
          count[letterObj.letter] = 1;
        }

        result[i] = letterObj;
      }
    }

    // do misplaced then
    for (let i = 0; i < validatedWordToGuess.length; i++) {
      if (result[i] !== undefined) continue;

      let newStatus = status.wrong;

      const isLetterCountFull =
        count[guessArray[i]] >= validatedWordToGuessCount[guessArray[i]];

      console.log("is included", validatedWordToGuess.includes(guessArray[i]));

      if (validatedWordToGuess.includes(guessArray[i]) && !isLetterCountFull) {
        newStatus = status.misplaced;
      }

      const letterObj = {
        letter: guessArray[i],
        status: newStatus,
      };

      if (count[letterObj.letter]) {
        count[letterObj.letter] += 1;
      } else {
        count[letterObj.letter] = 1;
      }

      result[i] = letterObj;
    }

    const isWin = checkWin(result);

    const newArray = [...userGuess, result];
    setUserGuess(newArray);
    setGuessValue("");

    if (isWin) {
      setIsWin(true);
      return;
    }

    setRound((prev) => prev + 1);
  };

  const checkWin = (array) => {
    return array.every((el) => el.status === status.good);
  };

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
      <div className="h-screen bg-gradient-to-b from-cyan-600 to-blue-600 text-white flex items-center flex-col text-center py-6 px-2">
        <h1 className="mb-6 text-2xl font-bold md:text-3xl">
          Jouez à{" "}
          <span className="font-bold text-2xl text-orange-300">Motus</span> !
        </h1>
        <p className="font-bold ">
          Les autres joueurs doivent fermer les yeux pendant que vous rentrez
          votre mot 🙈
        </p>
        <form>
          <label className="block mb-6" htmlFor="word">
            Entrez un mot constitué uniquement de lettres, de 4 à 9 caractères :
          </label>
          <div className="flex flex-col max-w-sm md:justify-center mx-auto md:flex-row">
            <input
              className="py-1 px-2 rounded-sm mb-2 text-black md:mb-0 md:mr-2"
              type="text"
              id="word"
              placeholder="exemple"
              onChange={(e) => setWordToGuess(e.target.value)}
              value={wordToGuess}
            />
            <Button onClick={checkWordToGuess}>Valider</Button>
          </div>
        </form>

        {isWordToGuessOk === false ? (
          <div className="bg-red-100 border border-red-400 text-red-500 px-4 py-3 rounded text-sm mt-8">
            <strong class="font-bold">
              Le mot à trouver n'est pas valide. Merci d'en essayer un autre.
            </strong>
          </div>
        ) : null}
      </div>
    );
  }

  if (round === 8) {
    return (
      <div className="h-screen bg-gradient-to-b from-cyan-600 to-blue-600 text-white flex items-center flex-col text-center py-6 px-2 md:justify-center">
        <div className="mb-8">
          <h1 className="text-4xl mb-4 font-bold">C'est perdu ...</h1>
          <p>
            Le mot était{" "}
            <span className="font-bold text-2xl text-orange-300">
              {validatedWordToGuess.join("")}
            </span>
          </p>
        </div>
        <Button onClick={resetGame}>Rejouer ?</Button>
      </div>
    );
  }

  return (
    <div className="App min-h-screen bg-gradient-to-b from-orange-200 to-orange-400 flex items-center flex-col text-center py-6 px-2">
      <h1 className="text-4xl mb-4 font-bold">Devinez le mot !</h1>
      <p className="mb-6 font-bold">Tour {round + 1}/8</p>
      <div className="mb-6">
        {userGuess.map((guess, index) => (
          <div key={`guess-${index}`} className="flex mr-1 mb-1 last:mr-0">
            {guess.map((letter, index) => (
              <Letter key={`letter-${round}-${index}`} letter={letter} />
            ))}
          </div>
        ))}
      </div>
      {isWin ? (
        <div>
          <h2 className="text-2xl mb-4 font-bold">
            🎉 Vous avez trouvé le mot ! 🎉
          </h2>
          <p className="mb-6">
            Il s'agissait bien de{" "}
            <span className="font-bold text-2xl">
              {validatedWordToGuess.join("")}
            </span>
            , trouvé en{" "}
            <span className="font-bold text-green-700">
              {round + 1} tour
              {round > 1 ? "s" : ""}
            </span>
            .
          </p>
          <Button onClick={resetGame}>Rejouer ?</Button>
        </div>
      ) : (
        <>
          <form
            onSubmit={playRound}
            className="flex flex-col max-w-sm md:justify-center mx-auto md:flex-row"
          >
            <input
              className="uppercase py-1 px-2 rounded-sm mb-2 text-black md:mb-0 md:mr-2"
              type="text"
              onChange={(e) => setGuessValue(e.target.value)}
              value={guessValue}
              minLength={validatedWordToGuess.length}
              maxLength={validatedWordToGuess.length}
            />
            <Button>Valider ce mot</Button>
          </form>
          <div className="mt-6">
            <p className="font-bold text-2xl mb-2">Légende :</p>
            <div className="flex items-center mb-1">
              <Letter
                customSizesClasses={"h-4 w-4"}
                letter={{ letter: "", status: status.good }}
              />
              <p>Lettre bien placée</p>
            </div>
            <div className="flex items-center mb-1">
              <Letter
                customSizesClasses={"h-4 w-4"}
                letter={{ letter: "", status: status.misplaced }}
              />
              <p>Lettre présente mais mal placée</p>
            </div>
            <div className="flex items-center">
              <Letter
                customSizesClasses={"h-4 w-4"}
                letter={{ letter: "", status: status.wrong }}
              />
              <p>Mauvaise lettre</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
