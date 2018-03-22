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
$view_search_data_data=view_search_data();
echo '<p class="bg-primary">movieSearchView.php</p>';
		if(isset($_SESSION['username'])) {
		    echo "welcome " . $_SESSION['username'];
		}
				if (isset($_GET) && count($_GET) > 0){
					if (isset($_GET["password"])) {$_GET["password"] = md5($_GET["password"]);}
					$view_search_data_data["db_attributes"] = $_GET;
			 	 //   search_data($view_search_data_data);
					foreach ($view_search_data_data["db_attributes"] as $k => $v) {
						if($v==""){continue;}
						$v = preg_replace('/[^A-Za-z0-9\-=_]/', '', $v);
						$m = is_numeric($v)?"":"'";
						$condition .= $k."=".$m.$v.$m." and ";
					}
					$view_search_data_data["db_values"]["condition"] = substr($condition, 0, -4);
					$result_data = json_decode(search_data($view_search_data_data));
						
        if($result_data!=NULL){
            echo '<table class="table table-striped table-hover" style="width:100%;" border="1">';
                    $firstRow=1;
                    foreach ($result_data as $key => $value) {
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
                            echo "<td><img src='".$v."' height='256' width='256'></td>";
                          } else {
                            echo "<td>".$v."</td>";
                          }
                        }
                      }
                      echo "</tr>";
                    }
                    echo "</table>";
                }else{echo '<br/><div class="alert alert-danger" role="alert">NULL</div>';};
				}
				
        if($view_search_data_data["db_attributes"]!=NULL && !isset($_SESSION['username'])){
            echo "<form action=\"#\" method=\"GET\">";
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
                    echo "<input type='submit' id='submit_btn' class='btn btn-lg btn-success' value='search' style='width:100%;' />";
                    echo "</form>";
                }else if($view_search_data_data["db_attributes"]==NULL){echo '<br/><div class="alert alert-danger" role="alert">NULL</div>';};
function view_search_data() {
$value=array (
  'db_name' => 'movieBooker',
  'db_table_name' => 'moiveBook',
  'db_values' => 
  array (
    'condition' => '',
  ),
  'db_attributes' => 
  array (
    'booked_time' => '',
    'movie_name' => '',
    'num_of_people' => '',
    'price' => '',
    'position' => '',
    'image' => '',
  ),
);
	return $value;
}

?>

</body>
</html>