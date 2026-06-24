const express = require('express');
const router = express.Router();
const { listar, buscarPorId, atualizar, excluir } = require('../controllers/usuarioController');
const { autenticar, autorizar } = require('../middlewares/auth');

router.use(autenticar);

router.get('/', autorizar('administrador'), listar);
router.get('/:id', autorizar('administrador'), buscarPorId);
router.put('/:id', autorizar('administrador'), atualizar);
router.delete('/:id', autorizar('administrador'), excluir);

module.exports = router;