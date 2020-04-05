const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./Database/db.json')
const db = low(adapter)
module.exports = db;