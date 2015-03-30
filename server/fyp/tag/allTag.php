<?php

require_once('../global.inc');
require_once('Tag.inc');
$api = new Api();

// get tag name list
$aTagName = Tag::listAllTagName();

// response
$api->value = $aTagName;
$api->response();
