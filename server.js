var twitter = require('twitter');
var elasticsearch = require('aws-es');
var express = require('express');
var connect = require('connect');
var serveStatic = require('serve-static');
//AWS Credentials and elastic search host name
elasticSearch = new elasticsearch({
    accessKeyId: 'Enter Your Key',
    secretAccessKey: 'Enter Your Key',
    service: 'es',
    region: 'us-west-2',
    host: 'Enter Your Elastic Search Endpoint'
});
//Twitter App Credentials
var twitClient = new twitter({
    consumer_key: 'Enter Your Key',
    consumer_secret: 'Enter Your Key',
    access_token_key: 'Enter Your Key',
    access_token_secret: 'Enter Your Key'
});

var index = 'tweetstwitter';

var Type = 'Tweets';

var port = 3000; //Please enter a port number 

var i; //to keep track of the id of the posts being made
//This search operation helps retrieve the id of the latest record
elasticSearch.search({
    index: index,
    type: Type,
    body: {
        query: {
            match_all: {}
        },
        sort: {
            timestamp: "desc"
        },
        size: 1
    }
}, function(err, data) {
    if (data.status == 404) {
        i = 1;
        return;
    }


    if (data.hits.hits[0] == undefined) {
        i = 1;
    } else
        i = parseInt(data.hits.hits[0]._id) + 1;

});

//--------------------------------Fetch records from Twitter and post the same to AWS Elastic Search-----------------------//
var tweetStream = twitClient.stream('statuses/filter', {
    track: 'trump,weather,Game,Obama,samsung,space,earth,ghost,india,usa'  //tweets with the following keywords are being fetched
});
tweetStream.on('data', function(tweetResp) {
    if (tweetResp.coordinates != null && i > 0) {    //Checking if coordinates exist for the tweet
        elasticSearch.index({			     //Posting of the tweets	
            index: index,
            type: Type,
            id: String(i),
            body: {
                text: tweetResp.text,
                latitude: tweetResp.coordinates.coordinates[1],
                longitude: tweetResp.coordinates.coordinates[0],
                timestamp: Date.now()
            }
        }, function(err, data) {
            console.log(data);
            i = i + 1;
        });
    } else if (tweetResp.place != null && i > 0) {	//Checking if the place coordinates exist in the tweet
        var lat1 = tweetResp.place.bounding_box.coordinates[0][0][1];
        var long1 = tweetResp.place.bounding_box.coordinates[0][0][0];

        var lat2 = tweetResp.place.bounding_box.coordinates[0][2][1];
        var long2 = tweetResp.place.bounding_box.coordinates[0][2][0];

        var lat = (lat1 + lat2) / 2;
        var long = (long1 + long2) / 2;

        elasticSearch.index({	//Posting of the tweets
            index: index,
            type: Type,
            id: String(i),
            body: {
                text: tweetResp.text,
                latitude: lat,
                longitude: long,
                timestamp: Date.now()
            }
        }, function(err, data) {
            console.log(data);
            i = i + 1;
        });
    }


});

tweetStream.on('error', function(error) {
    console.log (error);
});



connect().use(serveStatic(__dirname)).listen(port, function(){	   //Server listening at the following port
    console.log('Server running on '+port+'...');
});
