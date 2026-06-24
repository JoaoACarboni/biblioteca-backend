const express = require('express');
const router = express.Router();
const { listar, buscarPorId, criar, atualizar, excluir } = require('../controllers/livroController');
const { autenticar, autorizar } = require('../middlewares/auth');

router.use(autenticar);

router.get('/', listar);
router.get('/:id', buscarPorId);
router.post('/', autorizar('administrador', 'bibliotecario'), criar);
router.put('/:id', autorizar('administrador', 'bibliotecario'), atualizar);
router.delete('/:id', autorizar('administrador'), excluir);

module.exports = router;