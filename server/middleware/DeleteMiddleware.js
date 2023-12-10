const fs = require('fs').promises
const path = require('path')

class DeleteMiddleware {
  async deleteFile(file) {
    const filepath = this.getPath(file)
    try {
      if (file.type === 'dir') {
        await fs.rmdir(filepath, { recursive: true })
      } else {
        await fs.unlink(filepath)
      }
    } catch (error) {
      console.error(`Ошибка при удалении файла/папки: ${error.message}`)
      throw error
    }
  }
  getPath(file) {
    return path.join(process.env.filePath, file.path)
  }
}

module.exports = new DeleteMiddleware() 
