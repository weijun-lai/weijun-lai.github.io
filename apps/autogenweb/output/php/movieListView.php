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
$view_all_data_data=view_all_data();
echo '<p class="bg-primary">movieListView.php</p>';
		if(isset($_SESSION['username'])) {
		    echo "welcome " . $_SESSION['username'];
		}
        if($view_all_data_data!=NULL){
            echo '<table class="table table-striped table-hover" style="width:100%;" border="1">';
                    $firstRow=1;
                    foreach ($view_all_data_data as $key => $value) {
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
function view_all_data() {
	return json_decode(get_all_data());
}

?>

</body>
</html>