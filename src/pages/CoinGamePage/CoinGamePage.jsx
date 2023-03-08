import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";

import { getBalance, getDeposit, updateBalance } from "../../redux/userSlice";
import { updateResultGame } from "../../redux/gameSlice";
import Header from "../../components/Header";
import GameSidebar from "../../components/GameSidebar/GameSidebar";
import style from "./CoinGamePage.module.css";

export default function CoinGamePage() {
  let balance = useSelector(getBalance);
  const dispatch = useDispatch();
  const deposit = useSelector(getDeposit);
  const [result, setResult] = useState(0);
  const [gameResult, setGameResult] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const resultRef = useRef(result);

  function getRandomNum(min, max) {
    let num = min + Math.random() * (max + 1 - min);
    return Math.floor(num);
  }

  function randomCoin(balance, deposit) {
    if (getRandomNum(0, 1)) {
      return +Number(balance + (deposit / 100) * 5).toFixed(2);
    } else {
      return +Number(balance - (deposit / 100) * 5).toFixed(2);
    }
  }

  const handleClickHeads = () => {
    const newBalance = randomCoin(balance, deposit);
    dispatch(updateBalance(newBalance));
    const correctResult = +(newBalance - balance).toFixed(2);

    if (newBalance - balance > 0) {
      setGameResult([...gameResult, { Орел: `+${correctResult}`}]);
      setResult(+Number(result + correctResult).toFixed(2));
    } else {
      setGameResult([...gameResult, { Орел: `${correctResult}`}]);
      setResult(+Number(result + correctResult).toFixed(2));
    }
  };

  const handleClickTails = () => {
    const newBalance = randomCoin(balance, deposit);
    dispatch(updateBalance(newBalance));
    const correctResult = +(newBalance - balance).toFixed(2);

    if (newBalance - balance > 0) {
      setGameResult([...gameResult, { Решка: `+${correctResult}`}]);
      setResult(+Number(result + correctResult).toFixed(2));
    } else {
      setGameResult([...gameResult, { Решка: `${correctResult}`}]);
      setResult(+Number(result + correctResult).toFixed(2));
    }
  };

  useEffect(() => {
    return () => {
      setIsMounted(true);
      if (isMounted) {
        resultRef.current > 0
          ? dispatch(updateResultGame({ Монетка: `+${resultRef.current}` }))
          : dispatch(updateResultGame({ Монетка: resultRef.current }));
        setIsMounted(false);
      }
    };
  }, [dispatch, isMounted]);

  useEffect(() => {
    resultRef.current = result;
  }, [result]);

  return (
    <>
      <Header />
      <div className={style.wrapper}>
        <div className={style.field}>
          <h2>Монетка</h2>
          <p>
            Кожен раз коли ви нажимаєте на орел чи решка, з вашого балансу
            списується 5% від вашого початкового депозиту, программа генерує
            випадкове значення, якщо ваш варінт співпав з тим який згенерувала
            программа то ви подвоюєте ставку якщо ні то втрачаєте списані кошти
            з балансу.
          </p>
          <div className={style.buttons}>
            <img
              className={style.img}
              src={require("../../images/tail.png")}
              alt="Heads"
              onClick={handleClickHeads}
            />
            <img
              className={style.img}
              src={require("../../images/head.png")}
              alt="Tails"
              onClick={handleClickTails}
            />
          </div>
        </div>
        <GameSidebar arr={gameResult} />
      </div>
    </>
  );
}
