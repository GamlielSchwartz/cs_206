const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
// const routes = express.Router();
var User = require('./schema/user.js');
var Content = require('./schema/comment.js');
var Article = require('./schema/article.js');

app.use(cors());
app.use(bodyParser.json());
// app.use('/practiceRoutes', routes);
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

app.post('/saveArticleData', function(req, res) {
    console.log(req.body);
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

