import React from "react";
import Letter from "./Letter";
import status from "./status";

const Rules = () => {
  return (
    <div className="mb-6 bg-white p-4 rounded-md">
      <p className="font-bold text-2xl mb-2">Règles :</p>
      <p className="mb-2">
        Vous devez trouver un mot aléatoire en 8 tours maximum ! Bonne chance 😉
      </p>
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
  );
};

export default Rules;
