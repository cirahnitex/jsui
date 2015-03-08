<?php
require_once "../global.inc";
$api = new Api();
$username = $api->strParam("username");
$password = $api->strParam("password");

// check if user exists
$user = R::findOne('user', 'username = ?', [$username]);
if(!$user) $api->response(201, "user does not exists");

// check password
if(!password_verify($password, $user->passwordHashed)) $api->response(202, "password incorrect");

// set active user
$api->setActiveUserId($user->getID());
$api->response();
