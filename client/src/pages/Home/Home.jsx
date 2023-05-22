import RecipeContainer from "../../components/RecipeContainer/RecipeContainer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDiets, getAllRecipes } from "../../redux/actions";
import Filters from "../../components/Filters/Filters";
import setToFirstPage from "../../components/RecipeContainer/RecipeContainer";

const Home = () => {
  //cuando se monta , que despache la action
  // useEffect()           useDispatch()
  const allDiets = useSelector((state) => state.allDiets);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRecipes());
    dispatch(getAllDiets());
  }, []);
  return (
    <div>
      <Filters allDiets={allDiets} />
      <RecipeContainer />
    </div>
  );
};
export default Home;
