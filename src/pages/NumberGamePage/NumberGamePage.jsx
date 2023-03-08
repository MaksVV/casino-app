import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateResultGame } from "../../redux/gameSlice";
import { getBalance, getDeposit, updateBalance } from "../../redux/userSlice";
import Header from "../../components/Header";
import GameSidebar from "../../components/GameSidebar";
import style from "./NumberGamePage.module.css";

export default function NumberGamePage() {
  let balance = useSelector(getBalance);
  const dispatch = useDispatch();
  const deposite = useSelector(getDeposit);
  const [num, setNum] = useState("");
  const [result, setResult] = useState(0);
  const [gameResult, setGameResult] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const resultRef = useRef(result);

  function getRandomNum(min, max) {
    let num = min + Math.random() * (max + 1 - min);
    return Math.floor(num);
  }

  const handleClick = () => {
    if (getRandomNum(1, 10) === num) {
      balance = +Number(balance + (deposite / 100) * 5).toFixed(2);
      dispatch(updateBalance(balance));
      setGameResult([...gameResult, { [num]: `+${+Number((deposite / 100) * 5).toFixed(2)}` }]);
      setResult(+Number(result + (deposite / 100) * 5).toFixed(2));
      setNum("");
    } else {
      balance = +Number(balance - (deposite / 100) * 5).toFixed(2);
      dispatch(updateBalance(balance));
      setGameResult([...gameResult, { [num]: `-${+Number((deposite / 100) * 5).toFixed(2)}` }]);
      setResult(+Number(result - (deposite / 100) * 5).toFixed(2));
      setNum("");
    }

    if (num < 1 || num > 10) {
      alert("Введене число не входить y діапазон від 1 до 10!!!");
      setNum("");
      return;
    }
  };

  useEffect(() => {
    return () => {
      setIsMounted(true);
      if (isMounted) {
        resultRef.current > 0
          ? dispatch(updateResultGame({ "Вгадай число": `+${resultRef.current}`}))
          : dispatch(updateResultGame({ "Вгадай число": resultRef.current }));
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
          <h2>Вгадай число</h2>
          <p>
            Кожен раз коли ви клікаєте по на кнопку “спробувати”, з вашого
            балансу списується 5% від вашого початкового депозиту, программа
            генерує випадкове значення від 1 до 10, якщо ваш варінт співпав з
            тим який згенерувала программа то ви отримаєте вдесятеро більше ніж
            поставили, якщо ні то втрачаєте списані кошти з балансу.
          </p>
          <div className={style.workbox}>
            <input
              type="number"
              value={num}
              onChange={(e) => setNum(+e.target.value)}
              placeholder="Введіть число"
            />
            <button onClick={handleClick}>Спробувати</button>
          </div>
        </div>
        <GameSidebar arr={gameResult} />
      </div>
    </>
  );
}