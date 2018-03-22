var line;

var marginpx = '5';
var winWidth = 0;
var winHeight = 0;
var counter = 1;
var zindex = 1;
var topzindex = 9999;

var inputTypes = 
['text',
'button',
'checkbox',
'color',
'date',
'datetime ',
'datetime-local', 
'email',
'file',
'hidden',
'image',
'month',
'number',
'password',
'radio',
'range',
'reset',
'search',
'submit',
'tel',
'time',
'url',
'week'];

var elementTypes = ['input','select','object','associate'];
var dataTypes = ['text','number','password','radio'];
var styleTypes = ['normal','bigger','smaller'];

var layout_normal = {
	"id":{"elementType":"input","info":"object_div"},
	"type":{"elementType":"input","info":"object"},
	"title":{"elementType":"input","info":"object"},
	"style":{"elementType":"select","info":"normal"},
	"data":[
		{"name":"new","elementType":"input","dataType":"text","info":""}
	]
};

var layout_insert = {
	"id":{"elementType":"input","info":"insert_form_div"},
	"type":{"elementType":"input","info":"insert_form"},
	"title":{"elementType":"input","info":"insert member"},
	"style":{"elementType":"select","info":"normal"},
	"data":[
		{"name":"name","elementType":"input","dataType":"text","info":""},
		{"name":"age","elementType":"input","dataType":"text","info":"0-3,4-15,16-35,36-55,56+"},
		{"name":"gender","elementType":"input","dataType":"text","info":"male,female"},
		{"name":"father","elementType":"input","dataType":"text","info":""},
		{"name":"mother","elementType":"input","dataType":"text","info":""}
	]
};

var layout_update = {
	"id":{"elementType":"input","info":"insert_form_div"},
	"type":{"elementType":"input","info":"insert_form"},
	"title":{"elementType":"input","info":"insert member"},
	"style":{"elementType":"select","info":"normal"},
	"data":[
		{"name":"name","elementType":"input","dataType":"text","info":""},
		{"name":"age","elementType":"input","dataType":"text","info":"0-3,4-15,16-35,36-55,56+"},
		{"name":"gender","elementType":"input","dataType":"text","info":"male,female"},
		{"name":"father","elementType":"input","dataType":"text","info":""},
		{"name":"mother","elementType":"input","dataType":"text","info":""}
	]
};

var layouts = [layout_insert,layout_update];

function dragstarted(d) {}
function dragended(d) {}
function dragged(d) {
	// console.log(d3.event.x+" "+d3.event.y);
	var w = parseInt(d3.select(this).style("width"));
	var h = parseInt(d3.select(this).style("height"));
	d3.select(this)
	.style("left",(d3.event.x-w/2)+'px')
	.style("top", (d3.event.y-h/2)+'px');
};


function saveDataAsFile(data,filename)
{
	var textToWrite = data;
	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
	var fileNameToSaveAs = filename;

	var downloadLink = document.createElement("a");
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

function destroyClickedElement(event)
{
	document.body.removeChild(event.target);
}

function loadFileAsText(evt)
{
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
			console.log(textFromFileLoaded);
			var json_parsed_data = JSON.parse(textFromFileLoaded);
			console.log(json_parsed_data);
			$('#files').hide();

			var exampleMode = require(["app/model"],function(model){
				  model.show(
				  	d3.select("body"),
				  	json_parsed_data,
				  	winWidth*0.2,
				  	winHeight*0.2,
				  	++counter
				  	);
				});
			// json_parsed_data = [];
			$("#files").closest('form').trigger('reset');
			return json_parsed_data;
		}
	};
	// fileReader.readAsText(fileToLoad, "UTF-8");
	var blob = file.slice(0, file.size);
    fileReader.readAsBinaryString(blob);
}




// var drag =	d3.behavior.drag()
// 				.on('dragstart',dragstarted)
// 				.on("drag", dragged)
// 				.on("dragend", dragended);


// var layout_insert = {
// 	id:{type:'input',info:'insert_form_div'},
// 	type:{type:'input',info:'insert_form'},
// 	name:{type:'input',info:'insert member'},
// 	style:{type:'select',info:'normal'},
// 	data:{
// 		name:{type:'select',info:'string'},
// 		age:{type:'select',info:'number'},
// 		gender:{type:'select',info:'string'},
// 		father:{type:'select',info:'string'},
// 		mother:{type:'select',info:'string'}
// 	}
// };

// var layout_update = {
// 	id:{type:'input',info:'update_form_div'},
// 	type:{type:'input',info:'update_form'},
// 	name:{type:'input',info:'update member'},
// 	style:{type:'select',info:'normal'},
// 	data:{
// 		name:{type:'select',info:'string'},
// 		age:{type:'select',info:'number'},
// 		gender:{type:'select',info:'string'},
// 		father:{type:'select',info:'string'},
// 		mother:{type:'select',info:'string'},
// 		child:{type:'select',info:'string'}
// 	}
// };

// var layouts = [layout_insert,layout_update];




