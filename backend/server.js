const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const routes = express.Router();
var User = require('./schema/user.js');
app.use(cors());
app.use(bodyParser.json());
app.use('/practiceRoutes', routes);
mongoose.connect('mongodb://127.0.0.1:27017/practice', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

routes.route('/').get(function(req, res) {
    User.find(function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    });
});

// app.get('/', function(req, res) {
//     User.find(function(err, data) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.json(data);
//         }
//     });
// });