<!DOCTYPE html>
<html>
<head>
	<title> web elements auto generation</title>
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="css/bootstrap.min.css">

	<!-- Optional theme -->
	<link rel="stylesheet" href="css/bootstrap-theme.min.css">

	<script src="js/jquery-1.11.3.min.js"></script>
	<script src="js/jquery-migrate-1.2.1.min.js"></script>


	<!-- Latest compiled and minified JavaScript -->
	<script src="js/bootstrap.min.js"></script>

	<script src="js/test.js"></script>
	<script src="js/define.js"></script>


</head>
<body>
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12 col-sm-12 col-xs-12">
				 <h3><pre>Automatic web-based graphical editor generation</pre></h3>
				<!-- <div class="col-md-5 col-sm-5 col-xs-5"> -->
					<a href="index.html" target="_blank" class="btn btn-success btn-block">Create</a>
					<input id="files" type="file" class="btn btn-primary btn-block" sytle=" display:none;"/>
				<!-- </div> -->
				<button onclick="app();" class="btn btn-success btn-lg btn-block">Generate</button>

				<!-- <div class="col-md-2 col-sm-2 col-xs-2"> -->
					<!-- <button onclick="loadfile();" class="btn btn-success btn-lg btn-block">Load file</button> -->

				<!-- </div> -->

				<div id="contents"></div>
			</div>

		</div>
	</div>

	<script src="js/main.js"></script>

</body>
</html>