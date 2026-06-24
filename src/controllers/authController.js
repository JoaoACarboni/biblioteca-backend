const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(401).json({ erro: 'Credenciais inválidas' });

    if (usuario.status === 'inativo')
      return res.status(401).json({ erro: 'Usuário inativo' });

    const senhaValida = usuario.verificarSenha(senha);
    if (!senhaValida) return res.status(401).json({ erro: 'Credenciais inválidas' });

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, tipo: usuario.tipo },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.json({
      token,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, tipo: usuario.tipo }
    });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro interno', detalhe: err.message });
  }
};

const cadastrar = async (req, res) => {
  try {
    const { nome, email, senha, tipo } = req.body;

    const existe = await Usuario.findOne({ where: { email } });
    if (existe) return res.status(400).json({ erro: 'E-mail já cadastrado' });

    const usuario = await Usuario.create({ nome, email, senha, tipo });
    return res.status(201).json({
      id: usuario.id, nome: usuario.nome, email: usuario.email, tipo: usuario.tipo
    });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro interno', detalhe: err.message });
  }
};

module.exports = { login, cadastrar };