import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createRecipe, getAllDiets } from "../../redux/actions";
import { validate } from "./validation";
import { useHistory } from "react-router-dom";
import style from "../Form/Form.module.css";

const FormCreate = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const allDiets = useSelector((state) => state.allDiets);
  useEffect(() => {
    dispatch(getAllDiets());
  }, []);
  const [stepsNum, setStepsNum] = useState(2);
  const [states, setStates] = useState([]);
  const [data, setData] = useState({
    name: "",
    image:
      "https://st.depositphotos.com/1987177/3470/v/600/depositphotos_34700099-stock-illustration-no-photo-available-or-missing.jpg",
    summary: "",
    healthScore: 0,
    steps: [],
    diets: [],
  });
  const [errors, setErrors] = useState({
    name: "",
    image: "",
    summary: "",
    healthScore: "",
    diets: "",
  });
  const dietas = {
    1: "Gluten Free",
    2: "Ketogenic",
    3: "Dairy Free",
    4: "Vegan",
    5: "Lacto-Ovo Vegetarian",
    6: "Pescatarian",
    7: "Paleolithic",
    8: "Fodmap Friendly",
    9: "Primal",
    10: "Whole 30",
  };

  const handleChange = (event) => {
    console.log(event);
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
    setErrors(validate({ data }));
  };

  const submitHandler = (event) => {
    console.log("entra");
    event.preventDefault();
    setErrors(validate({ data }));
    if (Object.keys(errors).length === 0) {
      dispatch(createRecipe(data));
      window.alert("Receta creada Satisfactoriamente");
      history.push("/home");
    }
  };

  const handlerlistChange = (event) => {
    if (!data.diets.includes(event.target.value)) {
      setData({
        ...data,
        diets: [...data.diets, event.target.value],
      });
    }
  };

  const addstep = () => {
    setStepsNum(stepsNum + 1);
  };

  const removeDiet = (event) => {
    setData({
      ...data,
      diets: data.diets.filter((diet) => diet !== event.target.value),
    });
  };

  const handlerStepChange = (event) => {
    const { name, value } = event.target;
    const newstate = [...states];
    newstate[name - 1] = {
      number: name,
      step: value,
    };
    setStates(newstate);
    setData({
      ...data,
      steps: states,
    });
  };

  return (
    <div className={style.container}>
      <div className={style.divForm}>
        <div className={style.buttonContainer}>
          <button onClick={() => history.push("/home")}>Back</button>
        </div>
        <form onSubmit={submitHandler} className={style.formContainer}>
          <div>
            <b>Nombre: </b>
            <input
              name="name"
              placeholder="Ingrese el Nombre"
              type="text"
              autoComplete="off"
              onChange={handleChange}
              value={data.name}
            />
            {errors.name !== "" && <p className={style.p}>{errors.name}</p>}
          </div>
          <div>
            <b>Resumen de Plato: </b>
            <textarea
              name="summary"
              placeholder=" Resumen del plato"
              type="text"
              autoComplete="off"
              onChange={handleChange}
              value={data.summary}
            />
            {errors.summary !== "" && (
              <p className={style.p}>{errors.summary}</p>
            )}
          </div>
          <div>
            <b>HealthScore: </b>
            <input
              name="healthScore"
              placeholder="Ingrese un HealthScore"
              type="number"
              autoComplete="off"
              onChange={handleChange}
              max="100"
              min="1"
            />
            {errors.healthScore !== "" && (
              <p className={style.p}>{errors.healthScore}</p>
            )}
          </div>
          <div>
            <b>Imagen: </b>
            <input
              name="image"
              placeholder="Ingrese Url de la Imagen"
              type="text"
              autoComplete="off"
              onChange={handleChange}
              id="imageDataBase"
              accept="image/png, image/jpeg"
              //value={data.image}
            />
            {errors.image !== "" && <p className={style.p}>{errors.image}</p>}
          </div>
          <div>
            {Array.from({ length: stepsNum }).map((step, index) => (
              <div key={index}>
                <b>Paso: {index + 1}</b>
                <input
                  name={`${index + 1}`}
                  placeholder="Desciption"
                  onChange={handlerStepChange}
                  value={states[index]?.step}
                />
              </div>
            ))}
            <button onClick={addstep} type="button">
              Add Step
            </button>
          </div>

          <div>
            <b>Tipo de dieta: </b>
            <select defaultValue="Tipos de Dietas" onChange={handlerlistChange}>
              <option disabled>Tipos de Dietas</option>
              {allDiets.map((diet, index) => (
                <option key={index} value={diet.id}>
                  {diet.name}
                </option>
              ))}
            </select>
          </div>
          <div className={style.divDiet}>
            <ul>
              {data.diets.length > 0 &&
                data.diets.map((diet, index) => (
                  <li key={index} className={style.divDiet}>
                    <p>{dietas[diet]}</p>
                    <button
                      value={diet}
                      onClick={removeDiet}
                      className={style.btn}
                    >
                      <svg
                        viewBox="0 0 15 17.5"
                        height="17.5"
                        width="15"
                        xmlns="http://www.w3.org/2000/svg"
                        className={style.icon}
                      >
                        <path
                          transform="translate(-2.5 -1.25)"
                          d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z"
                          id="Fill"
                        ></path>
                      </svg>
                    </button>
                  </li>
                ))}
            </ul>
            {errors.diets !== "" && <p className={style.p}>{errors.diets}</p>}
          </div>

          <button type="submit">Crear Receta</button>
        </form>
      </div>
    </div>
  );
};

export default FormCreate;
