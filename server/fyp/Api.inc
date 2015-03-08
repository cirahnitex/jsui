<?php
session_start();
class Api {
	public $code;
	public $value = null;
	public $codes = [];
	/**
	 * @param int $code
	 * @param string $msg
	 */
	public function __construct($code = 200, $msg = null) {
		$this->code = $code;
		if($msg) $this->codes[$code] = $msg;
		$this->prepareCode(200, "ok");
		$this->prepareCode(400, "param error");
		$this->prepareCode(401, "unauthorized");
	}

	/**
	 * @param int $code
	 * @param string $msg
	 * @return $this
	 */
	public function setCode($code, $msg = null) {
		$this->code = $code;
		if($msg) $this->codes[$code] = $msg;
		return $this;
	}

	/**
	 * @param int $code
	 * @param string $msg
	 * @return $this;
	 */
	public function prepareCode($code, $msg) {
		$this->codes[$code] = $msg;
		return $this;
	}

	/**
	 * @param int $code
	 * @param string $msg
	 */
	public function response($code = null, $msg = null) {
		if($code) $this->setCode($code, $msg);
		die(json_encode([
			'code'=>$this->code,
			'msg'=>$this->codes[$this->code],
			'value'=>$this->value
		]));
	}

	/**
	 * @param string $name
	 * @return string
	 */
	public function strParam($name) {
		if(!isset($_REQUEST[$name])) $this->response(400);
		return $_REQUEST[$name];
	}

	/**
	 * @param $name
	 * @return int
	 */
	public function intParam($name) {
		if(!isset($_REQUEST[$name])) $this->response(400);
		if(!ctype_digit($_REQUEST[$name])) $this->response(400);
		return intval($_REQUEST[$name]);
	}

	/**
	 * @return string
	 */
	public function getActiveUserId() {
		if(!isset($_SESSION["activeUserId"])) $this->response(401);
		return $_SESSION["activeUserId"];
	}

	/**
	 * @param string $id
	 */
	public function setActiveUserId($id=null) {
		if(!$id) unset($_SESSION["activeUserId"]);
		$_SESSION["activeUserId"] = $id;
	}

}


