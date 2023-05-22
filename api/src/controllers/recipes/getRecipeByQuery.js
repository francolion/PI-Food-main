const { Recipe } = require("../../db");
const { Op } = require("sequelize");
const axios = require("axios");
require("dotenv").config();
const { API_URL, API_KEY } = process.env;

const getRecipesByQuery = async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      const recetas = await Recipe.findAll();
      const dbRes = await Promise.all(
        recetas.map(async (receta) => {
          const dietas = await receta.getDiets();
          const dietasString = dietas.map((dieta) => dieta.name);
          return { ...receta.toJSON(), diets: dietasString };
        })
      );
      // if (dbRes) return res.status(200).json(dbRes);

      const response = await axios(
        `${API_URL}/complexSearch?apiKey=${API_KEY}&&number=100&&addRecipeInformation=true&&instructionsRequired=true`
      );
      const recipeDetail = response.data.results.map((elemento) => {
        return {
          id: elemento.id,
          name: elemento.title,
          image: elemento.image,
          healthScore: elemento.healthScore,
          summary: elemento.summary,
          diets: elemento.diets,
          steps: elemento.analyzedInstructions[0]?.steps.map((element) => {
            return {
              number: element.number,
              step: element.step,
            };
          }),
        };
      });
      const infTotal = dbRes.concat(recipeDetail);

      return res.status(200).json(infTotal);
    }
    const recetas = await Recipe.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
    });
    const dbRes = await Promise.all(
      recetas.map(async (receta) => {
        const dietas = await receta.getDiets();
        const dietasString = dietas.map((dieta) => dieta.name);
        return { ...receta.toJSON(), diets: dietasString };
      })
    );
    if (dbRes) return res.status(200).json(dbRes);
    const apiRes = await axios(
      `${API_URL}/complexSearch?apiKey=${API_KEY}&&titleMatch=${name}&&addRecipeInformation=true&&instructionsRequired=true`
    );
    const data = apiRes.data;
    if (!data) {
      res.status(200).json(dbRes);
    }
    const recipeDetail = data.results.map((elemento) => {
      return {
        id: elemento.id,
        name: elemento.title,
        image: elemento.image,
        healthScore: elemento.healthScore,
        summary: elemento.summary,
        diets: elemento.diets,
        steps: elemento.analyzedInstructions[0]?.steps.map((element) => {
          return {
            number: element.number,
            step: element.step,
          };
        }),
      };
    });
    const infTotal = dbRes.concat(recipeDetail);

    if (infTotal.length < 1)
      throw new Error(`No existe recetas que incluyan ${name}`);
    res.status(200).json(infTotal);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = getRecipesByQuery;
