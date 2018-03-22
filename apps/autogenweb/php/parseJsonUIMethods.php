<?php

	function transfrom_ui_methods($key, $value) {
		global $db,$code;
		// return;
		// print_r("Array KEYS:".$key."\n");
		if (gettype($key)=="string"){$key=strtolower($key);}
		switch ($key) {
			case 'database':
				transfrom_database_methods($key, $value);
				break;
			case 'methods':
				generate_ui_methods($key, $value);
				break;
			default:
				foreach ($value as $k => $v) {
					if (gettype($v)=="array") {
						transfrom_ui_methods($k, $v);
					}
				}
				break;
		}

	}

?>