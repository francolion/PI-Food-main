import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getRecipeDetail, resetDetail } from "../../redux/actions";
import style from "../Detail/Detail.module.css";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const details = useSelector((state) => state.detailRecipe);
  const history = useHistory();
  useEffect(() => {
    dispatch(getRecipeDetail(id));
    return dispatch(resetDetail());
  }, []);
  const Diets = details.diets
    ?.map((diet) => diet.charAt(0).toUpperCase() + diet.slice(1))
    .join(" - ");

  return (
    <div className={style.container}>
      {Object.keys(details).length !== 0 ? (
        <>
          <div>
            <h1 className={style.title}>{`${details.id}. ${details.name} `}</h1>
          </div>

          <div className={style.recipeContainer}>
            <div className={style.recipe}>
              <div className={style.imageContainer}>
                <img src={details.image} alt={details.name} />
              </div>
              <div className={style.dietsContainer}>
                <h3 className={style.healthScore}>
                  Health Score: {details.healthScore}
                </h3>
                <h3> {Diets}</h3>

                <div className={style.summaryContainer}>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: details.summary,
                    }}
                  ></p>
                </div>
              </div>
            </div>
          </div>
          <div className={style.stepContainer}>
            <h3>Preparation: </h3>
            {details.steps?.map((step, index) => (
              <div key={index} className={style.step}>
                <div className={style.stepNumberContainer}>
                  <h4>{step.number}</h4>
                </div>
                <div className={style.stepDescription}>{step.step}</div>
              </div>
            ))}
          </div>
          <div>
            <button
              className={style.backButton}
              onClick={() => history.push("/home")}
            >
              Back
            </button>
          </div>
        </>
      ) : (
        <div>
          <p>LOADING</p>
        </div>
      )}
    </div>
  );
};

export default Details;
