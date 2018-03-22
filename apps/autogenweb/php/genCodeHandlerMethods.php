<?php

	function generate_handler_methods($key, $value) {
		global $db,$code;

		// print_r("\n#########".$key);

		$filename = "";
		// $code[$filename];
		// $codes = 'require_once "database.php";'."\n";
		$codes = "";
		$codes_require = "";

		foreach ($value as $k => $v) {
			if (isset($v["filename"]) ) {
				if (isset($v["require_once"]) && $v["require_once"]!="") {
					$codes_require = "\n".'require_once "'.$v["require_once"].'";'."\n";
				}

				$filename = $v["filename"];
				// print_r("\n#########".$filename);
				$addCode = generate_code_handler_methods($k, $v);

				add_code_handler_toarray($code,$filename,$addCode,$codes_require);

			}
		}
	}

	function add_code_handler_toarray($code,$filename,$addCode,$codes_require) {
		global $db,$code;
		foreach ($code as $index => $variable) {
			foreach ($variable as $key => $value) {
				if ($key==$filename) {
					$code[$index][$key] .= $addCode;
					return TRUE;
				}
			}
		}
		if ($filename!="") {
			$addCode = $codes_require.$addCode;
			array_push($code, array($filename => $addCode ));
		}
		return FALSE;
	}

	function generate_code_handler_methods($key, $value) {
		global $data;
		if (gettype($value)!="array") {return;};
		$params="";
		$result="";

		if ($value["name"]=="connect_to_database") {
			$result=$value["name"]."();";
		}

		// $result=$value["name"]."();";

		$result.="\nfunction ".$key."(";
		// $result.="\nfunction ".$value["name"]."(";
		foreach ($value["params"] as $k => $v) {
			$params.="$".$k.",";
		}
		$params = rtrim($params, ',');
		$result.=$params.") {\n";


		if (gettype($value["associate"])=="array"  && count($value["associate"])>0) {

			if (isset($value["associate"]["scope"]) && $value["associate"]["scope"]!="" && count($value["associate"]["scope"])>0 ) {
				// $value["associate"]["scope"]

				// $arraydata = $data;
				$scope = $value["associate"]["scope"];

				$scope = array_values($scope)[0];

				$scope["db_values"]["condition"]=$value["associate"]["condition"];
				$result.="\$value=".var_export($scope, TRUE).";\n";

			}


			$result.="\treturn ".$value["associate"]["call"];
			$params="(";
			if($value["associate"]["params"]!=NULL || $value["associate"]["params"]!="") {
				foreach ($value["associate"]["params"] as $kp => $vp) {
					$params.=$vp.",";
				}
				$params = rtrim($params, ',');
			}
			$result.=$params.");\n";
		};

		$result.="}\n";
		// print_r($result);
		return $result;

	}


?>