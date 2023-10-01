import React, { useEffect, useState } from "react";
import GameStatus from "./GameStatus";

const alphabets = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export default function Hangman(props) {
  let durationTime = props.duration;
  console.log(durationTime);
  let word = props.word1;
  let wordList = word.split("");

  const [mask, setMask] = useState(wordList.map((item) => " ___ "));
  const [isOver, setIsOver] = useState(false);
  const [guess, setGuess] = useState(0);

  const check = (letter) => {
    setGuess(guess + 1);
    let newMask = wordList.map((x, ind) =>
      x === letter ? letter : mask[ind] === " ___ " ? " ___ " : mask[ind]
    );
    if (newMask) setMask(newMask);
  };
  useEffect(() => {
    let timer = setTimeout(() => {
      setIsOver(true);
    }, props.duration);
    return () => clearTimeout(timer);
  });

  return (
    <div>
      {alphabets.map((item) => (
        <button
          key={item}
          onClick={() => {
            check(item);
          }}
        >
          {item}
        </button>
      ))}
      <h5>{mask}</h5>
      {guess == word.length || isOver ? (
        <GameStatus maskWord={mask}></GameStatus>
      ) : (
        ""
      )}
    </div>
  );
}
