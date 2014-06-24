<?php
/**
 * @file
 * Get Tweets from Twitter as request
 */

/* Load required lib files. */
require_once ('config.php');

/* include twitter oauth library */
require_once ('twitteroauth/twitteroauth.php');

// make an object of class twitter
$connection = new TwitterOAuth ( CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET );

// if limit request then set limit
if((isset($_GET['limit']) && !empty($_GET['limit']))  && (isset($_GET['attext']) && empty($_GET['attext']))){
	$limitForHash = intval($_GET['limit']);
}else{
	if(intval($_GET['limit']) % 2 === 0){
		$limitForHash = intval($_GET['limit']) / 2;
		// limit for @tag
		$limitForAt = $limitForHash;
	}else{
		$limitForHash = ceil(intval($_GET['limit']) / 2);
		// limit for @tag
		$limitForAt = (intval($_GET['limit'])-$limitForHash);
	}
}

// if 3tag request the set #tag text
$hashtext = (isset($_GET['hashtext']) && !empty($_GET['hashtext'])) ? $_GET['hashtext'] : '#DigitasLbi';

// if user reference request then set @user reference
$attext = (isset($_GET['attext']) && !empty($_GET['attext'])) ? $_GET['attext'] : '@DigitasLBi';

// get twitter max id to showing nect results
$twitterMaxID = (isset($_GET['maxid']) && !empty($_GET['maxid'])) ? $_GET['maxid'] : '0';

// make array to pass and get #hastag result
$query = array ( "q" => "$hashtext", "count" => $limitForHash, "result_type" => "recent", "max_id"=>$twitterMaxID);

// fire the execution
$resultsForHashTag = $connection->get ( 'search/tweets', $query );

// parse string as URL param to get part of twitterMaxID
$maxidHashTag =  parse_str($resultsForHashTag->search_metadata->next_results,$maxHashID);

// set the max id
$maxidHashTag = $maxHashID['?max_id'];

// make array to pass and get @user reference
$query = array ( "q" => "$attext", "count" => $limitForAt, "result_type" => "recent" );

// fire the execution
$resultsForUser = $connection->get ( 'search/tweets', $query );

//both arrays will be merged including duplicates
$results = array_merge( $resultsForHashTag->statuses, $resultsForUser->statuses );

//duplicate objects will be removed
$results = array_map("unserialize", array_unique(array_map("serialize", $results)));

// shuffle the array result
shuffle($results);

// set maxid with current JSON result
$results[0]->metadata->max_id = $maxidHashTag;

// finally echoing the json as JSOn result
echo json_encode ( $results );
?>
