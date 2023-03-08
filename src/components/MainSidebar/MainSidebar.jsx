import style from "./MainSidebar.module.css";

export default function MainSidebar({ arr }) {
  return (
    <aside className={style.aside}>
      <h2 className={style.title}> Результати: </h2>
      <ul>
        {arr.map((el, idx) => (
          <li key={idx}>
            <span>{Object.keys(el)} : {Object.values(el)} $</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
