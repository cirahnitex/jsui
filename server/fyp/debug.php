<?php
require_once('global.inc');
require_once('Recommendation/ItemBased.inc');
use Recommendation\ItemBased;

$algm = new ItemBased();
$algm->predictRating(7,27);
