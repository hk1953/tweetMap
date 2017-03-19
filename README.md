# TwittMap
----


TwittMap is a web application that collects tweets using twitter API's and stores them in AWS Elastic Search. Also, it populates the tweets on a google map based on certain filter criteria. Please click on location marker to see the tweets.

Tweets are filtered based upon few topics selected from the given drop-down list on the web page.

Steps to run the project:

1. Clone the repository.
2. Enter the Google API Key in index.html, Twitter API Credentials & AWS credentials in the server.js file.
3. Check the port number or update the same in server.js. Do not forget to give access to that port by editing the details in the corresponding security group folder.
4. Run the application on localhost along with the port number.
