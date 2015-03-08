<?php
require_once "../../global.inc";
require_once "../../Recommendation/ItemBased.inc";
use Recommendation\ItemBased;
$api = new Api();
$uid = $api->strParam("itemId");
$user = R::load("audio", $uid);
if(!$user) {
	$api->response(201, "item does not exists");
}
$alg = new ItemBased();
list($aUid, $aSimilarity) = $alg->findSimilarObject($uid,5);

$api->value = [];
for($i=0; $i<count($aUid); $i++) {
	$username = R::load("audio", $aUid[$i])->url;
	$api->value[$i] = [
		'url' => $username,
		'similarity' => $aSimilarity[$i]
	];
}
$api->response();
