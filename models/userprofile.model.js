const mongoose = require('mongoose');

var userProfileSchema = new mongoose.Schema({
    userid:{
        type:String,
        required : true
    },  
    address:{
        type: String,
        required : true
    },
    mobile:{
        type: String,
        required : true
    },
    alternativeNo:{
        type: String,
        required : true
    },
    profileImage:{
        type: String,
        required : true
    },
    
    },{ timestamps: true});

mongoose.model('upsertUserProfile', userProfileSchema);