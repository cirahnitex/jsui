<?php

namespace Recommendation;


class CosineSimilarity {
	/**
	 * @param float[] $a1
	 * @param float[] $a2
	 * @return float
	 */
	public static function calculate($a1, $a2) {
		$a = CosineSimilarity::dotProduct($a1, $a2);
		$b = CosineSimilarity::getMod($a1) * CosineSimilarity::getMod($a2);
		return ($b > 0)?$a/$b:0;
	}

	/**
	 * @param float[] $a1
	 * @param float[] $a2
	 * @return float
	 */
	private static function dotProduct($a1, $a2) {
		$rtn = 0;
		for($i=0; $i<count($a1); $i++) {
			$rtn += $a1[$i] * $a2[$i];
		}
		return $rtn;
	}

	/**
	 * @param float[] $a
	 * @return float
	 */
	private static function getMod($a) {
		$rtn = 0;
		foreach($a as $val) {
			$rtn += $val * $val;
		}
		return sqrt($rtn);
	}
} 
