<?php

namespace Recommendation;
use R;
use Rating;
require_once(__DIR__."/Recommendation.inc");
require_once(__DIR__."/NonContentBased.inc");
require_once(__DIR__."/RatingCountMatrix.inc");
require_once(__DIR__."/PredictedRatingItem.inc");

class UserBased extends NonContentBased {
	protected $similarityTable = "userbasedsimilarity";
	protected $objectTable = "user";

	/**
	 * @param string $userId
	 * @param string $itemId
	 * @return float
	 */
	public function predictRating($userId, $itemId) {
		// find all users that rated the item
		$aRating = R::find("rating","audio_id = ?", [$itemId]);
		// for each user
		$weightedRatingSum = 0;
		$similaritySum = 0;
		foreach($aRating as $rating) {
			// record weightedRating and similarity
			$similarity = $this->getSimilarity($userId, $rating["user_id"]);
			$similaritySum += $similarity;
			$weightedRatingSum += $similarity*$rating["value"];
		}
		// calculate predicted rating
		if($similaritySum <= 0) return 0;
		return $weightedRatingSum/$similaritySum;

	}


	protected function calculateSimilarity($uid1, $uid2) {
		$rcm = new RatingCountMatrix(Rating::N_RATING_VALUES);

		$aRow = R::getAll("
select r1.value as v1, r2.value as v2
from rating as r1
  join rating as r2
    on r1.audio_id = r2.audio_id
  where r1.user_id = ? and r2.user_id = ?", [$uid1, $uid2]);

		foreach($aRow as $row) {
			$rcm->alterValue($row['v1'], $row['v2']);
		}

		$totalCount = $rcm->getTotalCount();
		if($totalCount <= 0) return 0;
		return $rcm->getAgreementCount()/$totalCount;
	}
} 
