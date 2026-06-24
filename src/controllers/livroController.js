    const { Op } = require('sequelize');
    const { Livro } = require('../models');

    const listar = async (req, res) => {
    try {
        const { titulo, autor, categoria, isbn, disponivel } = req.query;
        const where = {};

        if (titulo) where.titulo = { [Op.iLike]: `%${titulo}%` };
        if (autor) where.autor = { [Op.iLike]: `%${autor}%` };
        if (categoria) where.categoria = { [Op.iLike]: `%${categoria}%` };
        if (isbn) where.isbn = isbn;
        if (disponivel === 'true') where.status = 'disponivel';
        if (disponivel === 'false') where.status = 'indisponivel';

        const livros = await Livro.findAll({ where });
        res.json(livros);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
    };

    const buscarPorId = async (req, res) => {
    try {
        const livro = await Livro.findByPk(req.params.id);
        if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' });
        res.json(livro);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
    };

    const criar = async (req, res) => {
    try {
        const { titulo, autor, editora, ano_publicacao, categoria, isbn, quantidade_total } = req.body;

        const existe = await Livro.findOne({ where: { isbn } });
        if (existe) return res.status(400).json({ erro: 'ISBN já cadastrado' });

        const livro = await Livro.create({
        titulo, autor, editora, ano_publicacao, categoria, isbn,
        quantidade_total,
        quantidade_disponivel: quantidade_total,
        status: 'disponivel'
        });
        res.status(201).json(livro);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
    };

    const atualizar = async (req, res) => {
    try {
        const livro = await Livro.findByPk(req.params.id);
        if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' });

        const { titulo, autor, editora, ano_publicacao, categoria, isbn, quantidade_total } = req.body;
        await livro.update({ titulo, autor, editora, ano_publicacao, categoria, isbn, quantidade_total });

        res.json(livro);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
    };

    const excluir = async (req, res) => {
    try {
        const livro = await Livro.findByPk(req.params.id);
        if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' });

        await livro.destroy();
        res.json({ mensagem: 'Livro excluído com sucesso' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
    };

    module.exports = { listar, buscarPorId, criar, atualizar, excluir };