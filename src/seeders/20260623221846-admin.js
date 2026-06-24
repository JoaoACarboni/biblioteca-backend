'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('usuarios', [{
      nome: 'Administrador',
      email: 'admin@biblioteca.com',
      senha: await bcrypt.hash('admin123', 10),
      tipo: 'administrador',
      status: 'ativo',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('usuarios', { email: 'admin@biblioteca.com' });
  }
};