<?php
namespace Recommendation;
require_once(__DIR__."/../global.inc");
use R;
class Recommendation {

	/**
	 * @param string $id1
	 * @param string $id2
	 * @return string[] ASC ordered-
	 */
	protected function orderId($id1, $id2) {
		if($id1 < $id2) {
			return [$id1, $id2];
		}
		else {
			return [$id2, $id1];
		}
	}

	/**
	 * find top-N recommendation
	 * @param string $userId
	 * @param int $num
	 */
	public function recommend($userId, $num) {
		// find all items that the user has not rated
		$aItem = R::find("audio", "id not in (select audio_id from rating where user_id = ?)", [$userId]);

		$queue = new PredictedRatingItemQueue($num);
		foreach($aItem as $item) {
			$ratingValue = $this->predictRating($userId, $item->id);
			$queue->insert($item, $ratingValue);
		}
		return $queue->toArray2();

	}

	public function predictRating($userId, $itemId) {
		return 0.0;
	}
}

