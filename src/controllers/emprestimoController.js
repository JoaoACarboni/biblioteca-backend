const { Op } = require('sequelize');
const { Emprestimo, Leitor, Livro } = require('../models');

const listar = async (req, res) => {
  try {
    const { status, leitor_id, data_inicio, data_fim } = req.query;
    const where = {};

    if (status) where.status = status;
    if (leitor_id) where.leitor_id = leitor_id;
    if (data_inicio && data_fim) {
      where.data_emprestimo = { [Op.between]: [data_inicio, data_fim] };
    }

    // Leitor só vê seus próprios empréstimos
    if (req.usuario.tipo === 'leitor') {
      const leitor = await Leitor.findOne({ where: { usuario_id: req.usuario.id } });
      if (!leitor) return res.status(404).json({ erro: 'Leitor não encontrado' });
      where.leitor_id = leitor.id;
    }

    const emprestimos = await Emprestimo.findAll({
      where,
      include: [
        { model: Leitor, attributes: ['id', 'nome', 'cpf_ra'] },
        { model: Livro, attributes: ['id', 'titulo', 'autor', 'isbn'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(emprestimos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const buscarPorId = async (req, res) => {
  try {
    const emprestimo = await Emprestimo.findByPk(req.params.id, {
      include: [
        { model: Leitor, attributes: ['id', 'nome', 'cpf_ra'] },
        { model: Livro, attributes: ['id', 'titulo', 'autor', 'isbn'] }
      ]
    });
    if (!emprestimo) return res.status(404).json({ erro: 'Empréstimo não encontrado' });
    res.json(emprestimo);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const criar = async (req, res) => {
  try {
    const { leitor_id, livro_id, data_emprestimo, data_prevista_devolucao } = req.body;

    // Verifica leitor
    const leitor = await Leitor.findByPk(leitor_id);
    if (!leitor) return res.status(404).json({ erro: 'Leitor não encontrado' });
    if (leitor.status === 'inativo') return res.status(400).json({ erro: 'Leitor inativo não pode realizar empréstimo' });

    // Verifica livro
    const livro = await Livro.findByPk(livro_id);
    if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' });
    if (livro.quantidade_disponivel <= 0) return res.status(400).json({ erro: 'Livro indisponível' });

    // Cria empréstimo
    const emprestimo = await Emprestimo.create({
      leitor_id, livro_id, data_emprestimo, data_prevista_devolucao, status: 'em_aberto'
    });

    // Atualiza quantidade disponível
    const novaQtd = livro.quantidade_disponivel - 1;
    await livro.update({
      quantidade_disponivel: novaQtd,
      status: novaQtd === 0 ? 'indisponivel' : 'disponivel'
    });

    res.status(201).json(emprestimo);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const registrarDevolucao = async (req, res) => {
  try {
    const emprestimo = await Emprestimo.findByPk(req.params.id);
    if (!emprestimo) return res.status(404).json({ erro: 'Empréstimo não encontrado' });
    if (emprestimo.status === 'devolvido') return res.status(400).json({ erro: 'Livro já foi devolvido' });

    const data_real_devolucao = req.body.data_real_devolucao || new Date().toISOString().split('T')[0];
    await emprestimo.update({ status: 'devolvido', data_real_devolucao });

    // Atualiza quantidade disponível do livro
    const livro = await Livro.findByPk(emprestimo.livro_id);
    const novaQtd = livro.quantidade_disponivel + 1;
    await livro.update({
      quantidade_disponivel: novaQtd,
      status: 'disponivel'
    });

    res.json(emprestimo);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const verificarAtrasados = async (req, res) => {
  try {
    const hoje = new Date().toISOString().split('T')[0];

    // Atualiza status de atrasados automaticamente
    await Emprestimo.update(
      { status: 'atrasado' },
      {
        where: {
          status: 'em_aberto',
          data_prevista_devolucao: { [Op.lt]: hoje }
        }
      }
    );

    const atrasados = await Emprestimo.findAll({
      where: { status: 'atrasado' },
      include: [
        { model: Leitor, attributes: ['id', 'nome', 'cpf_ra'] },
        { model: Livro, attributes: ['id', 'titulo', 'autor'] }
      ]
    });

    res.json(atrasados);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

module.exports = { listar, buscarPorId, criar, registrarDevolucao, verificarAtrasados };