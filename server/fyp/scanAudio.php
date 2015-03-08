<?php
require_once('global.inc');
$api = new Api();
$api->value = 0;
const REG_PATTERN = '/\\.(mp3|wav|ogg)$/';
const DIR_TO_SCAN = "audioStatic";

wipe_improved("audio");


/* get the absolute path and ensure it has a trailing slash */
$path = realpath(DIR_TO_SCAN);

$GLOBALS["rootPath"] = $path;

if (substr($path, -1) !== DIRECTORY_SEPARATOR)
	$path .= DIRECTORY_SEPARATOR;

$queue = array($path => 1);
$done  = array();
$index = 0;

function encodeURI($url) {
	// http://php.net/manual/en/function.rawurlencode.php
	// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/encodeURI
	$unescaped = array(
	  '%2D'=>'-','%5F'=>'_','%2E'=>'.','%21'=>'!', '%7E'=>'~',
	  '%2A'=>'*', '%27'=>"'", '%28'=>'(', '%29'=>')'
	);
	$reserved = array(
	  '%3B'=>';','%2C'=>',','%2F'=>'/','%3F'=>'?','%3A'=>':',
	  '%40'=>'@','%26'=>'&','%3D'=>'=','%2B'=>'+','%24'=>'$'
	);
	$score = array(
	  '%23'=>'#'
	);
	return strtr(rawurlencode($url), array_merge($reserved,$unescaped,$score));

}
function getUrl($realPath) {
	$rtn = encodeURI(DIR_TO_SCAN.str_replace("\\","/",substr($realPath, strlen($GLOBALS["rootPath"]))));
	return str_replace('#','%23', $rtn);
}

function handleMatch($path, $filename) {
	$realPath = $path.$filename;
	$audio = R::dispense("audio");
	$audio->url = getUrl($realPath);

	// get file name as name
	$audio->name = $filename;

	// get dir name as category
	$aDir = explode(DIRECTORY_SEPARATOR, $path);
	$category = $aDir[count($aDir) - 2];
	$audio->category = $category;

	R::store($audio);
}


while(!empty($queue)) {
	/* get one element from the queue */
	foreach($queue as $path => $unused) {
		unset($queue[$path]);
		$done[$path] = null;
		break;
	}
	unset($unused);

	$dh = @opendir($path);
	if (!$dh) continue;
	while(($filename = readdir($dh)) !== false) {
		/* dont recurse back up levels */
		if ($filename == '.' || $filename == '..')
			continue;

		/* dont visit none-ascii path */
		if(preg_match('/[^\x00-\x7F]/', $filename))
			continue;


		/* check if the filename matches the search term */
		if (preg_match(REG_PATTERN, $filename)) {
			handleMatch($path, $filename);
			$api->value++;
		}

		/* get the full path */
		$filename = $path . $filename;


		/* resolve symlinks to their real path */
		if (is_link($filename))
			$filename = realpath($filename);

		/* queue directories for later search */
		if (is_dir($filename)) {
			/* ensure the path has a trailing slash */
			if (substr($filename, -1) !== DIRECTORY_SEPARATOR)
				$filename .= DIRECTORY_SEPARATOR;

			/* check if we have already queued this path, or have done it */
			if (array_key_exists($filename, $queue) || array_key_exists($filename, $done))
				continue;

			/* queue the file */
			$queue[$filename] = null;
		}
	}
	closedir($dh);
}
$api->response();
