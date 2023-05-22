const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {getAllDiets}= require('../controllers/diets/getAllDiets')

const dietsRouter = Router();

dietsRouter.get('/', (req,res)=>{
    getAllDiets(req,res);
})
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = dietsRouter;