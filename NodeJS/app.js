//import modules
var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser")
var cors = require('cors');
var path = require('path');
//object from express;
var app = express();
app.use(cors());
app.use(express.json());
//import route file
const route = require('./routes/route');
//connect to mongodb
mongoose.connect('mongodb://localhost:27017/contactlist');

mongoose.connection.on('connected',()=>{
    console.log('Connected to database mongodb @ 27017');
    console.log(mongoose.Types.ObjectId('4edd40c86762e0fb12000003').valueOf());  

})

mongoose.connection.on('error',(err)=>{
    console.log('Connected not to database mongodb ' + err);
})




//port number
const port = 3000;
// body - parser
app.use(bodyparser.json());
//routes
app.use('/api',route);
// adding middleware - cors

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
 });


/*const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions)); 
*/


//static files
app.use(express.static(path.join(__dirname,'public')))

//testing server
app.get('/',(reg,res)=>{
    res.send('foobar')
})

app.listen(port,()=>{
    console.log("sever started at port "+ port);
})