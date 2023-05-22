import { useSelector } from "react-redux";
import { useState } from "react";
import Card from "../Card/Card";
import style from "./RecipeContainer.module.css";
import Pagination from "../Pagination/Pagination";

const RecipesContainer = () => {
  const recipes = useSelector((state) => state.recipes);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const currentItemsPage = [...recipes].slice(
    (currentPage - 1) * itemsPerPage,
    (currentPage - 1) * itemsPerPage + itemsPerPage
  );
  const maxPages = Math.ceil(recipes.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const setToFirstPage = () => {
    setCurrentPage(1);
  };

  return (
    <div className={style.container}>
      <div className={style.pagination}>
        <Pagination
          currentPage={currentPage}
          nextPage={nextPage}
          previousPage={prevPage}
          maxPages={maxPages}
        />
      </div>
      <div className={style.recipeContainer}>
        {currentItemsPage.map((elemento) => (
          <Card
            key={elemento.id}
            title={elemento.name}
            image={elemento.image}
            description={elemento.diets}
            id={elemento.id}
          />
        ))}
      </div>
    </div>
  );
};
export default RecipesContainer;
