const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const {TicketSchema} = require('./ticket.model');  

const UserSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            minlength: 2,
            maxlength: 50,
            match: [/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/]
        },
        lastname: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50,
            match: [/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/]
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
        },
        password: {
            type: String,
            required: true,
            minlength: 2
        },
        role: {
            type: String,
            enum: ['client', 'employee', 'admin']
        },
        birthday: {
            type: Date,
            required: true
        },
        register_date: {
            type: Date,
            default: Date.now,
            required: true
        },
        phonenumber: {
            type: Number,
            required: true,
            minlength: 3,
            maxlength: 50,
            match: [/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/]
            //pour faire des validations

            // validate(value) {
            //     if(value < 0){
            //         throw new Error('numero de telephone must be a positive number')
            //     }
            // }
        },
        adress: {
            type: String,
            minlength: 5,
            maxlength: 300,
            match: [/^[A-z0-9À-ž\s ,.'-]+$/]
        },
        isActive: {
            type: Boolean,
        },
        isGain: {
            type: Boolean,
        },
        googleId: {
            type: String
        },
        facebookId: {
            type: String
        },
        resetLink: {
            type: String,
            default: ''
        },
        gains: {
            type:  [TicketSchema]
        } 
    }
);

//unique validator
UserSchema.plugin(uniqueValidator);

exports.UserSchema = UserSchema;

User = mongoose.model('User', UserSchema );
 exports.User = User;