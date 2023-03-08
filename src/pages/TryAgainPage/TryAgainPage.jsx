import { useSelector } from "react-redux";

import ButtonAgain from "../../components/ButtonAgain/ButtonAgain";
import { getName, getDeposit } from "../../redux/userSlice";
import style from "./TryAgainPage.module.css"

export default function TryAgainPage() {
  const name = useSelector(getName);
  const deposit = useSelector(getDeposit);

  return (
    <div className={style.again}>
      <h2> {name}, ви не змогли подвоїти ваш депозит з {deposit} $, можливо наступного разу вам пощастить.</h2>
      <ButtonAgain />
    </div>
  );
}