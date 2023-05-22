import { useHistory } from "react-router-dom";
import style from "../LandingPage/LandingPage.module.css";
import image from "../../assets/fondoBotonLanding.png";

function LandingPage() {
  const history = useHistory();

  const handleClick = (event) => {
    history.push("/home");
  };
  return (
    <div className={style.landingContainer}>
      <button onClick={handleClick}>Acceder</button>
    </div>
  );
}
export default LandingPage;
