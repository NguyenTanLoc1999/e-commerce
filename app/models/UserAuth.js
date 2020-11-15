var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserAuthSchema = new Schema({
    googleId:{type:String,required:true},
    displayName:{type:String,required:true},
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    image:{type:String,required:true},
    createAt:{type:Date,default:Date.now},

});


module.exports = mongoose.model('UserAuth', UserAuthSchema);

