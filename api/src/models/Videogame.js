const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    Id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    released : {
      type: DataTypes.STRING
    },
    rating : {
      type: DataTypes.FLOAT
    },
    platforms : {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    }
  });
};
