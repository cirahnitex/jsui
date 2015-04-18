<?php

namespace Recommendation;
require_once(__DIR__."/../tag/Tag.inc");
require_once(__DIR__."/ItemBased.inc");
require_once(__DIR__."/CosineSimilarity.inc");
use Tag;


class TagBased extends ItemBased {
	protected $similarityTable = "itemtagbasedsimilarity";
	protected function calculateSimilarity($id1, $id2) {
		$aTag1 = Tag::listTagId($id1);
		$aTag2 = Tag::listTagId($id2);
		$tagInvolved = array_unique(array_merge($aTag1, $aTag2));
		$v1 = TagBased::getVector($tagInvolved, $aTag1);
		$v2 = TagBased::getVector($tagInvolved, $aTag2);
		return CosineSimilarity::calculate($v1, $v2);
	}
	private static function getVector($tagInvolved, $aTag) {
		$rtn = [];
		foreach($tagInvolved as $tag) {
			$rtn[] = in_array($tag, $aTag)?1:0;
		}
		return $rtn;
	}
} 
