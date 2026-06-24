const express = require('express');
const router = express.Router();
const { listar, buscarPorId, criar, registrarDevolucao, verificarAtrasados } = require('../controllers/emprestimoController');
const { autenticar, autorizar } = require('../middlewares/auth');

router.use(autenticar);

router.get('/', listar); // todos os perfis (leitor vê só os seus)
router.get('/atrasados', autorizar('administrador', 'bibliotecario'), verificarAtrasados);
router.get('/:id', autorizar('administrador', 'bibliotecario'), buscarPorId);
router.post('/', autorizar('administrador', 'bibliotecario'), criar);
router.patch('/:id/devolver', autorizar('administrador', 'bibliotecario'), registrarDevolucao);

module.exports = router;