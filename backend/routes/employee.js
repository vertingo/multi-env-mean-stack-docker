const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authorize');
const Role = require('../lib/role')
const EmployeeController = require('../controllers/employee');
const GainController = require('../controllers/gain');



//add employee
router.post("/", EmployeeController.postEmployee);

// get all employees
router.get("/", EmployeeController.getAllEmployees);

// //get user by id
// router.get('/:id', authorize([Role.Client,Role.Employee,Role.Admin]), UserController.getUserById);

// //delete user by id
// router.delete('/:id', authorize(Role.Admin), UserController.deleteUserById);

// //patch by id
// router.patch('/:id', authorize([Role.Client,Role.Employee,Role.Admin]), UserController.patchUserById)

// //post code gain
// router.post('/gain', authorize(Role.Client), GainController.gain);






module.exports = router; 