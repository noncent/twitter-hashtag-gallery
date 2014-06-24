/**
 * jQuery twitter plugin to fetch hash tags and
 * user refrences
 * 
 * @author Tom
 * @link http://www.webdevdoor.com/javascript-ajax/custom-twitter-feed-integration-jquery/
 * @updated neeraj.singh
 * @version 1.0
 * @dependency jQuery library
 */
;(function ($) {
	"use strict";
	$.fn.loadTweets = function (settings) {
		var _self = this;
		/**
		 * Show the loading image
		 */
		var showLoader = function () {
			if($('#head h1 span').next().is('img')){
				$('#head h1 span').next('img').show();
			}else{
				$('#head h1 span').after($('<img />', {
					src : config.loadingGIF
				}));
			}			
		};
		/**
		 * Hide the loading image
		 */
		var hideLoader = function () {
			$('#head h1 span').next('img').hide();
		};
		/**
		 * Init function to invoke plugin inside
		 */
		var _init = function () {
			
			// check if #twitter-data id not found in DOM
			if ($('#twitter-data').length == '0') {
				// append the element to store twitter max id within
				$('<input />', {
					type : 'hidden',
					id : 'twitter-data',
					name : 'twitter-data',
					'data-maxid' : 0
				}).appendTo(_self);
			}
			// start the showing loader
			showLoader();
			
			// prepare the object to send as payload to ajax
			var data = {
				hashtext : config.setHashTags,
				attext : config.setUserRefrences,
				limit : config.twitterLimitCount,
				maxid : _getMaxTweetID()
			};
			
			// get the JSON data from server side
			$.getJSON('get-tweets.php?', $.param(data), function (feeds) {
				_success(feeds)
			}).error(function (jqXHR, textStatus, errorThrown) {
				_error(jqXHR, textStatus, errorThrown)
			});
		};
		
		/**
		 * Get the twitter max id from element
		 */
		var _getMaxTweetID = function () {
			$('#twitter-data').attr('data-maxid');
		};
		
		/**
		 * Set the twitter max id within element
		 */
		var _setMaxTweetID = function (maxid) {
			$('#twitter-data').attr('data-maxid', maxid);
		};
		
		/**
		 * Success callback function to handle JSON response
		 */
		var _success = function (feeds) {
			var feedHTML = '';
			var displayCounter = 1;
			
			// set the twitter max id
			_setMaxTweetID(feeds[0].metadata.max_id);
			
			// fire counter loop within parse JSON object
			for (var i = 0; i < config.twitterLimitCount; i++) {
				// get twitter screen name
				var tweettwitterScreenName = feeds[i].user.name;
				// get twitter user name
				var tweetusername = feeds[i].user.screen_name;
				// get twitter user profile image
				var profileimage = feeds[i].user.profile_image_url_https;
				// user tweets text
				var status = feeds[i].text;
				// is tweet re tweet
				var isaretweet = false;
				// is direct tweet or re tweet
				var isdirect = false;
				// twitter id
				var tweetid = feeds[i].id_str;
				// conditional block
				if (typeof feeds[i].retweeted_status != 'undefined') {
					profileimage = feeds[i].retweeted_status.user.profile_image_url_https;
					tweettwitterScreenName = feeds[i].retweeted_status.user.name;
					tweetusername = feeds[i].retweeted_status.user.screen_name;
					tweetid = feeds[i].retweeted_status.id_str;
					status = feeds[i].retweeted_status.text;
					isaretweet = true;
				};
				// if at the rate sign found
				if (feeds[i].text.substr(0, 1) == "@") {
					isdirect = true;
				}
				// plugin settings
				if (((config.showReTweets == true) || ((isaretweet == false) && (config.showReTweets == false))) && ((config.showDirectTweets == true) || ((config.showDirectTweets == false) && (isdirect == false)))) {
					if ((feeds[i].text.length > 1) && (displayCounter <= config.twitterLimitCount)) {
						if (config.showTweetLinks == true) {
							status = _link(status);
						}
						if (displayCounter == 1) {
							feedHTML += '';
						}
						// make inner html data
						feedHTML += '<div class="twitter-article" id="tw' + displayCounter + '">';
						feedHTML += '<div class="twitter-pic"><a href="https://twitter.com/' + tweetusername + '" target="_blank">';
						feedHTML += '<img src="' + profileimage + '"images/twitter-feed-icon.png" width="42" height="42" alt="twitter icon" />';
						feedHTML += '</a></div>';
						feedHTML += '<div class="twitter-text">';
						feedHTML += '<p>';
						feedHTML += '<span class="tweetprofilelink">';
						feedHTML += '<strong><a href="https://twitter.com/' + tweetusername + '" target="_blank">' + tweettwitterScreenName + '</a></strong> ';
						feedHTML += '<a href="https://twitter.com/' + tweetusername + '" target="_blank">@' + tweetusername + '</a>';
						feedHTML += '</span>';
						feedHTML += '<span class="tweet-time">';
						feedHTML += '<a href="https://twitter.com/' + tweetusername + '/status/' + tweetid + '" target="_blank">' + _time(feeds[i].created_at) + '</a>';
						feedHTML += '</span><br/>' + status + '</p>';
						// manage indicators
						if ((isaretweet == true) && (config.showReTweetIndicator == true)) {
							feedHTML += '<div id="retweet-indicator"></div>';
						}
						if (config.showTweetActions == true) {
							feedHTML += '<div id="twitter-actions"><div class="intent" id="intent-reply"><a href="https://twitter.com/intent/tweet?in_reply_to=' + tweetid + '" title="Reply"></a></div><div class="intent" id="intent-retweet"><a href="https://twitter.com/intent/retweet?tweet_id=' + tweetid + '" title="Retweet"></a></div><div class="intent" id="intent-fave"><a href="https://twitter.com/intent/favorite?tweet_id=' + tweetid + '" title="Favourite"></a></div></div>';
						}
						feedHTML += '</div>';
						feedHTML += '</div>';
						displayCounter++;
					}
				}				
			}
			// append the data in carrier
				_self.prepend(feedHTML);
				// manage tweet actions
				if (config.showTweetActions === true) {
					$('.twitter-article').hover(function () {
						$(this).find('#twitter-actions').css({
							'display' : 'block',
							'opacity' : 0,
							'margin-top' : -20
						});
						$(this).find('#twitter-actions').animate({
							'opacity' : 1,
							'margin-top' : 0
						}, 200);
					}, function () {
						$(this).find('#twitter-actions').animate({
							'opacity' : 0,
							'margin-top' : -20
						}, 120, function () {
							$(this).css('display', 'none');
						});
					});
					$('#twitter-actions a').click(function () {
						var url = $(this).attr('href');
						window.open(url, 'tweet action window', 'width=580,height=500');
						return false;
					});
				}
			// now hide the loader
			hideLoader();
		};
		/**
		 * Callback function to handle ajax error
		 */
		var _error = function (jqXHR, textStatus, errorThrown) {
			var error = "";
			if (jqXHR.status === 0) {
				error = 'Connection problem. Check file path and www vs non-www in getJSON request';
			} else if (jqXHR.status == 404) {
				error = 'Requested page not found. [404]';
			} else if (jqXHR.status == 500) {
				error = 'Internal Server Error [500].';
			} else if (exception === 'parsererror') {
				error = 'Requested JSON parse failed.';
			} else if (exception === 'timeout') {
				error = 'Time out error.';
			} else if (exception === 'abort') {
				error = 'Ajax request aborted.';
			} else {
				error = 'Uncaught Error.\n' + jqXHR.responseText;
			}
			alert("error: " + error);
		};
		/**
		 * make link with tags
		 */
		var _link = function (data) {
			data = data.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function (url) {
					return '<a href="' + url + '"  target="_blank">' + url + '</a>';
				});
			data = data.replace(/\B@([_a-z0-9]+)/ig, function (reply) {
					return '<a href="http://twitter.com/' + reply.substring(1) + '" style="font-weight:lighter;" target="_blank">' + reply.charAt(0) + reply.substring(1) + '</a>';
				});
			data = data.replace(/\B#([_a-z0-9]+)/ig, function (reply) {
					return '<a href="https://twitter.com/search?q=' + reply.substring(1) + '" style="font-weight:lighter;" target="_blank">' + reply.charAt(0) + reply.substring(1) + '</a>';
				});
			return data;
		};
		/**
		 * get the total no of count displaying tweets
		 */
		var _getTweetCount = function () {
			return $('.twitter-article').length;
		};
		/**
		 * convert the tweets time in ago format
		 */
		var _time = function (time_value) {
			var values = time_value.split(" ");
			time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
			var parsed_date = Date.parse(time_value);
			var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
			var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
			var shortdate = time_value.substr(4, 2) + " " + time_value.substr(0, 3);
			delta = delta + (relative_to.getTimezoneOffset() * 60);
			if (delta < 60) {
				return '1m';
			} else if (delta < 120) {
				return '1m';
			} else if (delta < (60 * 60)) {
				return (parseInt(delta / 60)).toString() + 'm';
			} else if (delta < (120 * 60)) {
				return '1h';
			} else if (delta < (24 * 60 * 60)) {
				return (parseInt(delta / 3600)).toString() + 'h';
			} else if (delta < (48 * 60 * 60)) {
				return shortdate;
			} else {
				return shortdate;
			}
		};
		/**
		 * Plugins default settings
		 */
		var config = $.extend({
				setHashTags : '#Fifa',
				setUserRefrences : '@Fifa',
				twitterLimitCount : 10,
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
				loadingContainer : '#loading-container',
				autoUpdate:false,
				intervalTime: 2000
			}, settings);
		// extend the settings 
		if (settings) {
			$.extend(config, settings);
		}
		// append the head, title and logo
		if ($('#head > a').length == '0') {
			// append a tag inside #head
			$("#head").html($('<a />', {
					title : "Click here to load more twitter tweets",
					id : 'refreshTweets',
					href : "javascript:void(0);",
					html : $('<img />', {
						width : "34",
						alt : 'Twitter Bird',
						src : "images/twitter-bird-light.png"
					}).css({
						"float" : "left"
					})
				}));
			// append h1 tag after #head a
			$("#head > a").after($('<h1 />', {
					html : config.setHashTags
				}).append($('<span />', {
						html : "&nbsp;&nbsp;&nbsp;Twitter Counter"
					}).css({
						'font-size' : '13px'
					})));			
		};
		
		// call the init method to invoke plugin; set interval time if requested
		if(config.autoUpdate == true){
			_init();
			setInterval(function(){
				_init();
			}, config.intervalTime);
		}else{
			_init();
		}	
		return this;
	}
})(jQuery);
