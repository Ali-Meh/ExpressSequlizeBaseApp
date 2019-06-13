const bcrypt = require("bcrypt");

exports.hash = (password) => {
    return new Promise(function (resolve, reject) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) reject(err);
            bcrypt.hash(password, salt, function (err, hash) {
                if (err) reject(err);
                resolve(hash);
            });
        });
    })
};
