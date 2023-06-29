const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    let username = req.body.username
    let password = req.body.password
    if(username && password){
        if(!isValid(username)){
            users.push({
                "username":username,
                "password":password
            });
            return res.status(200).json({message:"register Successful ,login now"});        
        }  
        return res.status(200).json({message:"this username already useit!"});
    }
    return res.status(200).json({message:"make sure to send all usernmae and password"});
});
public_users.post("/users",(req,res)=>{
    res.json(users)
})
// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).send(JSON.stringify(books, null, 40));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    let isbn = req.params.isbn;
    return res.status(200).send(JSON.stringify(books[isbn], null, 4));  
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let keys = Object.keys(books);
    keys.forEach(e=>{
        if(books[e]["author"] === req.params.author)
            return res.status(200).json(books[e]);
    });
    return res.status(200).json({message:"not Found"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let keys = Object.keys(books);
    keys.forEach(e=>{
        if(books[e]["title"] === req.params.title)
            return res.status(200).json(books[e]);
    });
    return res.status(200).json({message:"not Found"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    let isbn = req.params.isbn;
    return res.status(200).send(JSON.stringify(books[isbn]['reviews'], null, 4));  
});

module.exports.general = public_users;
