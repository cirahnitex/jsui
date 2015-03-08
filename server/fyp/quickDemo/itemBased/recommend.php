<?php
require_once "../../global.inc";
require_once "../../Recommendation/ItemBased.inc";
use Recommendation\ItemBased;
$api = new Api();
$uid = $api->strParam("userId");
$user = R::load("user", $uid);
if(!$user) {
	$api->response(201, "user does not exists");
}
$alg = new ItemBased();
list($aAudio, $aRating) = $alg->recommend($uid, 5);

$api->value = [];
for($i=0; $i<count($aAudio); $i++) {
	$api->value[$i] = [
	  'url' => $aAudio[$i]->url,
	  'predictedRating' => $aRating[$i]
	];
}
$api->response();
