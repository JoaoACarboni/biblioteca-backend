'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      Usuario.hasOne(models.Leitor, { foreignKey: 'usuario_id' });
    }

    verificarSenha(senha) {
      return bcrypt.compareSync(senha, this.senha);
    }
  }

  Usuario.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    tipo: DataTypes.ENUM('administrador', 'bibliotecario', 'leitor'),
    status: DataTypes.ENUM('ativo', 'inativo')
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios',
    hooks: {
      beforeCreate: async (usuario) => {
        usuario.senha = await bcrypt.hash(usuario.senha, 10);
      },
      beforeUpdate: async (usuario) => {
        if (usuario.changed('senha')) {
          usuario.senha = await bcrypt.hash(usuario.senha, 10);
        }
      }
    }
  });

  return Usuario;
};