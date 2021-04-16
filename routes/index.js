var express = require('express');
var router = express.Router();

const _ = require("lodash");

var UserControllers = require ('../controllers/UserControllers');
var csTicketControllers = require('../controllers/csTicketController');


router.get('/', function(req, res, next) {
  res.send('Welcome to hompepage');
});

//Auth
var {authenticate} = require('./authenticate');


/* POST create user. */
router.post('/createuser', UserControllers.createUser);

/** POST login  */
router.post('/login', UserControllers.login);



/** POST login  */
router.post('/userUpdate', authenticate, UserControllers.updateUser);



/* POST user validation. */
router.post('/addTicket', authenticate, csTicketControllers.addTicket);



/** Get Tickets by admin  */
router.get('/getTickets', authenticate, csTicketControllers.getTickets);





module.exports = router;
