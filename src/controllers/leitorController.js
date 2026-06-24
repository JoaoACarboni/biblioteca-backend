const { Op } = require('sequelize');
const { Leitor, Emprestimo, Livro } = require('../models');

const listar = async (req, res) => {
  try {
    const { nome, cpf_ra } = req.query;
    const where = {};

    if (nome) where.nome = { [Op.iLike]: `%${nome}%` };
    if (cpf_ra) where.cpf_ra = { [Op.iLike]: `%${cpf_ra}%` };

    const leitores = await Leitor.findAll({ where });
    res.json(leitores);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const buscarPorId = async (req, res) => {
  try {
    const leitor = await Leitor.findByPk(req.params.id);
    if (!leitor) return res.status(404).json({ erro: 'Leitor não encontrado' });
    res.json(leitor);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const criar = async (req, res) => {
  try {
    const { nome, cpf_ra, email, telefone, endereco, usuario_id } = req.body;

    const existe = await Leitor.findOne({ where: { cpf_ra } });
    if (existe) return res.status(400).json({ erro: 'CPF/RA já cadastrado' });

    const leitor = await Leitor.create({ nome, cpf_ra, email, telefone, endereco, usuario_id, status: 'ativo' });
    res.status(201).json(leitor);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const atualizar = async (req, res) => {
  try {
    const leitor = await Leitor.findByPk(req.params.id);
    if (!leitor) return res.status(404).json({ erro: 'Leitor não encontrado' });

    const { nome, cpf_ra, email, telefone, endereco, status } = req.body;
    await leitor.update({ nome, cpf_ra, email, telefone, endereco, status });

    res.json(leitor);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const excluir = async (req, res) => {
  try {
    const leitor = await Leitor.findByPk(req.params.id);
    if (!leitor) return res.status(404).json({ erro: 'Leitor não encontrado' });

    await leitor.destroy();
    res.json({ mensagem: 'Leitor excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const historico = async (req, res) => {
  try {
    const leitor = await Leitor.findByPk(req.params.id);
    if (!leitor) return res.status(404).json({ erro: 'Leitor não encontrado' });

    const emprestimos = await Emprestimo.findAll({
      where: { leitor_id: req.params.id },
      include: [{ model: Livro, attributes: ['titulo', 'autor', 'isbn'] }],
      order: [['createdAt', 'DESC']]
    });

    res.json(emprestimos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

module.exports = { listar, buscarPorId, criar, atualizar, excluir, historico };