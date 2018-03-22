
function app () {
	var contents = document.getElementById("contents");
	contents.innerHTML="Generating...<br/>";
	create_div();
}

function create_div() {
	var newDiv = document.createElement("div");
	var contents = document.getElementById("contents");
	contents.appendChild(newDiv);
	newDiv.innerHTML="";

	// var jsonString = JSON.stringify(app_json);
	// console.log(jsonString);
	// newDiv.innerHTML+="<pre>"+jsonString+"</pre><br/>";

	// newDiv.innerHTML+="Booking System:<br/>";
	// newDiv.innerHTML+="<pre>"+JSON.stringify(app_json.systems)+"</pre><br/>";
	var jdata = JSON.stringify(app_json);
	// console.log(jdata);

	ajax_post('php/createApp.php', jdata);

}



function loadfile(evt) {
	// console.log(evt);
	evt.stopPropagation();
    evt.preventDefault();

	// console.log(evt);
	// var fileToLoad = document.getElementById(id).files[0];
	var files = evt.target.files || (evt.dataTransfer && evt.dataTransfer.files);

    var file = files[0];

	var fileReader = new FileReader();
	fileReader.onload = function(evt)
	{
		if (evt.target.readyState == FileReader.DONE) {
			var textFromFileLoaded = evt.target.result;
			// document.getElementById(out_id).value = textFromFileLoaded;
			// console.log(textFromFileLoaded);
			var json_parsed_data = JSON.parse(textFromFileLoaded);
			app_json = json_parsed_data;
			app();
			// console.log(json_parsed_data);
			// ajax_post('php/createApp.php', JSON.stringify(json_parsed_data));
			return json_parsed_data;
		}
	};
	// fileReader.readAsText(fileToLoad, "UTF-8");
	var blob = file.slice(0, file.size);
    fileReader.readAsBinaryString(blob);

}

var el = document.getElementById('files').addEventListener('change', loadfile, false);

function saveDataAsFile(data,filename)
{
	var textToWrite = data;
	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
	var fileNameToSaveAs = filename;

	var downloadLink = document.createElement("a");
	downloadLink.target = "_blank";
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null)
	{
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	}
	else
	{
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}

	downloadLink.click();
}

function getJsonFile() {
	saveDataAsFile(JSON.stringify(app_json),app_json.app.name+".json");
}

function ajax_post(url,jsondata) {
	$.ajax({
		type: 'POST',
		url: url,
		data: jsondata, // or JSON.stringify ({name: 'jonas'}),
		success: function(data) {
			// console.log('ajax_success_data: ' + data);
			var newDiv = document.createElement("div");
			var contents = document.getElementById("contents");
			contents.innerHTML="";
			contents.appendChild(newDiv);

			// if(app_json.app.version==undefined){}
			var appinfo = app_json.app || app_json.App;
			jfilename = appinfo.name+"_"+appinfo.version;

			newDiv.innerHTML="<br/><pre>View:<a href='output/' target='_blank'>output</a>\
			 - Download <a href='output/output.zip' target='_blank'>output.zip</a>, <a href='javascript:getJsonFile()' target='_blank'>"+jfilename+".json"+"</a></pre>";
			newDiv.innerHTML+="<pre>Server respond data</pre>";
			newDiv.innerHTML+="<pre>"+data+"</pre><br/>";
		}
	});
}

function removeOutputFolder() {
	$.ajax({
		type: 'POST',
		url: 'php/funs.php',
		data: {methods: 'removeOutputFolder'}, // or JSON.stringify ({name: 'jonas'}),
		success: function(data) {
			console.log("remove Output Folder Done!");
		}
	});
}
