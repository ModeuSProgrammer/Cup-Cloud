const jwt = require('jsonwebtoken')

module.exports = function (roleID) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next()
    }
    try {
      const token = req.headers.authorization.split(' ')[1] //Bearer token
      if (!token) {
        return res.status(401).json({ message: 'Не авторизован' })
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      if (decoded.role !== roleID) {
        return res.status(403).json({ message: 'нет доступа' })
      }
      req.user = decoded
      next()
    }
    catch (error) {
      res.status(403).json({ message: 'Не авторизован' })
    }
  }
}
