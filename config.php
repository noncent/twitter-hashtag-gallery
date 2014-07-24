<?php
/* Start session */
session_id() ? session_start() : false;

// ini_set('error_reporting', E_STRICT);
 
/**
 * @file
 * A single location to store configuration.
 */

define('CONSUMER_KEY', 'APP-KEY');
define('CONSUMER_SECRET', 'APP-SECRET');
define('ACCESS_TOKEN', 'ACCESS-TOKEN');
define('ACCESS_TOKEN_SECRET', 'TOKEN-SECRET');
define('OAUTH_CALLBACK', 'http://git.local.com/TwitterHashTagGallery/callback.php');
