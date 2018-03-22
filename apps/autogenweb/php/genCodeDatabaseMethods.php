<?php

	function generate_database_methods($keys, $values) {
		global $db,$code;

		// echo "++++++".$key;

		$filename = "database.php";
		// $code[$filename];
		$codes = "";


		$valuesHandler = $values["handler"];
		$valuesDatabase = $values["database"];

		if(isset($values["handler"]["methods"])){
			$valuesHandler = $values["handler"]["methods"];
			$valuesDatabase = $values["database"]["methods"];
		}

		foreach ($valuesHandler as $key => $value) {
			// echo "\n+++--+".$key;

			switch ($key) {
			case 'connect_to_database':
				$codes .= generate_code_handler_methods($key, $value);
				// echo "\n+++--+".$codes;
				break;

			}
		}

		$codes .= generate_database_methods_common();


		foreach ($valuesDatabase as $key => $value) {
			// echo "\n+++--+".$key;

			switch ($key) {
			case 'connect_database':
				$codes .= generate_database_methods_connect_database($key, $value);
				// echo "\n+++--+".$codes;
				break;
			case 'create_database':
				$codes.= generate_database_methods_create_database($key, $value);
				break;
			case 'create_table':
				$codes .= generate_database_methods_create_table($key, $value);
				break;
			case 'select_table':
				$codes .= generate_database_methods_select_table($key, $value);
				break;
			case 'insert_table':
				$codes .= generate_database_methods_insert_table($key, $value);
				break;
			case 'update_table':
				$codes .= generate_database_methods_update_table($key, $value);
				break;
			case 'delete_table':
				$codes .= generate_database_methods_delete_table($key, $value);
				break;
			case 'drop_table':
				$codes .= generate_database_methods_drop_table($key, $value);
				break;
			}
		}




		// echo "\n+++Code:+++\n".$codes;

		// echo "\n++--+--+".$codes;

		array_push($code, array($filename => $codes ));

	}


	function generate_database_methods_common() {
		return '
function filterInjectString($string) {
	foreach ($string["db_attributes"] as $key => $value) {
		$string["db_attributes"][$key]=preg_replace(\'/[^A-Za-z0-9\-=_]/\', \'\', $value);
	}
	return $string;
}
		';
	}

	function generate_database_methods_connect_database($key, $value) {
		$result =  "\nfunction ".$key."(\$key, \$value) {".
	'global $db;
//	print_r("<pre>");
	try {
		$db = new PDO(\'mysql:host=\'.$value["db_ip"].\';\',$value["db_username"],$value["db_password"]);
		$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		// var_dump($db);
//		print_r("connect_database: success\n");
	} catch (PDOException $e) {
		print_r("connect_database: error\n");
		$e->getMessage();
	}
//	print_r("</pre>");
}'."\n";
		return $result;
	}

	function generate_database_methods_create_database($key, $value) {
		$result = "\nfunction ".$key."(\$key, \$value) {".
	'global $db;
//	print_r("<pre>");
	try {
		// sql script.
		$sql = "CREATE DATABASE ".$value["db_name"].";";
//		print_r("create_database:".$sql."\n");
		// execute sql command.
		$cmd = $db->prepare($sql);
		$cmd->execute();
	} catch (PDOException $e) {
		$e->getMessage();
	}
//	print_r("</pre>");
}'."\n";return $result;
	}

	function generate_database_methods_drop_table($key, $value) {
		$result = "\nfunction ".$key."(\$key, \$value) {".
	'global $db;
//	print_r("<pre>");
	try {
		// sql script.
		$sql = "DROP TABLE ".$value["db_name"].".".$value["db_table_name"].";";
//		print_r("create_database:".$sql."\n");
		// execute sql command.
		$cmd = $db->prepare($sql);
		$cmd->execute();
	} catch (PDOException $e) {
		$e->getMessage();
	}
//	print_r("</pre>");
}'."\n";return $result;
	}


	function generate_database_methods_create_table($key, $value) {
		$result = "\nfunction ".$key."(\$key, \$value) {".
	'global $db;
//	print_r("<pre>");
	try {
		// sql script.
		$sql = "CREATE TABLE ".$value["db_name"].".".$value["db_table_name"]."(";
		foreach ($value["db_attributes"] as $key => $value) {
			$sql .= $key." ".$value.",";   // valid string later.
		}
		$sql = rtrim($sql, \',\') . ");";
//		print_r("create_table:".$sql."\n");
		// execute sql command.
		$cmd = $db->prepare($sql);
		$cmd->execute();
	} catch (PDOException $e) {
		$e->getMessage();
	}
//	print_r("</pre>");
}'."\n";return $result;
	}

	function generate_database_methods_select_table($key, $value) {
		$result = "\nfunction ".$key."(\$key, \$value) {".
	'global $db;
//	print_r("<pre>");
	try {
		// sql script.
		$sql = "SELECT ";
		if (gettype($value["db_attributes"])=="array" && count($value["db_attributes"])>0) {
			foreach ($value["db_attributes"] as $k => $v) {
				$sql .= $k.","; // valid string later.
			}
		} else {
			$sql .= "*";
		}
		// print_r($sql.$value["db_name"].".".$value["db_table_name"]);
		$sql = rtrim($sql, \',\');
		$sql .= " FROM ".$value["db_name"].".".$value["db_table_name"];
		if (gettype($value["db_values"])=="array" && count($value["db_values"]["condition"])>0) {
			$sql .= " WHERE ".$value["db_values"]["condition"].";";
		} else {
			$sql .= ";";
		}
		//.count($value["db_attributes"]).",".count($value["db_values"]["condition"])." "
//		print_r("select_table:".$sql."\n");
		// execute sql command.
		$cmd = $db->prepare($sql);
		$cmd->execute();
		// $result = $cmd->fetchObject();
		$result = $cmd->fetchAll();
//		print_r("select_table--result:".count($result)."\n");
		if (count($result)>0 ) {
//			print_r(json_encode($result)."\n");
			return json_encode($result);}else{return;
			}
	} catch (PDOException $e) {
		$e->getMessage();
	}
//	print_r("</pre>");
}'."\n";return $result;
	}

	function generate_database_methods_insert_table($key, $value) {
		$result = "\nfunction ".$key."(\$key, \$value) {".
	'global $db;
//	print_r("<pre>");
	try {
		if (gettype($value["db_attributes"])!="array" || count($value["db_attributes"])<1) {
			return;
		}
		$keys="";$values="";
		// sql script.
		$sql = "INSERT INTO ".$value["db_name"].".".$value["db_table_name"]." (";
		foreach ($value["db_attributes"] as $key => $value) {
			$keys .= $key.",";
			$values .= "\'".$value."\',";   // valid string later.
		}
		$keys = rtrim($keys, \',\');
		$values = rtrim($values, \',\');
		$sql .= $keys.") VALUES (".$values.");";
		// execute sql command.
//		print_r("insert_table:".$sql."\n");
		$cmd = $db->prepare($sql);
		$cmd->execute();
		$result = $cmd->fetchObject();
//		print_r("insert_table--result:".$result."\n");
	} catch (PDOException $e) {
		$e->getMessage();
	}
//	print_r("</pre>");
	}'."\n";return $result;
	}

	function generate_database_methods_update_table($key, $value) {
		$result = "\nfunction ".$key."(\$key, \$value) {".
	'global $db;
//	print_r("<pre>");
	try {
		if (gettype($value["db_attributes"])!="array" || count($value["db_attributes"])<1) {
			return;
		}
		$sets="";$values="";
		// sql script.
		$sql = "UPDATE ".$value["db_name"].".".$value["db_table_name"]." SET ";
		foreach ($value["db_attributes"] as $k => $v) {
			$sets .= $k."="."\'".$v."\',";// valid string later.
		}
		$sets = rtrim($sets, \',\');
		$sql .= $sets;
		if (gettype($value["db_values"])=="array" && count($value["db_values"]["condition"])>0) {
			$sql .= " WHERE ".$value["db_values"]["condition"].";";
		} else {
			$sql .= ";";
		}
		// execute sql command.
//		print_r("update_table:".$sql."\n");
		$cmd = $db->prepare($sql);
		$cmd->execute();
		$result = $cmd->fetchObject();
//		print_r("update_table--result:".$result."\n");
	} catch (PDOException $e) {
		$e->getMessage();
	}
//	print_r("</pre>");
	}'."\n";return $result;
	}

	function generate_database_methods_delete_table($key, $value) {
		$result = "\nfunction ".$key."(\$key, \$value) {".
	'global $db;
//	print_r("<pre>");
	try {
		if (gettype($value["db_values"])!="array" || count($value["db_values"])<1) {
			return;
		}
		$sets="";$values="";
		// sql script.
		$sql = "DELETE FROM ".$value["db_name"].".".$value["db_table_name"];
		if (gettype($value["db_values"])=="array" && count($value["db_values"]["condition"])>0) {
			$sql .= " WHERE ".$value["db_values"]["condition"].";";
		} else {
			$sql .= ";";
		}
		// execute sql command.
//		print_r("delete_table:".$sql."\n");
		$cmd = $db->prepare($sql);
		$cmd->execute();
		$result = $cmd->fetchAll();
//		print_r("delete_table--result:".count($result)."\n");
	} catch (PDOException $e) {
		$e->getMessage();
	}
//	print_r("</pre>");
}'."\n";return $result;
	}


?>