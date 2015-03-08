<?php
require_once "global.inc";
$api = new Api();
$userId = $api->getActiveUserId();
$aRow = R::getAll('select audio.id as id, url, category, `name`, `value` from audio left outer join rating on rating.audio_id = audio.id and rating.user_id = ?', [$userId]);
$api->value = [];
foreach($aRow as $row) {
	$rtnRow = [];
	$rtnRow["id"] = $row["id"];
	$rtnRow["url"] = $row["url"];
	$rtnRow['name'] = $row['name'];
	$rtnRow["category"] = $row["category"];
	if(is_null($row["value"]))
		$rtnRow["ratingValue"] = null;
	else
		$rtnRow["ratingValue"] = intval($row["value"]);

	$api->value[] = $rtnRow;
}
$api->response();

