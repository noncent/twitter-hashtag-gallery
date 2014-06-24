TwitterHashTagGallery
=====================

Twitter Hash Tag Gallery is a simple jQuery plug-in to get twitter #hashtag and @references written in jQuery and PHP. It is original created by Tom (http://www.webdevdoor.com/javascript-ajax/custom-twitter-feed-integration-jquery/) and I have updated script as a jQuery plug-in with some new feature.

TwitterHashTagGallery works with jQuery and PHP. You need to Twitter OAuth and Twitter Library to run Twitter PHP app and also required a Twitter APP too..


Create a new Twitter APP
========================

If you are beginner and don't know that how you can make a Twitter App then follow the below steps;

Login on Dev Twitter site with your twitter login credentials. http://dev.twitter.com/



<h6>First Step </h6>
![First Step](https://raw.githubusercontent.com/neerajsinghsonu/TwitterHashTagGallery/master/doc/first-screen.jpg "First Step")
<br />

<h6>Second Step </h6>
![Second Step](https://raw.githubusercontent.com/neerajsinghsonu/TwitterHashTagGallery/master/doc/second-screen.jpg "Second Step")
<br />

<h6>Third Step </h6>
![Third Step](https://raw.githubusercontent.com/neerajsinghsonu/TwitterHashTagGallery/master/doc/third-screen.jpg "Third Step")
<br />

<h6>Fourth Step </h6>
![Fourth Step](https://raw.githubusercontent.com/neerajsinghsonu/TwitterHashTagGallery/master/doc/fourth-screen.jpg "Fourth Step")
<br />

<h6>Fifth Step </h6>
![Fifth Step](https://raw.githubusercontent.com/neerajsinghsonu/TwitterHashTagGallery/master/doc/fifth-screen.jpg "Fifth Step")
<br />

<h6>Final Step </h6>
![Sixth Step](https://raw.githubusercontent.com/neerajsinghsonu/TwitterHashTagGallery/master/doc/six-screen.jpg "Sixth Step")



<h5>Update Config.php</h5>

Get secrets token and keys and update config.php settings.


<h5>TwitterHashTagGallery Script Settings:</h5>
TwitterHashTagGallery has some settings to complete user's task with ease;

```javascript
var config = {
	// enter your hash tag to get tweets
	setHashTags : '#Fifa',
	// enter your user reference to get tweets
	setUserRefrences : '@Fifa',
	// how many tweets you want to fetch
	twitterLimitCount : 4,
	// optional
	twitterProfileName : "Scott",
	// optional
	twitterScreenName : "Scott",
	// if want to see direct tweets
	showDirectTweets : true,
	// if want to see re-tweets
	showReTweets : true,
	// if want to see teets link
	showTweetLinks : true,
	// if want to see user's profile image
	showProfilePics : true,
	// if want to tweet actions like re-tweet, share ..
	showTweetActions : true,
	// if specify the re-tweet
	showReTweetIndicator : true,
	// show the waiting loader
	showLoader : true,
	// show the top header
	showHeader : true,
	// set loading gif image
	loadingGIF : 'images/ajax-loader.gif',
	// if want to update automatically
	autoUpdate : false,
	// set time interval in millisecond format //1000 = 1 second
	intervalTime : 10000
}
```

TwitterHashTagGallery - View
============================

![TwitterHashTagGallery - View](https://raw.githubusercontent.com/neerajsinghsonu/TwitterHashTagGallery/master/doc/TwitterHashTagGallery-View.jpg "TwitterHashTagGallery - View")