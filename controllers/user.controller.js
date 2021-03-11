const mongoose = require('mongoose');
const passport = require('passport');
const nodemailer = require('nodemailer'); 
// const {v4 : uuidv4} = require('uuid') ;
const _ = require('lodash');

const User = mongoose.model('User');
const UserProfile = mongoose.model('upsertUserProfile');

module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.is_admin = false;
    user.is_staff = true;
    user.is_active = true;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }
    });
}

module.exports.authenticate = (req, res, next) => 
{
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) =>
{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email','is_active','is_staff','is_admin']) });
        }
    );
}

module.exports.upsertUserProfile= (req, res, next) =>
{   
    var userPro = new UserProfile();
    userPro.userid = req.body.userID
    userPro.address = req.body.address;
    userPro.mobile = req.body.mobile;
    userPro.alternativeNo = req.body.alternativeNo;
    userPro.profileImage = 'http://localhost:3000/images/' + req.file.filename
    if(!req.file) {
        res.status(500);
        return next(err);
      }
    userPro.save((err, doc) => {
        if (!err)
            res.send(doc);
        else 
            return next(err);
    });  
    // res.json({ fileUrl: 'http://localhost:3000/images/' + req.file.filename });
}

module.exports.forgotpassword= (req, res, next) =>
{   
    let mailTransporter = nodemailer.createTransport({ 
        service: 'gmail', 
        auth: { 
            user: 'testusr5055@gmail.com', 
            pass: 'james_bon007'
        } 
    }); 

    let mailDetails = { 
        from: 'testusr5055@gmail.com', 
        to: req.body.email, 
        subject: 'Verification email from Project Management System.', 
        html: '<h1>Verification Email</h1><br><a>http://localhost:4200/uid</a><p>Get your <b>Account</b> Back!</p>'
    }; 

    mailTransporter.sendMail(mailDetails, function(err, data) { 
        if(err) { 
            res.send('Error Occurs') 
        } else { 
            res.send('Email sent successfully');
        } 
    }); 
}
