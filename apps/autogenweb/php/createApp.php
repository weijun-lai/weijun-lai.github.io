<?php

	/* global variable */

	$data = json_decode(file_get_contents('php://input'), true) or die();

	// database connection PDO links variable
	$db; 

	// code generatinon result
	$code; 

	/* require files */
	require "parse.php";
	require "code.php";

	initial();

	function initial() {
		global $data,$db,$code;

		// parse json data and generate code
		transform($data);

		// output results
		codeGeneration();

	}

?>