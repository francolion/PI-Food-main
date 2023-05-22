import React from "react";
import style from "../Pagination/Pagination.module.css";

const Pagination = (props) => {
  return (
    <div className={style.contain}>
      <button
        onClick={props.previousPage}
        disabled={props.currentPage === 1 || props.maxPages === 0}
        className={style.buttonPagination}
      >
        {"<"}
      </button>
      <span className={style.spanPagination}>
        {props.maxPages === 0 ? "0" : props.currentPage} de {props.maxPages}
      </span>
      <button
        onClick={props.nextPage}
        disabled={props.maxPages === 0 || props.currentPage === props.maxPages}
        className={style.buttonPagination}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
