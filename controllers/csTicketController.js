const _ = require("lodash");
var { csTicket } = require('../dbDocuments/csTicket');

const csTicketControllers = {
  //store new message in ticket schema
  addTicket: (req, res, next) => {
    var body = _.pick(req.body, ["message"]);
    _.set(body, 'createdBy', req.user._id)
    var csticket = new csTicket(body);
    csticket.save().then((doc) => {
      res.send(doc);
    }).catch((error) => {
      res.status(400).send({ 'Error': error });
    })
  },


  getTickets: (req, res, next) => {

    //verification admin  role
    if (req.user.role === 'admin' || req.user.role === 'Admin') {
      csTicket.find().populate({ path: 'createdBy', select: '_id firstName lastName' }).exec((err, doc) => {
        if (err) {
          res.status(400).send({ 'Error': err })
        }
        res.send(doc);
      })
    } else {
      res.status(401).send({ 'Error': 'Unauthorized user' })
    }
  },



};

module.exports = csTicketControllers;