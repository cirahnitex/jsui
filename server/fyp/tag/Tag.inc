<?php

class Tag {
	/**
	 * set the tags of an audio by an array if tag name
	 * creates new tags if the tag name doesnt exist
	 * remove redundant tags
	 * @param int $audioId
	 * @param string[] $aTagName
	 */
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

	/**
	 * @param int $audioId
	 * @param int[] $aTagId
	 */
	static function setTagWithoutCheck($audioId, $aTagId) {
		R::exec("delete from audio_tag where audio_id = ?",[$audioId]);
		foreach($aTagId as $tagId) {
			R::exec("insert into audio_tag (tag_id, audio_id) values (?,?)",[$tagId, $audioId]);
		}
	}
	/**
	 * get an array of tag names of all tags
	 * @return string[]
	 */
	static function listAllTagName() {
		$aTag = R::findAll('tag');
		$rtn = [];
		foreach($aTag as $tag) {
			$rtn[] = $tag['name'];
		}
		return $rtn;
	}

	/**
	 * @param int $audioId
	 * @return string[]
	 */
	static function listTagName($audioId) {
		$audio = R::load('audio', $audioId);
		$rtn = [];

		foreach($audio->sharedTagList as $tag) {
			$rtn[] = $tag->name;
		}
		return $rtn;
	}

	/**
	 * @param int $audioId
	 * @return int[] array
	 */
	static function listTagId($audioId) {
		$aRow = R::getAll('select distinct tag_id from audio_tag where audio_id = ?',[$audioId]);
		$rtn = [];
		foreach($aRow as $row) {
			$rtn[] = $row['tag_id'];
		}
		return $rtn;
	}

	/**
	 * @param string $tagName
	 * @return \RedBeanPHP\OODBBean
	 */
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

	/**
	 * @param string $tagName
	 * @return int
	 */
	static function getTagId($tagName) {
		return Tag::getTag($tagName)["id"];
	}
	static function deleteRedundantTag() {
		R::exec('delete from tag where id not in (select distinct tag_id from audio_tag)');
	}
	static function wipe() {
		R::wipe("audio_tag");
		wipe_improved("tag");
	}
} 
