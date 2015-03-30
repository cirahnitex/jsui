<?php

class Tag {
	static function setTag($audioId, $aTagName) {
		// get audio
		$audio = R::load("audio", $audioId);
		if(!$audio) return;

		// remove duplicate tag name
		$aTagName = array_unique($aTagName);

		// get a list of tag
		$aTag = [];
		foreach($aTagName as $tagName) {
			// skip tag with empty name
			if(strlen($tagName) <= 0) continue;
			$aTag[] = Tag::getTag($tagName);
		}


		// store into audio
		$audio->sharedTagList = $aTag;
		R::store($audio);

		// delete redundant tags
		Tag::deleteRedundantTag();
	}
	static function listAllTagName() {
		$aTag = R::findAll('tag');
		$rtn = [];
		foreach($aTag as $tag) {
			$rtn[] = $tag['name'];
		}
		return $rtn;
	}
	static function listTagName($audioId) {
		$audio = R::load('audio', $audioId);
		$rtn = [];

		foreach($audio->sharedTagList as $tag) {
			$rtn[] = $tag->name;
		}
		return $rtn;
	}
	static function getTag($tagName) {
		$tag = R::findOne("tag", "name = ?", [$tagName]);
		if(!$tag) {
			$tag = R::dispense("tag");
			$tag["name"] = $tagName;
			R::store($tag);
			return $tag;
		}
		return $tag;
	}
	static function getTagId($tagName) {
		return Tag::getTag($tagName)["id"];
	}
	static function deleteRedundantTag() {
		R::exec('delete from tag where id not in (select distinct tag_id from audio_tag)');
	}

} 
