const express = require('express');
const router = express.Router();
const { login, cadastrar } = require('../controllers/authController');
const { autenticar, autorizar } = require('../middlewares/auth');

router.post('/login', login);
router.post('/cadastrar', autenticar, autorizar('administrador'), cadastrar);

module.exports = router;