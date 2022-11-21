import React from "react";
import status from "./status";

const Letter = ({ letter }) => {
  return (
    <div className="text-3xl w-max bg-gradient-to-b from-cyan-600 to-blue-600 text-white mr-1 last:mx-0">
      <div
        className={`w-10 h-10 flex justify-center items-center p-2 ${
          letter.status === status.good
            ? "bg-gradient-to-b from-green-800 to-green-600"
            : letter.status === status.misplaced
            ? "bg-gradient-to-b from-orange-400 to-orange-500 rounded-full"
            : ""
        }`}
      >
        {letter.letter}
      </div>
    </div>
  );
};

export default Letter;
