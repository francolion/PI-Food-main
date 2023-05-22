import { useDispatch } from "react-redux";
import {
  filterByName,
  filterByHealthScore,
  filterByDiets,
  deleteFilters,
  filterByOrigin,
} from "../../redux/actions";
import style from "./Filters.module.css";

export const Filters = (props) => {
  const dispatch = useDispatch();
  const handlerFilterByName = (event) => {
    dispatch(filterByName(event.target.value));
  };
  const handlerFilterByHealthScore = (event) => {
    dispatch(filterByHealthScore(event.target.value));
  };

  const handlerFilterByDiets = (event) => {
    dispatch(filterByDiets(event.target.value));
  };

  const handlerFilterByOrigin = (event) => {
    dispatch(filterByOrigin(event.target.value));
  };

  const handlerResetFilters = () => {
    document.getElementById("diet").value = "all";
    document.getElementById("origin").value = "Filter by Origin";
    document.getElementById("alfabetico").value = "Order by A-Z";
    document.getElementById("healtscore").value = "Order by HealtScore";
    dispatch(deleteFilters());
  };

  return (
    <div className={style.filterContainer}>
      <select
        defaultValue="all"
        id="diet"
        onChange={handlerFilterByDiets}
        className={style.selectFilter}
      >
        <option disabled value="all" className={style.optionSelect}>
          Filter by Type
        </option>
        {props.allDiets.map((diet) => (
          <option
            key={diet.id}
            value={diet.name}
            className={style.optionSelect}
          >
            {diet.name}
          </option>
        ))}
      </select>

      <select
        defaultValue="Filter by Origin"
        id="origin"
        onChange={handlerFilterByOrigin}
        className={style.selectFilter}
      >
        <option disabled value="Filter by Origin">
          Filter by Origin
        </option>
        <option value="DataBase">Data Base</option>
        <option value="API">API</option>
      </select>

      <select
        defaultValue="Order by A-Z"
        id="alfabetico"
        onChange={handlerFilterByName}
        className={style.selectFilter}
      >
        <option disabled value="Order by A-Z">
          Order by A-Z
        </option>
        <option value="ascendente">Ascendente</option>
        <option value="descendente">Descendente</option>
      </select>

      <select
        defaultValue="Order by HealtScore"
        id="healtscore"
        onChange={handlerFilterByHealthScore}
        className={style.selectFilter}
      >
        <option disabled value="Order by HealtScore">
          Order by HealtScore
        </option>
        <option value="ascendente">Ascendente</option>
        <option value="descendente">Descendente</option>
      </select>

      <button onClick={handlerResetFilters} className={style.buttonReset}>
        Reset Filters
      </button>
    </div>
  );
};

export default Filters;
