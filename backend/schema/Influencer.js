"use strict";
/*
 *  Defined the Mongoose Schema and return a Model for a User
 */
/* jshint node: true */

var mongoose = require('mongoose');

var tweetSchema = new mongoose.Schema({
    content: String,
    num_retweets: Number,
    category: String, //guns, politics, climate, etc. 
});

var influencerSchema = new mongoose.Schema({
    twitter_handle: String,
    name: String,
    tweets: [tweetSchema], //array of tweets
});

var Influencer = mongoose.model('Influencer', influencerSchema);

module.exports = Influencer;
