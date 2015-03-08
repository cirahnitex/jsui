<?php
require_once "../../global.inc";
require_once "../../Recommendation/UserBased.inc";
use Recommendation\UserBased;
$api = new Api();
$uid = $api->strParam("userId");
$user = R::load("user", $uid);
if(!$user) {
	$api->response(201, "user does not exists");
}
$alg = new UserBased();
list($aUid, $aSimilarity) = $alg->findSimilarObject($uid,5);

$api->value = [];
for($i=0; $i<count($aUid); $i++) {
	$username = R::load("user", $aUid[$i])->username;
	$api->value[$i] = [
		'username' => $username,
		'similarity' => $aSimilarity[$i]
	];
}
$api->response();
