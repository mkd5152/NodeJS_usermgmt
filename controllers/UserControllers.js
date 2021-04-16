var _ = require("lodash");
var { mongoose } = require('../db/mongoose');
var { User } = require('../dbDocuments/users');


const UserControllers = {
  createUser: (req, res, next) => {
    var body = _.pick(req.body, ["firstName", "lastName", "email", "password", "role"]);
    _.set(body, 'email', body.email.toLowerCase())
    //foce the entries to the given choices
    if (body.role === 'admin' || body.role === 'user') {
      var user = new User(body);
      user.save().then(() => {
        res.status(200).send({ 'Success': 'Create user Successfully' })
      }).catch((e) => {
        res.status(400).send(e);
      })
    } else {
      res.status(401).send({ 'Error': 'Role has to be admin or user' })
    }
  },




  login: (req, res, next) => {
    var body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email.toLowerCase(), body.password).then((user) => {
      return user.generateAuthToken().then((token) => {
        res.header('token', token).send({
          token: token,
        });
      });
    }).catch((e) => {
      // console.log(e)
      res.status(401).send({
        message: 'Unauthorized User',
        error: e
      });
    });
  },


  updateUser: (req, res, next) => {

    // check for user entries then update the given one  
    if (req.body.firstName != null) {
      User.updateOne({ _id: req.user._id }, { $set: { firstName: req.body.firstName } }).then((doc) => {
        res.send({ 'token': doc })
      }).catch(err => {
        res.status(400).send(err.data)
      })
    }

    if (req.body.lastName != null) {
      User.updateOne({ _id: req.user._id }, { $set: { lastName: req.body.lastName } }).then((doc) => {
        res.send({ 'token': doc })
      }).catch(err => {
        res.status(400).send(err.data)
      })
    }


  }


}

module.exports = UserControllers;