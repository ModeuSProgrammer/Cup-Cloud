const fs = require('fs').promises
const path = require('path')

// Для создания папок
class CreateDirMiddleware {
  async createDirServices(file) {
    const userDir = path.join(process.env.filePath, file.path)
    try {
      // Проверка, существует ли директория
      await fs.access(userDir)
    } catch (error) {
      // Если директория не существует, создаем её
      if (error.code === 'ENOENT') {
        await fs.mkdir(userDir)
      }
    }
  }
}

module.exports = new CreateDirMiddleware() 
