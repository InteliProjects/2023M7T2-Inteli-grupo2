const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decodedToken = jwt.verify(token, 'secreto');

    req.userId = decodedToken.loginId;
    req.adminStatus = decodedToken.adminStatus;
    req.email = decodedToken.email;

    next();
    
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

module.exports = authenticateToken;