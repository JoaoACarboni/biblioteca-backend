'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('emprestimos', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      leitor_id: {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'leitores', key: 'id' },
        onUpdate: 'CASCADE', onDelete: 'RESTRICT'
      },
      livro_id: {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'livros', key: 'id' },
        onUpdate: 'CASCADE', onDelete: 'RESTRICT'
      },
      data_emprestimo: { type: Sequelize.DATEONLY, allowNull: false },
      data_prevista_devolucao: { type: Sequelize.DATEONLY, allowNull: false },
      data_real_devolucao: { type: Sequelize.DATEONLY },
      status: {
        type: Sequelize.ENUM('em_aberto', 'devolvido', 'atrasado'),
        defaultValue: 'em_aberto'
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('emprestimos');
  }
};