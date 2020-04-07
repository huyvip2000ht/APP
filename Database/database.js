const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./Database/db.json')
const db = low(adapter)
db.defaults({
    user: [],

    lesson: [
        { id: "1", question: [1, 2, 8, 5, 6], product: "cream" },
        { id: "2", question: [1, 2, 8, 5, 6], product: "cream" },
        { id: "3", question: [1, 2, 8, 5, 6], product: "cream" },
    ]


}).write();
module.exports = db;