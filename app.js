require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./src/routes/authRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const livroRoutes = require('./src/routes/livroRoutes');
const leitorRoutes = require('./src/routes/leitorRoutes');
const emprestimoRoutes = require('./src/routes/emprestimoRoutes');
const swagger = require('./src/swagger');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/livros', livroRoutes);
app.use('/api/leitores', leitorRoutes);
app.use('/api/emprestimos', emprestimoRoutes);

swagger(app);

app.get('/', (req, res) => res.json({ message: 'API Biblioteca funcionando!' }));

module.exports = app;