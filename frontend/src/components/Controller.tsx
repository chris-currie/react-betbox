import React from "react";
import Button from "./Button";
import BetBox from "./BetBox";
import axios from "axios";
import { useState, useEffect } from "react"; //React Hook to store and manage state of variable

function Controller() {
  const [hasWon, setHasWon] = useState(false); // Getter and Setter
  const [betDirection, setBetDirection] = useState<string>("up"); // Getter and Setter
  const [isLoading, setIsLoading] = useState(false); // Getter and Setter
  const [valStored, setValStored] = useState(0); // Getter and Setter

  const placeBet = async () => {
    setIsLoading(true);
    let isWinner = false;
    const url = "https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new";
    await axios
      .get(url)
      .then((res) => {
        if (res.status == 200) {
          const val = res.data;
          console.log(val);
          setValStored(val);
          if (val >= 50 && betDirection == "up") {
            isWinner = true;
          } else if (val < 50 && betDirection == "down") {
            isWinner = true;
          }
          console.log(res.data);
        } else {
          console.error("There was some kind of error");
        }
      })
      .catch((err) => {
        console.log(err.data, err.message);
      });

    // Return winner
    setHasWon(isWinner);
    setIsLoading(false);
  };

  useEffect(() => {
    console.log(hasWon);
  }, [hasWon]); // so re-render if hasWon changes. hasWon is now a dependency in this useEffect

  // Pass state to child component (which is BetBox, so set up Props there, to receive it)
  return (
    <div className="w-full md:w-[850px] lg:w-[1200px] py-12 container mx-auto px-5">
      <Button runFunction={placeBet} />
      <BetBox
        betDirection={betDirection}
        setBetDirection={setBetDirection}
        isLoading={isLoading}
        valStored={valStored}
        hasWon={hasWon}
      />
    </div>
  );
}

export default Controller;
