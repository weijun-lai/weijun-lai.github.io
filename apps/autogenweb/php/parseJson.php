<?php

	require "parseJsonDatabaseMethods.php";
	require "parseJsonHandlerMethods.php";
	require "parseJsonUIMethods.php";

	require "genCodeDatabaseMethods.php";
	require "genCodeHandlerMethods.php";
	require "genCodeUIMethods.php";


	function transform_json($tab,$value) {
		foreach ($value as $key => $value) {
			if (gettype($value)=="array") {
				print_r($tab.$key."\n");
				if (gettype($key)=="string"){$key=strtolower($key);}
				switch ($key) {
					// systems
					case 'database':
						transfrom_database_methods($key, $value);
						// generate_database_methods($key, $value);
						break;
					case 'handler': transfrom_handler_methods($key, $value);break;
					case 'ui': transfrom_ui_methods($key, $value);break;

					// Managers
					case 'managers': generate_database_methods($key, $value);break;
				}
				transform_json($tab."\t",$value);
			} else {
				print_r($tab.$key." : ".$value."\n");
			}
		}
	}

?>