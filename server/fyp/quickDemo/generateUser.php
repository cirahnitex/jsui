<?php
require_once "../global.inc";
$api = new Api();
// truncate all users and ratings
wipe_improved("user");

$aUserName = ["Aiden", "Alexander", "Benjamin", "Brayden",  "Caleb", "Carter", "Cirah", "Connor", "Daniel", "David", "Dominic", "Dylan", "Eli", "Ethan", "Evan", "Gavin", "Grayson", "Henry", "Hunter", "Isaac", "Jack", "Jackson", "Jacob", "James", "Jayce", "Jayden", "Joshua",  "Liam", "Logan", "Lucas", "Luke", "Mason", "Michael", "Nathan", "Nicholas", "Noah", "Oliver", "Ryan", "Samuel", "William"];
$passwordHashed = password_hash("122333",PASSWORD_DEFAULT);
$aUser = [];
foreach($aUserName as $username) {
	$user = R::dispense("user");
	$user->username = $username;
	$user->passwordHashed = $passwordHashed;
	$aUser[] = $user;
}
R::storeAll($aUser);
$api->value = "user created";
$api->response();
