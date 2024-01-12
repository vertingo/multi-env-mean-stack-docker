const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
 

const EmployeeSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            minlength: 2,
            maxlength: 50
        },
        lastname: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50
        },
        username: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 2500
        },
        email: {
            type: String,
            required: true,
            minlength: 2
        },
        password: {
            type: String,
            required: true,
            minlength: 2
        },
        role: {
            type: String,
            enum: ['admin', 'employee']
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
        },
        isActive: {
            type: Boolean,
        }
    }
);



exports.EmployeeSchema = EmployeeSchema;

Employee = mongoose.model('Employee', EmployeeSchema );
 exports.Employee = Employee;