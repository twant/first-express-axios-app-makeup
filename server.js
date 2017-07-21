//like application controller
//pulls express from the node module for use
// const isofet=require('isomorphic-fetch')
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const firebase = require("firebase");
const fb = firebase.initializeApp({
    apiKey: "AIzaSyDRdCIMIm5n3gsl6p-ami1rzhdXNGxGnhs",
    authDomain: "hey-jastor.firebaseapp.com",
    databaseURL: "https://hey-jastor.firebaseio.com",
    projectId: "hey-jastor",
    storageBucket: "",
    messagingSenderId: "44382216718"
})
const axios = require('axios')

//express function creates an application
const app = express()



//setting ejs as the template for rendering pages
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
    //all static parts of pages will come from a views folder (css, images, etc.)
app.use(express.static('views'))
    // app.use(isofet)
    //set up morgan to log all requests made to our app
app.use(logger('dev'))
    //set up body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))



app.get('/', (request, response) => {
    // response.send('<h1>Hi JAstor.</h1>')
    response.render('home.ejs')
})



// function getPic(user){
//     // var endpoint="https://api.github.com/"+user
//     // let something=''
//     const endpoint=`https://api.github.com/users/${user}`;
//     fetch(endpoint)//returns a promise
//         // shorthand function
//         // data =>{return data.json()})//takes in a callback function to operate on the promise
//     .then(
//         json => {
//             console.log(json.parse)
//             return json.parse

//             // document.getElementById('name').innerHTML = json.name
//             // document.getElementById('link').setAttribute('href', json.html_url)
//         })

//     .catch(err => {console.log(err)})
// }

// 
app.post('/', (request, response) => {
    var brand=request.body.brand
    var type=request.body.type
    axios.get(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}&product_type=${type}`)
            // .then(function(data){
            //     return data.json()})
            .then(function(json) {
                // JSON.parse(json)
                // console.log(JSON.stringify(json.data[0].image_link))
                
                response.render('result.ejs', {
                answer: json.data
                })
            })
            .catch(function(err){
                console.log(err)
            })
           
    // //random firebase stuff
    // var key = 'AAAAClVi4g4:APA91bGYC4w38qjdv5nvljJBBcT24lSmkaYNVUlQupNw9-biJilQN81smphk-_nwnXY6FSut7gEXFBAkiuWPyYCMAvEpFEn8wVHYoe56MRLNEg9p8ZaejdGIt8J5d-2YO2He3dbXu5z2';
    // var to = 'AIzaSyCiP5P2ZwjIRZFfTewhA3_bZjsOOSuEZR4';
    // // var notification = {
    // //   'title': 'Portugal vs. Denmark',
    // //   'body': '5 to 1',
    // //   'icon': 'firebase-logo.png',
    // //   'click_action': 'http://localhost:8080'
    // // };

    
        



})


//to get code to run on cloud9
const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`App running on port${port}`)
})
