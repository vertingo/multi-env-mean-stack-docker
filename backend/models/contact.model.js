const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema(
    {
        
        lastname: {
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
        message: {
            type: String,
            required: true,
            minlength: 2
        },
        response: {
            type: String,
        },
        is_closed: {
            type: Boolean,
        },
        response_date: {
            type: Date
        },
    }
);

exports.ContactSchema = ContactSchema;

Contact = mongoose.model('Contact', ContactSchema );
 exports.Contact = Contact;