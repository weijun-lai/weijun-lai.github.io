<?php


	// $codeTest = array(
	// 			"handler.php" => "code",
	// 			"view.php" => "code",
	// 			"login.php" => "code",
	// 			"handler.js" => "code",
	// 			"view.js" => "code",
	// 			"login.js" => "code"
	// );

	// print_r("<pre>");
	// $code=$codeTest;
	// // var_dump($codes);
	// codeGeneration();
	// print_r("</pre>");

	require_once "zipFolder.php";
	require_once "genCodeTamplate.php";

	function codeGeneration()
	{
		global $code;

		// var_dump($code);

		$date = date("Ymdgisa");

		print_r("\n\n######### code generation: #########\n");
		foreach ($code as $index => $c) {

			foreach ($c as $file => $codes) {
				$format = explode(".", $file);
				$path = "../output/".$format[1]."/";
				$filename = strtolower($format[0]);
				$result = (stristr($filename, 'view')===FALSE) ? "": printPageHeader();
				$result .= "\n<?php\n".$codes."\n?>\n";
				$result .= (stristr($filename, 'view')===FALSE) ? "": printPageFooter();
				write($path,$file, $result);
				print_r("\n"
					.$path
					.$file."\n"
					.$codes
					." \n");
			}

		}
		// zipFolder("../output/","../output/output-".$date.".zip");
		// zipFolder("../output/php","../output/output.zip");
		zipFolder("../output/","../output/output.zip");
	}

	function write($path,$file, $data)
	{
		if (!file_exists($path)) {mkdir($path, 0777);chmod($path,0777);}
		file_put_contents($path.$file, $data);
		// file_put_contents($path.$file, $code, FILE_APPEND | LOCK_EX);
		// $f = fopen($filename, "wb") or die("Unable to open file!");
		// fwrite($f, $data);
		// fclose($f);
	}

?>