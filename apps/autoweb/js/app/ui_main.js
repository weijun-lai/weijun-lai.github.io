
requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    shim: {
    	bootstrap: ["jquery"],
    	jquery: {exports: '$'},
        underscore: {exports: '_'},
        d3: { exports: 'd3' },
        globel:  { exports: 'globel' }
    },
    paths: {
        // app: '../app'
        'jquery':'vendor/jquery-1.10.2',
        'jqueryui':'vendor/jquery-ui',
        'bootstrap':'vendor/bootstrap',
        'underscore':'vendor/underscore',
        'd3': 'vendor/d3.v3.min',
        'globel':'app/globel'
    }
});

// Start the main app logic.
var allmodules = requirejs(['jquery', 'jqueryui', 'bootstrap','underscore','d3','globel'],
function   (jquery, jqueryui, bootstrap,ignore,d3,globel) {
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.
    // console.log(d3.version);
    initial();
});




function initial() {
	// define(function() {
		// console.log(parseInt());

		winWidth = $(window).width();
		winHeight = $(window).height();

		$(window).resize(function() {
			winWidth = $(window).width();
			winHeight = $(window).height();
			ui_main_div
			.style("width", (winWidth)*0.8+'px')
			.style("height", (winHeight)*0.8+'px')
			.style("left",winWidth*0.1+"px")
			.style("top",winHeight*0.1+"px");
		});

		var ui_log_div = d3.select("body")
			.append("div")
			.attr("id","ui_log_div")
			.style('color','#fff')
			.style("position","fixed")
			.style("left","0px")
			.style("top","0px")
			.style('z-index', 1001)
			//.style('background-color','rgba(250,210,200,0.75)')

		// $( document ).on( "mousemove", function( event ) {
		//   $( "#ui_log_div" ).text( "pageX: " + event.pageX + ", pageY: " + event.pageY );
		// });
		var svg = d3.select("body").append("svg")
			.attr('width',winWidth)
			.attr('height',winHeight)


		line = svg.append("line")
				.attr("stroke-width", 5)
		        .style("stroke", "red")


		var ui_main_div = d3.select("body")
			.append("div")
			.attr("id","ui_main_div")
			.style('border','2px solid rgba(0,0,0,0.75)')
			.style('background-color','rgba(0,0,0,.5)')
			.style("margin",marginpx+'px')
			// .style("padding",marginpx*2+'px')
			.style("width",  winWidth*0.8+'px')
			.style("height", winHeight*0.8+'px')
			.style("position","absolute")
			.style("left",winWidth*0.1+"px")
			.style("top",winHeight*0.1+"px");

		var ui_menu_div = d3.select("body")
			.append("div")
			.attr("id","ui_menu_div")
			.style('border','2px solid rgba(0,0,0,0.75)')
			.style('background-color','rgba(200,200,200,.75)')
			.style("margin",marginpx+'px')
			.style("position","fixed")
			.style("left","30px")
			.style("top","30px")
			.style("cursor", "move")
			.style('z-index', 1000)
			.append('span')
			.text('menu')
			.style("padding",marginpx+'px');

		$("#ui_menu_div" ).draggable({
			start:	function() { $(this).css({'z-index': 9999}); }
            // stop: function() { $(this).css({'z-index': ++zindex}); } 
		});

		var offsetx = 0,offsety=0, formIndex=0;
		// var formDivs = ['insert_form','update_form'];ss


		var buttons = d3.select("#ui_menu_div")
		.selectAll("button")
		.data(['add model','load model','generate']);
		// .data(['save','load','reset']);

		buttons = buttons.enter()
			.append("button")
			// .attr('class','btn btn-default')
			.attr("name",function(d,i){return i;})
			.style("width","100%")
			.style("display","list-item");
		// fill the buttons with the year from the data assigned to them
		buttons.each(function (d) {
			this.innerText = d;
		});

		buttons.on("click", function(d){
			if (this.innerText == 'load model') {
				$('#files').toggle();
			}
			// if (formIndex>=layouts.length) return;
			if (this.innerText == 'add model') {
				var exampleMode = require(["app/model"],function(model){
				  model.show(
				  	d3.select("body"),
				  	layouts[(formIndex++)],
				  	winWidth*0.2+offsetx,
				  	winHeight*0.2+offsety,
				  	++counter
				  	);
				  // offsetx += 170; 
				  // offsety += 0;
				  formIndex %= (layouts.length-1);
				});
			}
			
		});

		var button_file = d3.select("#ui_menu_div")
		.append('div')
		.style("position","absolute")
		.style('background-color','rgba(255,255,255,.75)')
		// .style("margin",marginpx+'px')
		.style('left','100%')
		.style('top','42%')
		.style('width','200px')
		.append('form')
		.append('input')
	    .attr("id", "files")
	    .attr("type", "file")
		.attr('class','btn btn-default')
		.style('width','200px')
	    // .on('click',function(){
	    // 	loadFileAsText(this);
	    // });
		
	    document.getElementById('files').addEventListener('change', loadFileAsText, false);
	    $('#files').hide();
	    // $(":files").filestyle({input: false});

}



