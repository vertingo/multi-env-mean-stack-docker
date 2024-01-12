const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema(
    {
        index: {
            type: String,
            required: true,
        },
        gains: {
            type: String,
            required: true,
            minlength: 2
        },
        date_used: {
            type: Date,
            required: true
        },
        // date_expired: {
        //     type: Date,
        //     required: true
        // },
        isUsed: {
            type: Boolean,
            required: true
        },
        code: {
            type: Number,
            required: true,
        },
        isServed: {
            type: Boolean,
            required: true
        }
    }
);

exports.TicketSchema = TicketSchema;

Ticket = mongoose.model('Ticket', TicketSchema );
 exports.Ticket = Ticket;