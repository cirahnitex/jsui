<?php
set_time_limit(300);
require_once("../global.inc");
require_once("../Recommendation/UserBased.inc");
use Recommendation\UserBased;
$api = new Api();
$userBased = new UserBased();
$userBased->updateSimilarity();
$api->value = "user similarity updated";
$api->response();
