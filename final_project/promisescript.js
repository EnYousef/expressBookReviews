const axios = require("axios");

let allBooks = new Promise((res,rej)=>{
    axios.get("https://yousif0180-5000.theiadocker-3-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/")
    .then(function (response) {
        res(response);
      })
      .catch(function (error) {
        rej(error);
      })
});
let isbnQuery = num => new Promise((res,rej)=>{
    axios.get(`https://yousif0180-5000.theiadocker-3-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/isbn/${num}`)
    .then(function (response) {
        res(response);
      })
      .catch(function (error) {
        rej(error);
      })
});
let authorQuery = author => new Promise((res,rej)=>{
    axios.get(`https://yousif0180-5000.theiadocker-3-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/author/${author}`)
    .then(function (response) {
        res(response);
      })
      .catch(function (error) {
        rej(error);
      })
});
let titleQuery = title => new Promise((res,rej)=>{
    axios.get(`https://yousif0180-5000.theiadocker-3-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/title/${title}`)
    .then(function (response) {
        res(response);
      })
      .catch(function (error) {
        rej(error);
      })
});