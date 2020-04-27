const db = require('./../Database/database')
const ls = require('local-storage')

module.exports.getUFO = (req, res) => {
    if (!ls.get('name')) {
        res.redirect('/login');
    }
    console.log(ls.get('name'))
    res.render('Screen/UFOScreen', {});
}
module.exports.getMark = (req, res) => {
    if (!ls.get('name')) {
        res.redirect('/login');
    }
    console.log(ls.get('name'))
    res.render('Screen/MarketScreen', {});

}
module.exports.win = (req, res) => {
    res.render('Screen/Win', {});
}