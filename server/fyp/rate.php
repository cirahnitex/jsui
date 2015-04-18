<?php
require_once "global.inc";
require_once "Recommendation/UserBased.inc";
require_once "Recommendation/ItemBased.inc";
require_once "Recommendation/TagBased.inc";
use Recommendation\UserBased;
use Recommendation\ItemBased;
use Recommendation\TagBased;
$api = new Api();
$audioId = $api->strParam("audioId");
$userId = $api->getActiveUserId();
$ratingValue = $api->intParam("rating");
if($ratingValue < 0 || $ratingValue >= Rating::N_RATING_VALUES) $api->response(400);

$rating = R::findOne("rating", "user_id = ? and audio_id = ?",[$userId, $audioId]);
if(!$rating) {
	$rating = R::dispense("rating");
	$rating->user_id = $userId;
	$rating->audio_id = $audioId;
}
$rating->value = $ratingValue;
R::store($rating);

// update similarities
$recommendation = new UserBased();
$recommendation->updateSimilarity1($userId);
$recommendation = new ItemBased();
$recommendation->updateSimilarity1($userId);
$recommendation = new TagBased();
$recommendation->updateSimilarity1($userId);

$api->response();
