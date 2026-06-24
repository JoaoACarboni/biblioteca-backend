'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Livro extends Model {
    static associate(models) {
      Livro.hasMany(models.Emprestimo, { foreignKey: 'livro_id' });
    }
  }

  Livro.init({
    titulo: DataTypes.STRING,
    autor: DataTypes.STRING,
    editora: DataTypes.STRING,
    ano_publicacao: DataTypes.INTEGER,
    categoria: DataTypes.STRING,
    isbn: DataTypes.STRING,
    quantidade_total: DataTypes.INTEGER,
    quantidade_disponivel: DataTypes.INTEGER,
    status: DataTypes.ENUM('disponivel', 'indisponivel')
  }, {
    sequelize,
    modelName: 'Livro',
    tableName: 'livros'
  });

  return Livro;
};