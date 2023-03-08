import { useSelector } from "react-redux";

import ButtonAgain from "../../components/ButtonAgain/ButtonAgain";
import { getName, getDeposit, getBalance } from "../../redux/userSlice";
import style from "./CongratulationPage.module.css"

export default function CongratulationPage() {
  const name = useSelector(getName);
  const deposit = useSelector(getDeposit);
  const balance = useSelector(getBalance);

  return (
    <div className={style.win}>
      <h2>Вітаємо {name}, ви змогли подвоїти ваш депозит з {deposit} до {balance}.</h2>
      <ButtonAgain />
    </div>
  );
}