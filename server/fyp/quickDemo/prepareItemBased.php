<?php
set_time_limit(300);
require_once("../global.inc");
require_once("../Recommendation/ItemBased.inc");
use Recommendation\ItemBased;
$api = new Api();
$userBased = new ItemBased();
$userBased->updateSimilarity();
$api->value = "item similarity updated";
$api->response();
