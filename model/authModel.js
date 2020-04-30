var db = require('./../Database/database')
const ls = require('local-storage')
const md5 = require('md5');
module.exports.loginGet = (req, res) => {

    res.render('login', {
        errArr: []
    })
}
module.exports.CreateGet = (req, res) => {
    res.render('users/create', {
        errArr: []
    })
}
module.exports.createPost = (req, res) => {
    var body = req.body;
    var email = body.email;
    var name = body.name;
    var password = md5(body.password);
    console.log(password);
    var career = body.career;
    var errArr = [];
    if (!email) {
        errArr.push("invalid email");
    }
    if (!name) {
        errArr.push("invalid name");
    }
    if (!password) {
        errArr.push("invalid password");
    }
    console.log(errArr)
    if (errArr.length > 0) {
        res.render('users/create', {
            errArr: errArr
        })
        return;
    }

    var qr = "SELECT * FROM users WHERE users.email= '" + email + "\'  AND users.password = \'" + password + "\'";
    console.log(qr);
    db.query(qr, (err, result) => {
        if (result.length > 0) {
            res.render('users/create', {
                errArr: ["already exist account"]
            });

            return;
        } else {
            qr = "INSERT INTO `users` (`id`, `name`, `email`, `password`, `career`) VALUES (NULL,'" +
                name + "', '" +
                email + "', '" +
                password + "', '" +
                career + "\')";
            db.query(qr, (err, result) => {
                if (err) throw err;
                console.log("insert 1 item to users");

            })

            res.redirect('login')
        }
    })


}
module.exports.loginPost = (req, res) => {
    var body = req.body;
    var email = body.email;
    var errArr = [];

    var password = md5(body.password);

    var qr = "SELECT * FROM users WHERE users.email= '" + email + "\'  AND users.password = \'" + password + "\'";
    console.log(qr);
    db.query(qr, (err, result) => {
        if (err || result.length == 0) {
            console.log('not found');
            res.render('login', {
                errArr: ["Account Invalid"]
            });
            return;
        };
        ls.set('name', "tiep");
        res.redirect('/');
    })
    login = true;


}
module.exports.home = (req, res) => {
    if (!ls.get('name')) {
        res.redirect('/login');
    } else {
        res.render('home');
    }


}
module.exports.logout = (req, res) => {
    ls.remove('name');
    res.redirect('/');
}