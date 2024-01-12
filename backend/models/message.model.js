const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
    {
        
        title: {
            type: String,
            required: true,
            minlength: 2
        },
        email: {
            type: String,
            required: true,
            minlength: 2
        },
        created_date: {
            type: Date,
            default: Date.now,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        subject: {
            type: String,
            required: true,
        },
        isClosed: {
            type: Boolean,
        }
    }
);

exports.MessageSchema = MessageSchema;

Message = mongoose.model('Message', MessageSchema );
 exports.Message = Message;