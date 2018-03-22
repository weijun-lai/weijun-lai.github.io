<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
</head>
<body>

        
<?php

require_once "movieAccountHandler.php";
$view_search_data_data=view_search_data();
echo '<p class="bg-primary">movieLoginView.php</p>';
		if(isset($_SESSION['username'])) {
		    echo "welcome " . $_SESSION['username'];
		}
				if (isset($_POST) && count($_POST) > 0){
					if (isset($_POST["password"])) {$_POST["password"] = md5($_POST["password"]);}
					$view_search_data_data["db_attributes"] = $_POST;
			 	 //   search_data($view_search_data_data);
					foreach ($view_search_data_data["db_attributes"] as $k => $v) {
						
						$v = preg_replace('/[^A-Za-z0-9\-=_]/', '', $v);
						$m = is_numeric($v)?"":"'";
						$condition .= $k."=".$m.$v.$m." and ";
					}
					$view_search_data_data["db_values"]["condition"] = substr($condition, 0, -4);
					$result_data = json_decode(search_data($view_search_data_data));
						
      if($result_data!=NULL){
        echo '<br/><div class="alert alert-success" role="alert">'.$result_data[0]->username.' login success</div>';
        $_SESSION['username'] = $result_data[0]->username;
        // setcookie("username", $result_data[0]->username, time() + (86400 * 30), "/");
        // echo setcookie("username", $username, time() + (86400 * 30),"/","localhost");
        //setcookie("username", $result_data[0]->username, time()+3600,"/");  /* expire in 1 hour */
      }else{echo '<br/><div class="alert alert-danger" role="alert">Invalid username or password.</div>';};
				}
				
        if($view_search_data_data["db_attributes"]!=NULL && !isset($_SESSION['username'])){
            echo "<form action=\"#\" method=\"POST\">";
                echo "<table class='table table-striped table-hover' style='width:100%;' border='0'>";
                    foreach ($view_search_data_data["db_attributes"] as $k => $v) {
                        echo "<tr>";
                        echo "<td>".$k."</td>";
                        $onchangeEvent = ($k=='email'?'onchange="this.style.borderColor=(this.value.indexOf(\'.\')==-1 || this.value.indexOf(\'@\')==-1)?(\'red\'):(\'green\');"':'');
                        //echo "<td><input type='text' id='id_".$k."' name='".$k."' value='"."' style='width:100%;' /></td>";
                        echo "<td><input type='".($k=='password'?'password':($k=='email'?'email':'text'))."' id='id_".$k."' name='".$k."' value='"."' style='width:100%;' ".$onchangeEvent." /></td>";
                        echo "</tr>";
                    }
                    echo "</table>";
                    echo "<input type='submit' id='submit_btn' class='btn btn-lg btn-success' value='login' style='width:100%;' />";
                    echo "</form>";
                }else if($view_search_data_data["db_attributes"]==NULL){echo '<br/><div class="alert alert-danger" role="alert">NULL</div>';};
function view_search_data() {
$value=array (
  'db_name' => 'movieBooker',
  'db_table_name' => 'account',
  'db_values' => 
  array (
    'condition' => '',
  ),
  'db_attributes' => 
  array (
    'username' => '',
    'password' => '',
  ),
);
	return $value;
}

?>

</body>
</html>