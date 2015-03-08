<?php

namespace Recommendation;


class PredictedRatingItem {
	public $item;
	public $rating;

	/**
	 * @param mixed $item
	 * @param float $rating
	 */
	public function __construct($item, $rating) {
		$this->item = $item;
		$this->rating = $rating;
	}

} 
class PredictedRatingItemQueue extends \SplMinHeap {
	private $capacity;
	protected function compare($v1, $v2) {
		if($v1->rating < $v2->rating) return 1;
		else if($v1->rating > $v2->rating) return -1;
		else return 0;
	}

	/**
	 * @param int $capacity
	 */
	public function __construct($capacity) {
		$this->capacity = $capacity;
	}

	/**
	 * @param mixed $item
	 * @param float $rating
	 */
	public function insert($item, $rating) {
		parent::insert(new PredictedRatingItem($item, $rating));
		if($this->capacity && $this->count() > $this->capacity) {
			$this->extract();
		}
	}

	/**
	 * @return PredictedRatingItem[]
	 */
	public function toArray() {
		$rtn = [];
		foreach($this as $predictedRatingItem) {
			$rtn[] = $predictedRatingItem;
		}
		return array_reverse($rtn);
	}
	public function toArray2() {
		$aItem = [];
		$aRating = [];
		foreach($this as $predictedRatingItem) {
			$aItem[] = $predictedRatingItem->item;
			$aRating[] = $predictedRatingItem->rating;
		}
		return [array_reverse($aItem), array_reverse($aRating)];
	}

}
