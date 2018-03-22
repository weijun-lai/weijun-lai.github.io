<?php


function rmdir_recursive($dir) {
    foreach(scandir($dir) as $file) {
        if ('.' === $file || '..' === $file) continue;
        if (is_dir("$dir/$file")) rmdir_recursive("$dir/$file");
        else unlink("$dir/$file");
    }
    // rmdir($dir);
}

	if(isset($_POST)){
            var_dump($_POST);
            if($_POST["methods"] == "removeOutputFolder"){
                var_dump($_POST);
                rmdir_recursive('..//output//php');
        }
    }




?>