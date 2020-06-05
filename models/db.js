const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./models/db.json')
const db = low(adapter)

db.defaults({ messages: [], products: [], skills: []})
    .write()


module.exports = db