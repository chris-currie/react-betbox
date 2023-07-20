import React from "react";
import BetButton from "./BetButton";

// Set up properties to receive state from the parent (which is the Controller)
type Props = {
  betDirection: string;
  setBetDirection: any;
  isLoading: boolean;
  valStored: number;
  hasWon: boolean;
};

function BetBox({ betDirection, setBetDirection, isLoading, valStored, hasWon }: Props) {
  return (
    <div className="mt-5">
      <div className="py-4 border bg-gray-800 text-right text-white pr-12">
        {isLoading ? "Loading..." : `Random number returned: ${valStored}`}
      </div>
      <div className="flex flex-row justify-between py-2 border">
        <BetButton direction="down" betDirection={betDirection} setBetDirection={setBetDirection} />
        <BetButton direction="up" betDirection={betDirection} setBetDirection={setBetDirection} />
      </div>
      <div className="py-2 border bg-gray-200 text-center text-4xl font-bold">
        {valStored != 0 && (
          <div className={"" + (hasWon ? "text-green-500" : "text-red-500") + ""}>
            {hasWon ? "WINNER!" : "BAD LUCK!"}
          </div>
        )}
      </div>
    </div>
  );
}

export default BetBox;
