import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createUser } from "../../redux/userSlice";
import style from "./RegistrationPage.module.css";

export default function RegistrationPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [deposit, setDeposit] = useState("");

  const addUser = () => {
    dispatch(
      createUser({
        name,
        deposit,
        balance: +deposit,
      })
    );
    navigate("/main", { replace: true });
    setName("");
    setDeposit("");
  };

  return (
    <div className={style.wrapper}>
      <div className={style.form}>
        <div className={style.logo}></div>
        <input
          type="text"
          className={style.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="off"
          placeholder="Ваше Ім’я"
        ></input>
        <input
          type="number"
          className={style.deposit}
          value={deposit}
          onChange={(e) => setDeposit(e.target.value)}
          autoComplete="off"
          placeholder="Початковий депозит"
        ></input>
        <button
          className={style.button}
          type="button"
          onClick={addUser}
          disabled={name === "" || deposit === "" || deposit <= 0}
        >
          Почати
        </button>
      </div>
    </div>
  );
}