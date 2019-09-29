const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
var User = require('./schema/user.js');
var Content = require('./schema/comment.js');
var Article = require('./schema/article.js');
var session = require('express-session');

//change secret in production
app.use(session({secret: 'secretKey', resave: false, saveUninitialized: false}));

app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/practice', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

var currTicket = 0;

app.get('/getAllContent', function(req, res) {
    Content.find(function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    });
});

app.post('/validateUser', function(req, res) {
    const email = req.body.email;
    const pw = req.body.pw;
    if (email === 'email' && pw === 'pw'){ //change later, lol
        res.status(200).send('valid'); //maybe separate response for non-editor user
    } else {
        res.status(400).send('No such account.');
    }
});

app.post('/getArticleData', function(req, res) {
    Article.findOne({_id: req.body.article_id}, function(error, article){
        if(error){
            console.log(error);
            res.status(400).send(JSON.stringify(error));
            return;
        }
        if (!article){
            console.log("Internal error.");
            res.status(500).send("Internal error.");
            return;
        }
        console.log(article.content + "from tester")
        res.status(200).send(article.content);
    });
});

app.post('/saveArticleData', function(req, res) {
    var updated = new Article({_id: req.body.article_id, content: req.body.content});
    Article.findOneAndUpdate({_id: req.body.article_id}, updated, {upsert:true}, function(err, doc){
        if (err) return res.send(500, { error: err });
        return res.send("succesfully saved");
    });
});

app.get('/addNew', function(req, res) {
    // a document instance
    var content1 = new Content({ content: `${currTicket++}`});
 
    // save model to database
    content1.save(function (err, comment) {
      if (err) return console.error(err);
      res.send(comment.content + " saved to collection.");
    });
});


app.get('/', function(req, res) {
   res.send('Simple web server');
});

app.get('/mirror/:p1', function (request, response) {
    // Express parses the ":p1" from the URL and returns it in the request.params objects.
    console.log('/test called with param1 = ', request.params.p1);
	response.status(200).send('This is the param: ' + request.params.p1);
});

