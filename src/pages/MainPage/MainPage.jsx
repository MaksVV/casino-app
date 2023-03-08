import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getResultGame } from "../../redux/gameSlice";

import Header from "../../components/Header/Header";
import MainSidebar from "../../components/MainSidebar/MainSidebar";
import style from "./MainPage.module.css";

export default function MainPage() {
  const result = useSelector(getResultGame);

  return (
    <>
      <Header />
      <div className={style.field}>
        <div className={style.games}>
          <h2>Доступні ігри</h2>
          <ul>
            <li>
              <Link to={"/door"}>
                <h3>Вгадай двері</h3>
                <img src={require("../../images/doors.png")} alt="door" />
              </Link>
            </li>
            <li>
              <Link to={"/number"}>
                <h3>Вгадай число</h3>
                <img
                  src={require("../../images/guessnumber.png")}
                  alt="number"
                />
              </Link>
            </li>
            <li>
              <Link to={"/coin"}>
                <h3>Монетка</h3>
                <img src={require("../../images/coins.png")} alt="coin" />
              </Link>
            </li>
          </ul>
          <div className={style.goal}>
            <h3>Мета гри:</h3>
            <p>Подвоїти початковий депозит, граючи в ігри</p>
          </div>
        </div>
        <MainSidebar arr={result} />
      </div>
    </>
  );
}
