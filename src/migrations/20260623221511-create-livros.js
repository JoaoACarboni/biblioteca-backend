'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('livros', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      titulo: { type: Sequelize.STRING, allowNull: false },
      autor: { type: Sequelize.STRING, allowNull: false },
      editora: { type: Sequelize.STRING, allowNull: false },
      ano_publicacao: { type: Sequelize.INTEGER, allowNull: false },
      categoria: { type: Sequelize.STRING, allowNull: false },
      isbn: { type: Sequelize.STRING, allowNull: false, unique: true },
      quantidade_total: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
      quantidade_disponivel: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
      status: { type: Sequelize.ENUM('disponivel', 'indisponivel'), defaultValue: 'disponivel' },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('livros');
  }
};