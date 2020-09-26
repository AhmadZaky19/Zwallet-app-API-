const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../Configs/dbMySql");

const authModel = {
  register: (body) => {
    return new Promise((resolve, reject) => {
      const checkUsername = "SELECT username FROM users WHERE username = ?";
      db.query(checkUsername, [body.username], (err, data) => {
        if (data.length) {
          reject({ msg: "Username Already Exist" });
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              reject(err);
            }
            const { password } = body;
            bcrypt.hash(password, salt, (err, hashedPassword) => {
              if (err) {
                reject(err);
              }
              const newBody = { ...body, password: hashedPassword };
              const qs = "INSERT INTO users SET ?";
              db.query(qs, newBody, (err, data) => {
                if (!err) {
                  resolve(data);
                } else {
                  reject(err);
                }
              });
            });
          });
        }
      });
    });
  },
  login: (body) => {
    return new Promise((resolve, reject) => {
      const qs = "SELECT email, password, FROM users WHERE email=?";
      db.query(qs, body.email, (err, data) => {
        if (!err) {
          if (data.length) {
            bcrypt.compare(body.password, data[0].password, (error, result) => {
              if (!result) {
                reject({ msg: "Wrong Password" });
              } else if (result === true) {
                const { name, email } = body;
                const payload = {
                  name,
                  email,
                };
                const token = jwt.sign(payload, process.env.SECRET_KEY);
                const msg = "Login Success";
                resolve({ msg, token });
              } else {
                reject(error);
              }
            });
          } else {
            const msg = "Wrong Username";
            reject({ msg, err });
          }
        } else {
          reject(err);
        }
      });
    });
  },
  createPin: (id, body) => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          reject(err);
        }
        const { pin } = body;
        bcrypt.hash(pin, salt, (err, hashedPin) => {
          if (err) {
            reject(err);
          }
          const newBody = { ...body, pin: hashedPin };
          const qs = `INSERT INTO users SET ? WHERE users.id= ${id}`;
          db.query(qs, newBody, (err, data) => {
            if (!err) {
              resolve(data);
            } else {
              reject(err);
            }
          });
        });
      });
    });
  },
};

module.exports = authModel;
