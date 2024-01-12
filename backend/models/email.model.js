const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema(
    {
        
        title: {
            type: String,
            required: true,
            minlength: 2
        },
        description: {
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
        }
    }
);

exports.EmailSchema = EmailSchema;

Email = mongoose.model('Email', EmailSchema );
 exports.Email = Email;