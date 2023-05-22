import style from "./Card.module.css";
import { useHistory } from "react-router-dom";

const Card = ({ title, image, description, id }) => {
  const dietString = description.join(" ");
  const history = useHistory();
  const handleButton = () => {
    history.push(`/detail/${id}`);
  };
  return (
    <div className={style.card}>
      <div className={style.titleContainer}>
        <span className={style.title}>{title}</span>
      </div>

      <img src={image} alt="image" width="300px" height="200px" />
      <div className={style.description}>{dietString}</div>
      <div className={style.footer}>
        <button className={style.button} onClick={handleButton}>
          View details
        </button>
      </div>
    </div>
  );
};
export default Card;
