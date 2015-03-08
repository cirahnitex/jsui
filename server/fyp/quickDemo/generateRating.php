<?php
set_time_limit(300);
require_once "../global.inc";
$api = new Api();

R::wipe("rating");

// find all users and items
$aUser = R::findAll("user");
$aItem = R::findAll("audio");

// for each users
foreach($aUser as $user) {

	// select 75% items
	$aRating = [];
	foreach($aItem as $item) {
		if(!rand(0,3)) continue;

		$rating = R::dispense("rating");
		$rating->user = $user;
		$rating->audio = $item;

		/*
		 * A-I ~ Clips ~ 3-4
		 * A-I ~ other ~ 0-2
		 * J-Z ~ Clips ~ 0-2
		 * J-Z ~ other ~ 3-4
		 */
		if($item->category === 'Clips' xor preg_match('/^[a-iA-I]/',$user->username)) {
			$rating->value = rand(0,2);
		}
		else {
			$rating->value = rand(3,4);
		}

		$aRating[] = $rating;
	}
	R::storeAll($aRating);

}
$api->value = "rating created";
$api->response();
