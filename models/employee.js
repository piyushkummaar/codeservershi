const mongoose = require('mongoose');
var userSchema = new mongoose.Schema({

    ClientName:{type:String},
   // position:{type:String},
    ClientEmail:{type:String},
     ClientSkype:{type:String},
     ServerDetail:{type:String},
   // salary:{type:Number}
});
mongoose.model('Employee', userSchema);