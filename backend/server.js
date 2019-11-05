const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
var Tweet = require('./schema/tweet.js');
var Influencer = require('./schema/Influencer.js');

var session = require('express-session');
var Twitter = require('twitter');
var twitterBaseApi = 'https://api.twitter.com/1.1/search/tweets.json';
var fs = require('fs');
var natural = require('natural');
var classifier = new natural.BayesClassifier();
//change secret in production
app.use(session({ secret: 'secretKey', resave: false, saveUninitialized: false }));

app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/practice', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});


var client = new Twitter({
    consumer_key: 'GaEOxBTG3e2DkHnksn3ec8gex',
    consumer_secret: '6CUBhVNmW425oYYLefQQGvvTYdouuLG6zefSzzghoYNFyprssP',
    access_token_key: '1180972265363496961-AGLVkB0qtI7dumQEMMbcZ0YphMTy70',
    access_token_secret: 'xw4iOBp2c9w4cIQeWiXDJn4JOrP1Sy5ciDSNRFKjU5AYR'
});

app.get('/file', function (req, res) {
    fs.readFile('./tweets.json', 'utf8', function(err, contents) {
        var asObj = JSON.parse(contents);
    console.log(asObj['username']);
    res.send(contents);

});

});

app.post('/getTweets', function (req, res) {
    console.log(req.body);
    if (req.body.criteria === '') {
        client.get('search/tweets', { q: '' }, function (error, tweets, response) {
            res.status(200).send(tweets)
        });
    }
    client.get('search/tweets',
        {
            q: `${req.body.criteria} -filter:retweets`,
            tweet_mode: 'extended', count: 100,
            result_type: 'mixed',
            language: 'en'
        }, async function (error, allData, response) {
            if (error){
                console.log("error in fetching tweets.")
                response.status(400).send(JSON.stringify(error));
            }

            //save tweets
            var tweets = allData.statuses;
            var currTweet = {};
            for (var i = 0; i < tweets.length; i++) {
                currTweet = tweets[i];
                await Influencer.findOne({ twitter_handle: currTweet.user.screen_name }, function (error, foundInfluencer) {
                    if (error) {
                        response.status(400).send(JSON.stringify(error));
                        return;
                    }
                    if (!foundInfluencer) {
                        //not found, add new one
                        var tweetDataObj =
                        {
                            category: 'unknown',
                            content: currTweet.full_text,
                            num_retweets: currTweet.retweet_count
                        }
                        console.log(tweetDataObj);
                        Influencer.create(
                            {
                                twitter_handle: currTweet.user.screen_name,
                                name: currTweet.user.name,
                                tweets: [tweetDataObj]
                            },
                            function (error, newInfluencer) {
                                if (error) {
                                    console.log("Some error in adding new influencer to db");
                                    console.log(newInfluencer);
                                    return;
                                }
                            });
                    } else if (foundInfluencer){
                        // console.log("found: " + foundInfluencer)
                        var newTweet = 
                        {
                            category: 'unknown',
                            content: currTweet.full_text,
                            num_retweets: currTweet.retweet_count  
                        }
                        if (!foundInfluencer.tweets.includes(newTweet)){
                            foundInfluencer.tweets.push(newTweet);
                            foundInfluencer.save();
                        }
                    }
                });

            }
            res.status(200).send(allData)
        });
});




app.post('/validateUser', function (req, res) {
    const email = req.body.email;
    const pw = req.body.pw;
    if (email === 'email' && pw === 'pw') { //change later, lol
        res.status(200).send('valid'); //maybe separate response for non-editor user
    } else {
        res.status(400).send('No such account.');
    }
});



app.get('/', function (req, res) {
    res.send('Simple web server');
});


