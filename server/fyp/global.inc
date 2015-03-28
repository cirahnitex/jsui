<?php
require_once __DIR__."/redbean/rb.php";
require_once __DIR__."/Api.inc";
require_once __DIR__."/Rating.inc";

R::setup('mysql:host=localhost;dbname=fyp',
  'root','122333');
R::useWriterCache(true);

function wipe_improved($tableName) {
	R::exec("DELETE FROM $tableName");
	R::exec("ALTER TABLE $tableName AUTO_INCREMENT = 1;");
}
