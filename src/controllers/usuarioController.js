const { Usuario } = require('../models');

const listar = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ['senha'] }
    });
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const buscarPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      attributes: { exclude: ['senha'] }
    });
    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const atualizar = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });

    const { nome, email, senha, tipo, status } = req.body;
    await usuario.update({ nome, email, senha, tipo, status });

    res.json({ id: usuario.id, nome: usuario.nome, email: usuario.email, tipo: usuario.tipo, status: usuario.status });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const excluir = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });

    if (usuario.tipo === 'administrador') {
      return res.status(403).json({ erro: 'Não é possível excluir um administrador' });
    }

    await usuario.destroy();
    res.json({ mensagem: 'Usuário excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

module.exports = { listar, buscarPorId, atualizar, excluir };