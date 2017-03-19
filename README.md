# TwittMap


TwittMap is a web application that collects Real-time tweets using twitter API's and stores them in AWS Elastic Search. The Tweets are rendered on Google Maps using API based on location and user selected keyword from the drop-down menu.

TwittMap fetches tweets from the twitter hose in real time and stored using ElasticSearch in he backend. Google Maps are used to show the tweets location and a click on the each marker will display the Tweet text. The Application is depployed on AWS BeanStalk enviornment.

![alt tag](https://github.com/hk1953/tweetMap/blob/master/twittc.jpg "Markers as Tweet on Google Maps")

##### Steps to run the project:

1. Clone the repository.
2. Enter the Google API Key in index.html and Twitter API Credentials & AWS credentials in the server.js file.
3. Check the port number or update the same in server.js. Do not forget to give access to that port by editing the details in the corresponding security group folder.
4. Run the application on localhost along with the same port number.
