import Button from "./Button";
import status from "./status";

const Home = ({
  setValidatedWordToGuess,
  setValidatedWordToGuessCount,
  setUserGuess,
  wordToGuess,
  setWordToGuess,
  isWordToGuessOk,
  setIsWordToGuessOk,
}) => {
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
};

export default Home;
