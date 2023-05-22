const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js')
const mainRouter = Router();
const recipesRouter = require('./recipe')
const dietsRouter = require('./diets')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
mainRouter.use('/recipes', recipesRouter);
mainRouter.use('/diets',dietsRouter);

module.exports = mainRouter;
