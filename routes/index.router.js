const express = require('express');
const router = express.Router();
const ctrlEmployee = require('../controllers/employeeController')
const ctrlUser = require('../controllers/user.controller');
const ctrlAdmin = require('../controllers/admin.controller');
const jwtHelper = require('../config/jwtHelper');

// User

router.get('/employees',ctrlEmployee.employee);
router.get('/get/:id',ctrlEmployee.getclientrecord);
router.put('/update/:id',ctrlEmployee.updateemployee);
router.delete('/delete/:id',ctrlEmployee.deleteemployee)
router.post('/employeepost', ctrlEmployee.employeepost);
router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);

// Admin
router.get('/home', ctrlAdmin.adminHome);
// router.get('/delete',);
module.exports = router;



