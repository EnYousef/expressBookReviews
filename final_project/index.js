const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
    if(req.session.authenticated){
        let token = req.session.authenticated['accessToken'];
        let res = jwt.verify(token,"access",(err, user)=>{
            if(!err){
                next();
            }else
                res.send(JSON.stringify({message:"Faild to verfiy token!"}));
        })
    }else
    res.send(JSON.stringify({message:"UR Not Login!"}))
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
