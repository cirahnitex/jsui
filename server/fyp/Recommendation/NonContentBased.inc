<?php

namespace Recommendation;
require_once(__DIR__."/Recommendation.inc");
use R;
use Exception;

class NonContentBased extends Recommendation {
	protected $similarityTable;
	protected $objectTable;
	/**
	 * find the top-N similar object
	 * @param string $id
	 * @param int $num
	 * @return (string[], float[]) array of id
	 */
	public function findSimilarObject($id, $num) {
		$aSimRec = R::convertToBeans($this->similarityTable, R::getAll("select * from ".$this->similarityTable." where id1 = ? or id2 = ? order by value DESC limit ?",[$id, $id, $num]));
		$aUid = [];
		$aSimilarity = [];
		foreach($aSimRec as $simRec) {
			if($simRec->id1 !== $id)
			{
				$aUid[]=$simRec->id1;
				$aSimilarity[] = $simRec->value;
			}
			else if($simRec->id2 !== $id)
			{
				$aUid[]=$simRec->id2;
				$aSimilarity[] = $simRec->value;
			}
		}
		return [$aUid, $aSimilarity];
	}

	public function getSimilarity($id1, $id2) {
		if($id1 === $id2) return 1;
		list($id1,$id2) = $this->orderId($id1, $id2);
		$simRecord = R::findOne($this->similarityTable, "id1 = ? and id2 = ?",[$id1, $id2]);
		return $simRecord->value;
	}

	/**
	 * update all similarities
	 */
	public function updateSimilarity() {
		R::wipe($this->similarityTable);
		$aObject = R::findAll($this->objectTable);
		R::begin();
		foreach($aObject as $i => $iObject) {
			foreach($aObject as $j => $jObject) {
				if($j <= $i) continue;
				$this->updateSimilarity2($aObject[$i]->id, $aObject[$j]->id);
			}
		}
		try{
			R::commit();
		}
		catch(Exception $e){R::rollback();}
	}


	/**
	 * update similarities for a given object
	 * @param string $objectId
	 */
	public function updateSimilarity1($objectId) {
		$aObject = R::findAll($this->objectTable);

		foreach($aObject as $object) {
			// ignore this user itself
			if($object->id == $objectId) continue;
			$this->updateSimilarity2($objectId, $object->id);
		}

	}


	/**
	 * update similarity for 2 objects
	 * @param $id1
	 * @param $id2
	 */
	private function updateSimilarity2($id1, $id2) {
		list($id1,$id2) = $this->orderId($id1, $id2);
		$sim = $this->calculateSimilarity($id1, $id2);
		$simRecord = R::findOne($this->similarityTable, "id1 = ? and id2 = ?", [$id1, $id2]);
		if(!$simRecord) {
			$simRecord = R::dispense($this->similarityTable);
			$simRecord->id1 = $id1;
			$simRecord->id2 = $id2;
		}
		$simRecord->value = $sim;
		R::store($simRecord);
	}

	protected function calculateSimilarity($id1, $id2) {
		return 0.0;
	}
} 
