<?php
/* Start session */
session_id() ? session_start() : false;

// ini_set('error_reporting', E_STRICT);
 
/**
 * @file
 * A single location to store configuration.
 */

define('CONSUMER_KEY', 'YOUR-TWITTER-APP-CONSUMER-KEY');
define('CONSUMER_SECRET', 'YOUR-TWITTER-APP-CONSUMER-SECRET');
define('ACCESS_TOKEN', 'YOUR-TWITTER-APP-ACCESS-TOKEN');
define('ACCESS_TOKEN_SECRET', 'YOUR-TWITTER-APP-ACCESS-TOKEN-SECRET');
define('OAUTH_CALLBACK', 'YOUR-CALLBACK-URL');
