const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    let valid = users.filter(e => e['username'] === username);
    if(valid.length > 0)
        return true
    else
        return false
}

const authenticatedUser = (username,password)=>{ //returns boolean
    let user = users.filter(e => e['username'] === username && e['password'] === password);
    if(user.length > 0){
        return true;
    }
    return false;    
}


//only registered users can login
regd_users.post("/login", (req,res) => {
    let username = req.body.username;
    let password = req.body.password;
    if(password && username){
        if(!authenticatedUser(username, password))
            return res.status(200).json({message:"Register first plz!"});
        let accessToken = jwt.sign(
            {
                data:password
            },
            'access',
            { expiresIn: 60 * 60 }
        );
        req.session.authenticated = {
            accessToken,username
        }
        return res.status(200).json({message:"Login successful"});
    }
    else
        return res.status(200).json({message:"make sure to send all usernmae and password"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    books[req.params.isbn]['reviews'][req.session.authenticated['username']] = req.body.review;
    res.status(200).json({message:"added review successful"})
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    let isbn = req.params.isbn;
    if(isbn){
        delete books[isbn]['reviews'][req.session.authenticated['username']];
        return res.status(200).json({message:"delete review successful"});
    }        
    return res.status(200).json({message:"make sure to send ISBN plz"});
})
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
