const express = require('express');
const router = express.Router();
const { listar, buscarPorId, criar, atualizar, excluir, historico } = require('../controllers/leitorController');
const { autenticar, autorizar } = require('../middlewares/auth');

router.use(autenticar);

router.get('/', autorizar('administrador', 'bibliotecario'), listar);
router.get('/:id', autorizar('administrador', 'bibliotecario'), buscarPorId);
router.get('/:id/historico', autorizar('administrador', 'bibliotecario'), historico);
router.post('/', autorizar('administrador', 'bibliotecario'), criar);
router.put('/:id', autorizar('administrador', 'bibliotecario'), atualizar);
router.delete('/:id', autorizar('administrador'), excluir);

module.exports = router;