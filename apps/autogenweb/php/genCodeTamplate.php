<?php


    function printLoginResult($result_data) {
      return '
      if('.$result_data.'!=NULL){
        echo \'<br/><div class="alert alert-success" role="alert">\'.$result_data[0]->username.\' login success</div>\';
        $_SESSION[\'username\'] = $result_data[0]->username;
        // setcookie("username", $result_data[0]->username, time() + (86400 * 30), "/");
        // echo setcookie("username", $username, time() + (86400 * 30),"/","localhost");
        //setcookie("username", $result_data[0]->username, time()+3600,"/");  /* expire in 1 hour */
      }else{echo \'<br/><div class="alert alert-danger" role="alert">Invalid username or password.</div>\';};';
    }

    function printNormalTable($result_data) {
        return '
        if('.$result_data.'!=NULL){
            echo \'<table class="table table-striped table-hover" style="width:100%;" border="1">\';
                    $firstRow=1;
                    foreach ('.$result_data.' as $key => $value) {
                      if ($firstRow==1) {
                        echo "<tr>";
                      foreach ($value as $k => $v) {
                        if (!is_numeric($k)){
                          echo "<td>".$k."</td>";
                        }
                      }
                      echo "</tr>";$firstRow=0;
                      }
                      echo "<tr>";
                      foreach ($value as $k => $v) {
                        if (!is_numeric($k)){
                          if ($k=="image") {
                            echo "<td><img src=\'".$v."\' height=\'256\' width=\'256\'></td>";
                          } else {
                            echo "<td>".$v."</td>";
                          }
                        }
                      }
                      echo "</tr>";
                    }
                    echo "</table>";
                }else{echo \'<br/><div class="alert alert-danger" role="alert">NULL</div>\';};';
    }

    function printNormalInsertForm($result_data,$button_value, $method) {
        return '
        if('.$result_data.'!=NULL && !isset($_SESSION[\'username\'])){
            echo "<form action=\"#\" method=\"'.$method.'\">";
                echo "<table class=\'table table-striped table-hover\' style=\'width:100%;\' border=\'0\'>";
                    foreach ('.$result_data.' as $k => $v) {
                        echo "<tr>";
                        echo "<td>".$k."</td>";
                        $onchangeEvent = ($k==\'email\'?\'onchange="this.style.borderColor=(this.value.indexOf(\\\'.\\\')==-1 || this.value.indexOf(\\\'@\\\')==-1)?(\\\'red\\\'):(\\\'green\\\');"\':\'\');
                        //echo "<td><input type=\'text\' id=\'id_".$k."\' name=\'".$k."\' value=\'"."\' style=\'width:100%;\' /></td>";
                        echo "<td><input type=\'".($k==\'password\'?\'password\':($k==\'email\'?\'email\':\'text\'))."\' id=\'id_".$k."\' name=\'".$k."\' value=\'"."\' style=\'width:100%;\' ".$onchangeEvent." /></td>";
                        echo "</tr>";
                    }
                    echo "</table>";
                    echo "<input type=\'submit\' id=\'submit_btn\' class=\'btn btn-lg btn-success\' value=\''.$button_value.'\' style=\'width:100%;\' />";
                    echo "</form>";
                }else if('.$result_data.'==NULL){echo \'<br/><div class="alert alert-danger" role="alert">NULL</div>\';};';
    }



    function printPageHeader(){
        return '<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
</head>
<body>

        ';
    }

    function printPageFooter(){
        return '
</body>
</html>';
    }




?>