<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Custom jQuery Twitter Feed Demo</title>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script type="text/javascript" src="js/TwitterHashTagGallery.js"></script>
    <link rel="stylesheet" type="text/css" href="css/twitter-styles.css" />
    <script type="text/javascript">
    var config = {
    		setHashTags : '#Fifa',
			setUserRefrences : '@Fifa',
    		twitterLimitCount : 4,
    		twitterProfileName : "Scott",
    		twitterScreenName : "Scott",
    		showDirectTweets : true,
    		showReTweets : true,
    		showTweetLinks : true,
    		showProfilePics : true,
    		showTweetActions : true,
    		showReTweetIndicator : true,
    		showLoader : true,
    		showHeader : true,
    		loadingGIF : 'images/ajax-loader.gif',    		
    		autoUpdate : false, // set true if wanna update automatic
			intervalTime : 10000 // 10 second
    	}
    	$(document).ready(function () {

    		$('#content').loadTweets(config);
    		
    		$("#refreshTweets").click(function(){
    			$('#content').loadTweets(config);	
    		});
    	});
    </script>
</head>

<body>
    <div id="twitter-feed">
        <div id="head"></div>        
        <div id="content"></div>
    </div>    
</body>

</html>
