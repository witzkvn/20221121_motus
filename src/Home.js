import Button from "./Button";
import getRandomWord from "./getRandomWord";
import status from "./status";

const Home = ({
  setValidatedWordToGuess,
  setValidatedWordToGuessCount,
  setUserGuess,
  setTeamAdata,
  setTeamBdata,
  teamAdata,
  teamBdata,
  setWordToGuess,
}) => {
  const setupGame = async (e) => {
    e.preventDefault();

    const randomWord = await getRandomWord();
    console.log("🚀 ~ file: Home.js:19 ~ setupGame ~ randomWord", randomWord);

    const wordInArray = randomWord.trim().toUpperCase().split("");
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

    // set first value
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

    setWordToGuess(randomWord);
  };

  return (
    <div className="h-screen  text-white flex items-center flex-col text-center py-6 px-2">
      <h1 className="mb-10 text-2xl font-bold uppercase md:text-3xl">
        Jouez à <span className="font-bold text-orange-400">Motus</span> !
      </h1>
      <p className="font-bold mb-6">
        Veuillez choisir un nom pour chaque équipe puis cliquez sur{" "}
        <span className="text-orange-300">"Lancer le jeu"</span>.
      </p>
      <p className="font-bold">
        Un mot aléatoire à deviner compris entre 4 et 9 lettres* sera choisi
        aléatoirement !
      </p>
      <p className="mb-10 text-sm">* Aucun accent ne sera pris en compte</p>
      <form onSubmit={setupGame}>
        <div className="flex flex-col mb-2">
          <label className="block mb-1" htmlFor="teamA">
            Entrez un nom pour la première équipe :
          </label>
          <input
            className="py-1 px-2 rounded-sm mb-2 text-black"
            type="text"
            id="teamA"
            placeholder="Equipe A"
            onChange={(e) => setTeamAdata({ name: e.target.value, score: 0 })}
            value={teamAdata.name}
            required
          />
        </div>
        <div className="flex flex-col mb-6">
          <label className="block mb-1" htmlFor="teamB">
            Entrez un nom pour la deuxième équipe :
          </label>
          <input
            className="py-1 px-2 rounded-sm mb-10 text-black"
            type="text"
            id="teamB"
            placeholder="Equipe B"
            onChange={(e) => setTeamBdata({ name: e.target.value, score: 0 })}
            value={teamBdata.name}
            required
          />
          <Button className="">Lancer le jeu</Button>
        </div>
      </form>
    </div>
  );
};

export default Home;
