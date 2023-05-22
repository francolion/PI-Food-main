import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  filterSearchBar,
  getRecipesByQuery,
  getAllRecipes,
} from "../../redux/actions";
import style from "./SearchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    if (!value) dispatch(getAllRecipes());
    setName(value.toLowerCase());
    dispatch(filterSearchBar(name));
  };

  /*   const handleSubmit = () => {
    if (name) {
      dispatch(getRecipesByQuery(name));
      setName("");
    }
  }; */

  return (
    <input
      type="text"
      className={style.inputSearch}
      placeholder="Search"
      onChange={handleChange}
    />
  );
};

export default SearchBar;
