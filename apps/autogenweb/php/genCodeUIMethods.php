<?php

	require_once "genCodeTamplate.php";

	function generate_ui_methods($key, $value) {
		global $db,$code;

		// print_r("\n#########".$key);

		$filename = "";
		// $code[$filename];
		// $codes = 'require_once "bookinghandler.php";'."\n";
		$codes = "";
		$codes_require = "";

		foreach ($value as $k => $v) {
			if (isset($v["filename"]) ) {
				if (isset($v["require_once"]) && $v["require_once"]!="") {
					$codes_require = "\n".'require_once "'.$v["require_once"].'";'."\n";
				}

				$filename = $v["filename"];
				// print_r("\n#########".$filename);

				$addCode = generate_code_ui_methods($k, $v);

				add_code_ui_toarray($code,$filename,$addCode,$codes_require);

			}
		}




	}

	function add_code_ui_toarray($code,$filename,$addCode,$codes_require) {
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

	function generate_code_ui_methods($key, $value) {
		global $data;
		if (gettype($value)!="array") {return;};
		$params="";
		$result="";

		$valueName='$'.$value["name"]."_data";
		$value_ = $valueName;

		$result=$valueName.'='.$value["name"]."();\n";
		// $result.="var_dump(\$viewBookedTime);\n";
		// $result="var_dump(".$value["name"]."());";

		$result.='echo \'<p class="bg-primary">'.$value["filename"].'</p>\';';

		$result.= '
		if(isset($_SESSION[\'username\'])) {
		    echo "welcome " . $_SESSION[\'username\'];
		}';

		if (isset($value["operate"]) ) {
			// insert table
			if ($value["operate"]=="insert"){
				$valueOldName = $valueName;
				$method = $value["operate"]=="login" ? "POST" :"GET";
				$valueName.='["db_attributes"]';
				$result.='
				if (isset($_'.$method.') && count($_'.$method.') > 0){
					if (isset($_'.$method.'["password"])) {$_'.$method.'["password"] = md5($_'.$method.'["password"]);}
					'.$valueName.' = $_'.$method.';
					'.$value["associate"]["call"].'('.$value_.');
					echo \'<br/><div class="alert alert-success" role="alert">Insert Data:success</div>\';
				}
				'.printNormalInsertForm($valueName,"insert");
			}

			// select table
			if ($value["operate"]=="select" || $value["operate"]=="search" || $value["operate"]=="login"){
				$valueOldName = $valueName;
				$method = $value["operate"]=="login" ? "POST" :"GET";
				$valueName.='["db_attributes"]';
				$condition = $value["operate"]=="login" ? "" : 'if($v==""){continue;}';
				$condition_login = $value["operate"]=="login" ? printLoginResult('$result_data') : printNormalTable('$result_data');
				$result.='
				if (isset($_'.$method.') && count($_'.$method.') > 0){
					if (isset($_'.$method.'["password"])) {$_'.$method.'["password"] = md5($_'.$method.'["password"]);}
					'.$valueName.' = $_'.$method.';
			 	 //   '.$value["associate"]["call"].'('.$value_.');
					foreach ('.$valueName.' as $k => $v) {
						'.$condition.'
						$v = preg_replace(\'/[^A-Za-z0-9\-=_]/\', \'\', $v);
						$m = is_numeric($v)?"":"\'";
						$condition .= $k."=".$m.$v.$m." and ";
					}
					'.$valueOldName.'["db_values"]["condition"] = substr($condition, 0, -4);
					$result_data = json_decode('.$value["associate"]["call"].'('.$valueOldName.'));
						'.$condition_login.'
				}
				'.printNormalInsertForm($valueName, $value["operate"],$method);
			}

		}

		// if none of operate found, it would be default printing.
		 if(!isset($value["operate"]) || $value["operate"]=="" || $value["operate"]==NULL || count($value["operate"])==0){
			// select table
			$result.= printNormalTable($valueName);
		}




		$result.="\nfunction ".$key."(";
		// $result.="\nfunction ".$value["name"]."(";
		foreach ($value["params"] as $k => $v) {
			$params.="$".$k.",";
		}
		$params = rtrim($params, ',');
		$result.=$params.") {\n";



		if (gettype($value["associate"])=="array" && count($value["associate"])>0) {

			if (isset($value["associate"]["scope"]) && $value["associate"]["scope"]!="" && count($value["associate"]["scope"])>0 ) {
				$scope = $value["associate"]["scope"];

				$scope = array_values($scope)[0];


				$scope["db_values"]["condition"]=$value["associate"]["condition"];
				$result.="\$value=".var_export($scope, TRUE).";\n";
			}



			 if(!isset($value["operate"]) || $value["operate"]=="" || $value["operate"]==NULL || count($value["operate"])==0){
				$result.="\treturn json_decode(".$value["associate"]["call"];
				$params="(";
				if($value["associate"]["params"]!=NULL || $value["associate"]["params"]!="") {
					foreach ($value["associate"]["params"] as $kp => $vp) {
						$params.=$vp.",";
					}
				}
				$params = rtrim($params, ',');
				$result.=$params."));\n";
			} else if (isset($value["operate"]) ) {
				$result.="\treturn \$value;\n";
			}


		};

		$result.="}\n";
		return $result;

	}


?>