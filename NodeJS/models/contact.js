//create schema for Contact model

//import mongo
const mongoose = require('mongoose');

const schema = mongoose.Schema;

const ContactSchema =new schema({

    
    contactname:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    }
});


const ContactModel = mongoose.model('Contact', ContactSchema);


/*var usercontact = new ContactModel({first_name:"Saad",last_name:"Ibrahim",phone:"01025301525"});

usercontact.save(function (err) {
    if (err) return handleError(err)
    else console.log("Done its Save ");
    // saved!
  });*/

 


//perform schema as model name "Contact" and its schema
const Contact = module.exports = ContactModel
