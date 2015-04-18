<?php
set_time_limit(300);
require_once("../global.inc");
require_once("../Recommendation/TagBased.inc");
use Recommendation\TagBased;
$api = new Api();
$userBased = new TagBased();
$userBased->updateSimilarity();
$api->value = "tag similarity updated";
$api->response();
