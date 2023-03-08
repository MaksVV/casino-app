import style from "./GameSidebar.module.css";

export default function GameSidebar({ arr }) {
  return (
    <aside className={style.aside}>
      <span> Минулі спроби: </span>
      <ul>
        {arr.map((el, idx) => (
          <li key={idx}>
            <span>{Object.keys(el)}: {Object.values(el)} $</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
