const jwt = require('jsonwebtoken');

const autenticar = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ erro: 'Token não fornecido' });

  const [, token] = authHeader.split(' ');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch {
    return res.status(401).json({ erro: 'Token inválido' });
  }
};

const autorizar = (...tipos) => (req, res, next) => {
  if (!tipos.includes(req.usuario.tipo)) {
    return res.status(403).json({ erro: 'Acesso negado' });
  }
  next();
};

module.exports = { autenticar, autorizar };