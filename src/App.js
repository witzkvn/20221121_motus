import { useState } from "react";
import "./App.css";

function App() {
    const [wordToGuess, setWordToGuess] = useState("");
    const [isWordToGuessOk, setIsWordToGuessOk] = useState(null);
    const [validatedWordToGuess, setValidatedWordToGuess] = useState("");

    const wordRegex = new RegExp("/^[0-9]{4,9}$/");

    const checkWordToGuess = (e) => {
        e.preventDefault();

        console.log(wordToGuess);

        if (!wordRegex.test(wordToGuess)) {
            console.log("word not ok");

            setIsWordToGuessOk(false);
        } else {
            console.log("word ok");
            setIsWordToGuessOk(true);
        }
    };

    if (!wordToGuess || !isWordToGuessOk) {
        return (
            <div>
                <h1>Entrez le mot à faire deviner</h1>
                <form>
                    <label htmlFor="word">
                        Entrez un mot constitué uniquement de lettres, de 4 à 9
                        charactères:
                    </label>
                    <input
                        type="text"
                        if="word"
                        placeholder="exemple"
                        onChange={(e) => setWordToGuess(e.target.value)}
                    />
                    <button onClick={checkWordToGuess}>Valider</button>
                </form>

                {isWordToGuessOk === false ? (
                    <p>
                        Le mot à trouver n'est pas valide. Merci d'en essayer un
                        autre.
                    </p>
                ) : null}
            </div>
        );
    }

    return <div className="App">test</div>;
}

export default App;
