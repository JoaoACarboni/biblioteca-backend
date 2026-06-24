'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Emprestimo extends Model {
    static associate(models) {
      Emprestimo.belongsTo(models.Leitor, { foreignKey: 'leitor_id' });
      Emprestimo.belongsTo(models.Livro, { foreignKey: 'livro_id' });
    }
  }

  Emprestimo.init({
    leitor_id: DataTypes.INTEGER,
    livro_id: DataTypes.INTEGER,
    data_emprestimo: DataTypes.DATEONLY,
    data_prevista_devolucao: DataTypes.DATEONLY,
    data_real_devolucao: DataTypes.DATEONLY,
    status: DataTypes.ENUM('em_aberto', 'devolvido', 'atrasado')
  }, {
    sequelize,
    modelName: 'Emprestimo',
    tableName: 'emprestimos'
  });

  return Emprestimo;
};