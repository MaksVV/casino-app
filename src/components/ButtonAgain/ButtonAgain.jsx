import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../redux/userSlice";
import { deleteResultGame } from "../../redux/gameSlice";
import "./ButtonAgain.module.css";

export default function ButtonAgain() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(deleteUser());
    dispatch(deleteResultGame());
  };

  return (
    <Link to="/">    
      <button type="button" onClick={handleClick}>
        Заново
      </button>
    </Link>
  );
}