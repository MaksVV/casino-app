import style from "./Doors.module.css";

export default function Doors({ handleClick }) {
  return (
    <ul className={style.ul}>
      <li onClick={handleClick} className={style.door1}>1</li>
      <li onClick={handleClick} className={style.door2}>2</li>
      <li onClick={handleClick} className={style.door3}>3</li>
    </ul>
  );
}
