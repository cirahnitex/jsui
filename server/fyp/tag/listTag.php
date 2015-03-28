<?php

require_once('../global.inc');
require_once('Tag.inc');
$api = new Api();

// get audio id from request
$audioId = $api->intParam("audioId");

// get audio
$audio = R::load('audio', $audioId);
if(!$audio) $api->response(400);

// get tag name list
$aTagName = Tag::listTagName($audioId);

// response
$api->value = $aTagName;
$api->response();
