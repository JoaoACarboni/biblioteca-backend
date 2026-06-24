'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Leitor extends Model {
    static associate(models) {
      Leitor.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
      Leitor.hasMany(models.Emprestimo, { foreignKey: 'leitor_id' });
    }
  }

  Leitor.init({
    nome: DataTypes.STRING,
    cpf_ra: DataTypes.STRING,
    email: DataTypes.STRING,
    telefone: DataTypes.STRING,
    endereco: DataTypes.STRING,
    status: DataTypes.ENUM('ativo', 'inativo'),
    usuario_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Leitor',
    tableName: 'leitores'
  });

  return Leitor;
};