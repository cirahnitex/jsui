<?php
require_once "global.inc";
require_once "Recommendation/ItemBased.inc";
require_once "Recommendation/UserBased.inc";
use Recommendation\ItemBased;
use Recommendation\UserBased;
$api = new Api();
$uid = $api->getActiveUserId();
$algmStr = $api->strParam("algorithm");
$user = R::load("user", $uid);

switch($algmStr) {
	case 'ItemBased':
		$algm = new ItemBased();
		break;
	case 'UserBased':
		$algm = new UserBased();
		break;
	default:
		$api->response(400);
		return;
}

list($aAudio, $aRating) = $algm->recommend($uid, 0);

$api->value = [];
for($i=0; $i<count($aAudio); $i++) {
	$api->value[$i] = [
	  'id' => $aAudio[$i]->id,
	  'predictedRating' => $aRating[$i]
	];
}
$api->response();
