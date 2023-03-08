import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateResultGame } from "../../redux/gameSlice";
import { getBalance, getDeposit, updateBalance } from "../../redux/userSlice";
import Header from "../../components/Header";
import Doors from "../../components/Doors";
import GameSidebar from "../../components/GameSidebar";
import style from "./DoorGamePage.module.css";

export default function DoorGamePage() {
  let balance = useSelector(getBalance);
  const dispatch = useDispatch();
  const deposite = useSelector(getDeposit);
  const [gameResult, setGameResult] = useState([]);
  const [result, setResult] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const resultRef = useRef(result);

  function getRandomNum(min, max) {
    let num = min + Math.random() * (max + 1 - min);
    return Math.floor(num);
  }

  const handleClick = (e) => {
    let num = e.target.textContent;
    if (getRandomNum(1, 3) === +num) {
      balance = +Number(balance + (deposite / 100) * 5).toFixed(2);
      dispatch(updateBalance(balance));
      setGameResult([...gameResult, { [num] : `+${+Number((deposite / 100) * 5).toFixed(2)}` }]);
      setResult(+Number(result + (deposite / 100) * 5).toFixed(2));
    } else {
      balance = +Number(balance - (deposite / 100) * 5).toFixed(2);
      dispatch(updateBalance(balance));
      setGameResult([...gameResult, { [num]: `-${+Number((deposite / 100) * 5).toFixed(2)}`}]);
      setResult(+Number(result - (deposite / 100) * 5).toFixed(2));
    }
  };

  useEffect(() => {
    return () => {
      setIsMounted(true);
      if (isMounted) {
        resultRef.current > 0
          ? dispatch(updateResultGame({"Вгадай двері": `+${resultRef.current}`}))
          : dispatch(updateResultGame({"Вгадай двері": resultRef.current}));
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
          <h2>Вгадай двері</h2>
          <p>
            Кожен раз коли ви клікаєте по одній з дверей, з вашого балансу
            списується 5% від вашого початкового депозиту, программа генерує
            випадкове значення від 1 до 3, якщо ваш варінт співпав з тим який
            згенерувала программа то ви потроїте ставку якщо ні то втрачаєте
            списані кошти з балансу.
          </p>
          <Doors handleClick={handleClick} />
        </div>
        <GameSidebar arr={gameResult} />
      </div>
    </>
  );
}
