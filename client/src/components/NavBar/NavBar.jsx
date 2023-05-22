import { NavLink } from "react-router-dom";
import style from "./NavBar.module.css";
import { itemsNav } from "./navItems";
import ItemNavBar from "./ItemNavBar";
import SearchBar from "../SearchBar/SearchBar";
import logo from "../../assets/logo.png";

const NavBar = () => {
  return (
    <div className={style.mainContainer}>
      <div className={style.logoContainer}>
        <img src={logo} alt="logo" />
      </div>
      <div className={style.nav}>
        {itemsNav.map((item, index) => {
          return <ItemNavBar item={item} key={index} />;
        })}
      </div>
      <div className={style.searchContainer}>
        <SearchBar />
      </div>
    </div>
  );
};
export default NavBar;
