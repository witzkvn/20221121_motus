import React from "react";
import Button from "./Button";

const End = ({ validatedWordToGuess, resetGame }) => {
  return (
    <div className="h-screen bg-gradient-to-b from-cyan-600 to-blue-600 text-white flex items-center flex-col text-center py-6 px-2">
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
};

export default End;
