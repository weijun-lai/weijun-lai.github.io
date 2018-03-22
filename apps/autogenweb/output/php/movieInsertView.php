<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
</head>
<body>

        
<?php

require_once "moviehandler.php";
$view_add_data_data=view_add_data();
echo '<p class="bg-primary">movieInsertView.php</p>';
		if(isset($_SESSION['username'])) {
		    echo "welcome " . $_SESSION['username'];
		}
				if (isset($_GET) && count($_GET) > 0){
					if (isset($_GET["password"])) {$_GET["password"] = md5($_GET["password"]);}
					$view_add_data_data["db_attributes"] = $_GET;
					add_new_data($view_add_data_data);
					echo '<br/><div class="alert alert-success" role="alert">Insert Data:success</div>';
				}
				
        if($view_add_data_data["db_attributes"]!=NULL && !isset($_SESSION['username'])){
            echo "<form action=\"#\" method=\"\">";
                echo "<table class='table table-striped table-hover' style='width:100%;' border='0'>";
                    foreach ($view_add_data_data["db_attributes"] as $k => $v) {
                        echo "<tr>";
                        echo "<td>".$k."</td>";
                        $onchangeEvent = ($k=='email'?'onchange="this.style.borderColor=(this.value.indexOf(\'.\')==-1 || this.value.indexOf(\'@\')==-1)?(\'red\'):(\'green\');"':'');
                        //echo "<td><input type='text' id='id_".$k."' name='".$k."' value='"."' style='width:100%;' /></td>";
                        echo "<td><input type='".($k=='password'?'password':($k=='email'?'email':'text'))."' id='id_".$k."' name='".$k."' value='"."' style='width:100%;' ".$onchangeEvent." /></td>";
                        echo "</tr>";
                    }
                    echo "</table>";
                    echo "<input type='submit' id='submit_btn' class='btn btn-lg btn-success' value='insert' style='width:100%;' />";
                    echo "</form>";
                }else if($view_add_data_data["db_attributes"]==NULL){echo '<br/><div class="alert alert-danger" role="alert">NULL</div>';};
function view_add_data() {
$value=array (
  'db_table_name' => 'moiveBook',
  'db_attributes' => 
  array (
    'booked_time' => '',
    'movie_name' => '',
    'num_of_people' => '',
    'price' => '',
    'position' => '',
    'image' => '',
  ),
  'db_values' => 
  array (
    'condition' => '',
  ),
  'db_name' => 'movieBooker',
);
	return $value;
}

?>

</body>
</html>