// позволяет отправлять любые виды запросов с любых доменов
function cors(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Expose-Headers', 'Content-Disposition')

  // Добавляем заголовок Allow в ответ на OPTIONS-запрос
  if (req.method === 'OPTIONS') {
    res.header('Allow', 'GET, PUT, PATCH, POST, DELETE')
    res.status(200).end()
  } else {
    next()
  }
}

module.exports = cors 
