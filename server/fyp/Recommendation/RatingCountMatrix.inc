<?php
namespace Recommendation;
class RatingCountMatrix {
	private $matrix;
	private $size;
	public function __construct($size) {
		$this->size = $size;
		for($i=0; $i<$size; $i++) {
			$this->matrix[$i] = array_fill(0, $size, 0);
		}
	}

	/**
	 * increase the value at ($i, $j) by diff
	 * @param int $i
	 * @param int $j
	 * @param int $diff
	 */
	public function alterValue($i, $j, $diff = 1) {
		$this->matrix[$i][$j] += $diff;
	}

	/**
	 * count total number
	 * @return int
	 */
	public function getTotalCount() {
		$rtn = 0;
		foreach($this->matrix as $row) {
			foreach($row as $value) {
				$rtn += $value;
			}
		}
		return $rtn;
	}

	/**
	 * count number of agreement
	 * @return int
	 */
	public function getAgreementCount() {
		$rtn = 0;
		for($i=0; $i<$this->size; $i++) {
			$rtn += $this->matrix[$i][$i];
		}
		return $rtn;
	}

	/**
	 * count number of a band
	 * @param int $bandId
	 * @return int
	 */
	public function getBandCount($bandId) {
		$rtn = 0;
		for($i=0; ($i + $bandId) < $this->size; $i++) {
			$rtn += $this->matrix[$i][$i + $bandId];
			$rtn += $this->matrix[$i + $bandId][$i];
		}
		return $rtn;
	}
}
