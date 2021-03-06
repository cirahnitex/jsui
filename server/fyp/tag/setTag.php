<?php

require_once('../global.inc');
require_once('Tag.inc');
require_once("../Recommendation/TagBased.inc");
use Recommendation\TagBased;
$api = new Api();

// get audio id from request
$audioId = $api->intParam("audioId");

// get audio
$audio = R::load('audio', $audioId);
if(!$audio) $api->response(400);

$aTag = $api->arrParam("aTag");
Tag::setTag($audioId, $aTag);

// update tag similarity
$tagBased = new TagBased();
$tagBased->updateSimilarity();

$api->value = "tag updated for audio ".$audio->name;
$api->response();
