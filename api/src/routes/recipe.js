const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipesRouter = Router();
const {getRecipesById} = require('../controllers/recipes/getRecipeById');
const getRecipesByQuery = require('../controllers/recipes/getRecipeByQuery');
const postRecipes=require('../controllers/recipes/postRecipe');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
recipesRouter.get('/:idRecipe', (req,res) =>{
getRecipesById(req,res);
})
recipesRouter.get('/', (req,res)=>{
    getRecipesByQuery(req,res);
})
recipesRouter.post('/',(req,res)=>{
postRecipes(req,res);
})



module.exports = recipesRouter;