const mongoose = require('mongoose');
const { User } = require('./users');

var csTicketSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

var csTicket = mongoose.model("csTicket", csTicketSchema);

module.exports = {
    csTicket
};