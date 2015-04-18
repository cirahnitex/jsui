<?php
set_time_limit(300);
require_once "../global.inc";
require_once "../tag/Tag.inc";
$api = new Api();

// wipe tag and audio_tag table
Tag::wipe();

// create tag 1-syatten, 2-Japanese, 3-trance, 4-epic, 5-game, 6-rock, 7-pop
$syatten = Tag::getTagId("syatten");
$Japanese = Tag::getTagId("Japanese");
$trance = Tag::getTagId("trance");
$epic = Tag::getTagId("epic");
$game = Tag::getTagId("game");
$rock = Tag::getTagId("rock");
$pop = Tag::getTagId("pop");

// create category - aTagId map
$GLOBALS["categoryTagDomain"] = [
	"Clips" => [$syatten, $Japanese, $trance],
	"blizzard" => [$epic, $game, $trance],
	"elec" => [$rock, $pop],
	"rgb battle theme" => [$rock, $game, $Japanese],
	"epic" => [$epic, $pop],
	"x-factor" => [$rock, $pop],
];

function generateATagId($category) {
	$tagDomain = $GLOBALS["categoryTagDomain"][$category];
	$rtn = [];
	foreach($tagDomain as $tagId) {
		if(!rand(0,3)) continue;
		$rtn[] = $tagId;
	}
	return $rtn;
}

// get all audio
$aAudio = R::findAll("audio");

// for each audio
foreach($aAudio as $audio) {
	// make aTagId
	$aTagId = generateATagId($audio["category"]);

	// insert into database
	Tag::setTagWithoutCheck($audio["id"], $aTagId);
}

$api->value = "tags created";
$api->response();

