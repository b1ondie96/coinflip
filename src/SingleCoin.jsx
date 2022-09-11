import React, { useImperativeHandle, useState } from "react";
import { AiFillEuroCircle, AiOutlinePoundCircle } from "react-icons/ai";

const SingleCoin = ({ childRef, endParent, duration }) => {
  const [isheads, setIsheads] = useState(false);
  const [rotate, setRotate] = useState(0);
  const [randomNumberState, setRandomNumber] = useState();
  const [flipped, setFlipped] = useState(0);

  useImperativeHandle(childRef, () => ({
    flipCoin() {
      const randomNumber = Math.floor(Math.random() * (10 - 1 + 1) + 1);
      const even = [6, 8, 10, 12, 14, 16, 18, 20];
      const odd = [7, 9, 11, 13, 15, 17, 19];
      const randomEven = even[Math.floor(Math.random() * even.length)];
      const randomOdd = odd[Math.floor(Math.random() * odd.length)];

      setRandomNumber(randomNumber);

      if (randomNumber > 5) {
        setIsheads(true);

        setRotate(randomOdd * 180);
      } else {
        setIsheads(false);

        setRotate(randomEven * 360);
      }
    },
  }));

  const onEnd = () => {
    randomNumberState > 5 ? setRotate(180) : setRotate(0);
    setFlipped(flipped + 1);
    endParent(isheads);
  };

  return (
    <div
      className="Coincard"
      id="coin"
      style={{
        transform: `rotateY(${rotate}deg)`,
        transitionDuration: `${duration}s`,
      }}
      onTransitionEnd={onEnd}
    >
      <AiOutlinePoundCircle className="card__face card__face--front" />
      <AiFillEuroCircle className="card__face card__face--back" />
    </div>
  );
};

export default SingleCoin;
