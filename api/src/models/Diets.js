const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Diets', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true,
        allowNull:false,
    },
    name: {
        type: DataTypes.ENUM(
          'gluten free',
          'ketogenic',
          'dairy free',
          'vegan',
          'lacto ovo vegetarian',
          'pescatarian',
          'paleolithic',
          'fodmap friendly',
          'primal',
          'whole 30',
          ''
        ),
      },
  });
};