const authModel = require("../Models/auth");
const formResponse = require("../Helpers/Forms/formResponse");

const authController = {
  register: (req, res) => {
    authModel
      .register(req.body)
      .then((data) => {
        const responseData = {
          msg: "Register Succses",
        };
        formResponse.success(res, responseData);
      })
      .catch((error) => {
        formResponse.error(res, error);
      });
  },
  login: (req, res) => {
    authModel
      .login(req.body)
      .then((data) => {
        formResponse.success(res, data);
      })
      .catch((err) => {
        formResponse.error(res, err);
      });
  },
  createPin: (req, res) => {
    authModel
      .createPin(req.params.id, req.body)
      .then((data) => {
        formResponse.success(res, data);
      })
      .catch((err) => {
        formResponse.error(res, err);
      });
  },
};

module.exports = authController;
