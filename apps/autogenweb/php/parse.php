<?php

	require "parseJson.php";

	function transform($data) {
		global $code;
		// initial 
		$code = array();

		// parse json data and generate code
		transform_json("",$data);

		// output code
	}


?>