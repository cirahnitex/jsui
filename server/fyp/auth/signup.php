<?php
require_once "../global.inc";

$api = new Api();
$username = $api->strParam("username");
$password = $api->strParam("password");

// check if user exists
if(R::count("user",'username = ?', [$username]) > 0) {
	$api->response(201, "already exists");
}

// create user
$user = R::dispense("user");
$user->username = $username;
$user->passwordHashed = password_hash($password, PASSWORD_DEFAULT);
$id = R::store($user);

$api->setActiveUserId($id);
$api->response();
