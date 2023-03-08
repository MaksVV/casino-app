import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import ButtonAgain from "../ButtonAgain/ButtonAgain";
import { getName, getDeposit, getBalance } from "../../redux/userSlice";
import style from "./Header.module.css";

export default function Header() {
  const name = useSelector(getName);
  const deposit = useSelector(getDeposit);
  const balance = useSelector(getBalance);
  
  return (
    <header className={style.header}>
      <div className={style.logo}>
        <Link to="/main">
          <img src={require("../../images/logo.png")} alt="logo" />
        </Link>
      </div>
      <div className={style.info}>
      <img src={require("../../images/chips.png")} alt="chips" />
      <div>
        <p>{name}</p>
        <p><span>Депозит:</span> {deposit} $</p>
      </div>
      </div>
      <div className={style.balance}>
        <p>Баланс</p>
        <span> {balance} $</span>
      </div>
      <ButtonAgain />
    </header>
  );
}