const { json } = require('body-parser');
const express = require('express');
const req = require('express/lib/request');
var mongoose = require("mongoose");
const  ObjectID = require('mongodb').ObjectId;
const router = express.Router();
const Contact = require('../models/contact');

//issues: No 'Access-Control-Allow-Origin' header is present on the requested resource.
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //res.header.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

  

// retrieving all contacts
router.get('/contacts',(req,res,next)=>{
    Contact.find(function(err,contacts){
       res.json(contacts);
   })
})

//add contact
router.post('/addcontact',(req,res,next)=>{
     let newcontact = new Contact({
        
        contactname:req.body.contactname,
        email:req.body.email,
        phone: req.body.phone,
        address:req.body.address
     });
     newcontact.save((err,contact)=>{
         if(err){
            console.log(err); 
            res.json({msg:'Failed to add contact'})
         }else{
             res.json({msg:' Contact added successfully '})
         }
     })
          
})
//delete contact ( id here as parameter)
router.delete('/deletecontact/:id',(req,res,next)=>{
    //var _id = mongoose.Types.ObjectId(req.params.id.trim()).valueOf();
    Contact.findByIdAndRemove({_id:req.params.id.trim()},function(err,result){
         if(err){
             res.json(err);
         }else{
             res.json(result);
             console.log(result);
         }
   })
})

router.put('/editcontact/:id',(req,res)=>{

    /*if(!isValidObjectId(req.params.id)){
        return res.status(400).send("No record with given id:" +req.params.id );
    }*/

    var contact = {
        contactname:req.body.contactname,
        email:req.body.email,
        phone: req.body.phone,
        address:req.body.address
    }
    console.log("first name is :"+req.params.id);
    var _id = mongoose.Types.ObjectId(req.params.id.trim()).valueOf(); 
    Contact.findByIdAndUpdate(_id,{$set:contact},{new:true},(err,doc)=>{
        if (!err) {res.send(doc)}
        else {console.log('Error in Empolyee Update :' + JSON.stringify(err,undefined,2));}
    });

});

module.exports = router ;