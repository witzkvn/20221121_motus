import { useEffect, useState } from "react";
import Button from "./Button";
import Letter from "./Letter";
import Rules from "./Rules";
import status from "./status";

const Play = ({
  resetGame,
  validatedWordToGuess,
  validatedWordToGuessCount,
  isWin,
  setIsWin,
  round,
  setRound,
  userGuess,
  setUserGuess,
  setIsTeamATurn,
  isTeamATurn,
  setTeamAdata,
  setTeamBdata,
  teamAdata,
  teamBdata,
}) => {
  const [rulesTabOpen, setRulesTabOpen] = useState("");
  const [guessValue, setGuessValue] = useState("");
  const [currentGoodGuessState, setCurrentGoodGuessState] = useState(
    userGuess[0]
  );

  useEffect(() => {
    console.log(currentGoodGuessState);
  }, [currentGoodGuessState]);

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

    // show only goog placed for next try
    const onlyGoodArray = result.map((letter) => {
      if (letter.status !== status.good) {
        return {
          letter: ".",
          status: status.wrong,
        };
      } else {
        return letter;
      }
    });

    setCurrentGoodGuessState(onlyGoodArray);

    if (isWin) {
      setIsWin(true);
      if (isTeamATurn) {
        setTeamAdata((prev) => {
          return { ...prev, score: prev.score + 1 };
        });
        setIsTeamATurn(false);
      } else {
        setTeamBdata((prev) => {
          return { ...prev, score: prev.score + 1 };
        });
        setIsTeamATurn(true);
      }
      return;
    }

    setRound((prev) => prev + 1);
  };

  const checkWin = (array) => {
    return array.every((el) => el.status === status.good);
  };

  return (
    <div className="App min-h-screen flex items-center flex-col text-center py-6 px-2">
      <h1 className="text-4xl mb-4 font-bold">Devinez le mot !</h1>
      <div
        onClick={() => setRulesTabOpen((prev) => !prev)}
        className="cursor-pointer mb-4"
      >
        {rulesTabOpen ? "Cacher les règles ❌" : "Voir les règles 💡"}
      </div>
      {rulesTabOpen && <Rules />}
      <div className="grid grid-cols-2 bg-blue-300 rounded-md mb-6">
        <div
          className={`rounded-md p-4 ${
            isTeamATurn && "border-4 border-blue-500"
          }`}
        >
          <div className="font-bold whitespace-nowrap">
            Score équipe {teamAdata.name}
          </div>
          <div className="text-xl">{teamAdata.score}</div>
        </div>
        <div
          className={`rounded-md p-4 ${
            !isTeamATurn && "border-4 border-blue-500"
          }`}
        >
          <div className="font-bold whitespace-nowrap">
            Score équipe {teamBdata.name}
          </div>
          <div className="text-xl">{teamBdata.score}</div>
        </div>
      </div>
      <p className="font-bold text-lg mb-2">
        C'est au tour de l'équipe{" "}
        <span className="text-blue-500">
          {isTeamATurn ? teamAdata.name : teamBdata.name}
        </span>
      </p>
      <p className="mb-6 font-bold">Tour {round + 1}/8</p>
      <div className="mb-6">
        {userGuess.map((guess, index) => {
          if (round > 0 && index === 0) {
            return null;
          } else {
            return (
              <div key={`guess-${index}`} className="flex mb-1">
                {guess.map((letter, index) => (
                  <Letter key={`letter-${round}-${index}`} letter={letter} />
                ))}
              </div>
            );
          }
        })}
        {round !== 0 && currentGoodGuessState && (
          <div className="flex mb-1">
            {currentGoodGuessState.map((letter, index) => (
              <Letter key={`letter-${round}-${index}`} letter={letter} />
            ))}
          </div>
        )}
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
        <form onSubmit={playRound} className="flex flex-col w-full mx-auto">
          <input
            className="uppercase p-2 rounded-sm mb-2 block text-black"
            type="text"
            onChange={(e) => setGuessValue(e.target.value)}
            value={guessValue}
            minLength={validatedWordToGuess.length}
            maxLength={validatedWordToGuess.length}
          />
          <Button>Proposer ce mot</Button>
        </form>
      )}
    </div>
  );
};

export default Play;
