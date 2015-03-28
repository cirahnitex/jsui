<?php
require_once('global.inc');


$audio = R::load("audio",1);
$tag = $audio->sharedTagList[1];
var_dump($tag->name);
