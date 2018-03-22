define(function(model) {
	var layout;
	var counter = 0;
	var model_id;
	var drap_id;
	var drap_2_id;

	console.log("Require: model.js");

	function model(div){
		// console.log("div: "+div);
	}


	return {
		show: function(div,layout,x,y,count) {


			var model_ui = div.append("div")
			.attr("id",layout.id.info+count)
			.style('border','2px solid rgba(0,0,0,0.75)')
			.style('background-color','rgba(200,200,200,.75)')
			.style("margin",marginpx+'px')
			.style("padding",marginpx+'px')
			.style("position","fixed")
			.style("left",x+"px")
			.style("top",y+"px")
			.style("cursor", "move")
			.style('z-index', ++zindex);
			// .call(
			// 	d3.behavior.drag()
			// 	.on('dragstart',dragstarted)
			// 	.on("drag", dragged)
			// 	.on("dragend", dragended)
			// )
			var element_ui = model_ui.append("div")
			.style('background-color','rgba(200,200,200,.75)')
			.style("padding",marginpx+'px')
			.append('span')
			.text('Model'.toUpperCase())
			.style("padding",marginpx+'px')
			// .style("display","list-item")
			var e,s;
			// console.log(layout);
			for (var d in layout) {
				// console.log(layout[d]);
				// for (var dd in layout[d]) {
					// console.log(d);
					var text = d+": "+layout[d].info;
					
					// if (typeof layout[d] == 'object') {
					if (d == 'data') {
						text = d;
						e = element_ui//.append('li')
						.append('span')
						// .style('background-color','rgba(25,200,25,.75)')
						.text(text.toUpperCase())
						// continue;
					} else {
						e = element_ui.append('li')
						// .style('background-color','rgba(25,200,25,.75)')
						.append('span')
						.text(d+' :')
					}

					// .style("display","list-item")
					// if (typeof layout[d][dd] == 'object') {
					if (d == 'data') {
						for (var dd in layout[d]) {
							if (layout[d][dd]==null){continue;}
							s = element_ui.append('li')
							.attr('id','li_'+dd)
							.style('width','100%')
							// .style('background-color','rgba(255,255,255,.75)')

							s.append('input')
							.attr('type','text')
							.attr('name',dd)
							.attr('value',layout[d][dd].name)
							.style('width','30%')
							.on('change',function(m){
								layout['data'][''+this.name].name = this.value;
								console.log(this);
								console.log(layout['data'][''+this.name].name);
								console.log(this.value);
							});


							el = s.append('select')
							.attr('name',dd)
							.attr('id','elementType'+dd)
							.attr('value',layout[d][dd].elementType)
							.style('width','20%')
							.attr('class','btn btn-default')
							.on('change',function(){
								layout['data'][''+this.name].elementType = this.value;
								console.log(this.value);
								console.log(this.name);
								console.log(layout['data'][''+this.name]);
								// console.log(s.select("#info"+this.name));
								if (this.value == 'select') {
									d3.select("#btn"+this.name).style('visibility','hidden')
									d3.select("#dataType"+this.name).style('visibility','hidden')
									d3.select("#info"+this.name).style('visibility','visible')
									// $("#info"+this.name).show();
								}
								if (this.value == 'input') {
									// $("#info"+this.name).hide();
									d3.select("#btn"+this.name).style('visibility','hidden')
									d3.select("#dataType"+this.name).style('visibility','visible')
									d3.select("#info"+this.name).style('visibility','hidden')

								}
								if (this.value == 'associate') {
									// $("#info"+this.name).hide();
									d3.select("#btn"+this.name).style('visibility','visible')
									d3.select("#dataType"+this.name).style('visibility','hidden')
									d3.select("#info"+this.name).style('visibility','hidden')
								}
							});

							el.selectAll("option").data(elementTypes).enter()
							.append('option')
							.attr('value',function(m){return m;})
							.html(function(m){return m;})

							



							// if (layout[d][dd].elementType=='input') {
							// 	s.append(layout[d][dd].elementType)
							// 	.attr('type','text')
							// 	.attr('value',layout[d][dd].dataType)
							// 	.style('width','50%');
							// }

							// if (layout[d][dd].elementType=='select') {
								ss = s.append('select')
								.attr('name',dd)
								.attr('id','dataType'+dd)
								.style('width','30%')
								.attr('class','btn btn-default')
								.on('change',function(){
									layout['data'][''+this.name].dataType = this.value;
									console.log(this.value);
									console.log(this.name);
									console.log(layout['data'][''+this.name]);
								});

								ss.selectAll("option").data(inputTypes).enter()
								.append('option')
								.attr('value',function(m){return m;})
								.html(function(m){return m;})

								
								ss.selectAll("option").each(function(m){
									if (m === layout[d][dd].dataType) {
										return d3.select(this).attr("selected", "selected");
									}
								});
								// .attr('value',layout[d][dd].info)
								// .html(layout[d][dd].info);
							// }
							
							delete_ui = s.append('input')
							.attr('type','button')
							.attr('name',dd)
							.attr('value','Delete')
							.style("position","absolute")
							.style('right','5px')
							.on('click',function(){
								delete layout['data'][''+this.name];
								$('#li_'+this.name).remove();
							})


							value_ui = s.append('input')
							.attr('type','text')
							.attr('id','info'+dd)
							.attr('name',dd)
							.attr('value',layout[d][dd].info)
							.style("position","absolute")
							.style('right','18%')
							.style('width','28%')
							.style('visibility',function(){
								return (layout[d][dd].elementType=='select') ? 'visible':'hidden';
							})
							.on('change',function(){
								layout['data'][''+this.name].info = this.value;
								console.log(this.value);
								console.log(this.name);
								console.log(layout['data'][''+this.name]);
							});

							btn_ui = s.append('input')
							.attr('type','button')
							.attr('id','btn'+dd)
							.attr('name',dd)
							.attr('value','link')
							.style("position","absolute")
							.style('right','18%')
							.style('width','28%')
							.style('visibility',function(){
								return (layout[d][dd].elementType=='select') ? 'visible':'hidden';
							})
							.on('click',function(e){
								
						        

								console.log($(this));
								model_id = layout.id.info+count;
								

								$( "#ui_log_div" ).html( 
									"BTN pageX: " + event.pageX + ", pageY: " + event.pageY +"; <br/>" +
									"BTN posX: " + $(this).position().left + ", posY: " + $(this).position().top+"; <br/>"+
									"BTN width: " + $(this).width() + ", height: " + $(this).height()+"; <br/>"+
									model_id+" width: " + $("#"+model_id).width() + ", height: " + $("#"+model_id).height()+"; <br/>"

									);
								// layout['data'][''+this.name].info = this.value;
								console.log(this.value);
								console.log(this.name);
								console.log(layout['data'][''+this.name]);
								var exampleMode = require(["app/model"],function(model){
								  model.show(
								  	d3.select("body"),
								  	layout_normal,
								  	winWidth*0.6,
								  	winHeight*0.2,
								  	++counter
								  	);
								});

							drap_id = model_id;
							drap_2_id = layout_normal.id.info+(counter+1);

							console.log(drap_2_id);
							d3.event.preventDefault();

					        if ( drap_id != undefined && drap_2_id!=undefined) {
								line.attr("x1", $("#"+drap_id).position().left+$("#"+drap_id).width()/2);
					            line.attr("y1", $("#"+drap_id).position().top+$("#"+drap_id).height()/2);
					            line.attr("x2", winWidth*0.8);
					            line.attr("y2", winHeight*0.4);
					        }


							});


							el.selectAll("option").each(function(m){
								if (m === layout[d][dd].elementType) {
									return d3.select(this).attr("selected", "selected");
								}
							});


						}
					} else {
						if (layout[d].elementType=='input') {
							e.append(layout[d].elementType)
							.attr('type','text')
							.attr('name',d)
							.attr('value',layout[d].info)
							.style("position","absolute")
							.style('left','25%')
							.style('width','55%')
							.on('change',function(){
								layout[''+this.name].info = this.value;
								console.log(this.value);
								console.log(this.name);
								console.log(layout[''+this.name]);
							});
						}
						if (layout[d].elementType=='select') {
							var ee = e.append(layout[d].elementType)
							.attr('class','btn btn-default')
							.attr('name',d)
							.style("position","absolute")
							.style('left','25%')
							.style('width','55%')
							.on('change',function(){
								layout[''+this.name].info = this.value;
								console.log(this.value);
								console.log(this.name);
								console.log([''+this.name]);
							})

							ee.selectAll("option").data(styleTypes).enter()
							.append('option')
							.attr('value',function(d){return d;})
							.html(function(d){return d;})
							
							ee.selectAll("option").each(function(m){
								if (m === layout[d].info) {
									return d3.select(this).attr("selected", "selected");
								}
							});

							// .attr('value',layout[d].info)
							// .html(layout[d].info);

						}

					}
				// }
			}

			// console.log(layout);

			model_ui.append('button')
			.html('Add')
			.style("position","absolute")
			// .style("margin",marginpx+'px')
			.style('left','7%')
			.style('bottom','5px')
			.on('click',function(d){

				counter = layout['data'].length;
				
				layout.data.push({name:counter,elementType:'input',dataType:'string',info:''});

				var s = element_ui.append('li')
				.attr('id','li_'+counter)
				.style('width','100%')
				s.append('input')
				.attr('name',counter)
				.attr('type','text')
				.attr('value','empty'+counter)
				.style('width','30%')
				.on('change',function(){
					// console.log(this.value);
					// console.log(this.name);
					// console.log(layout['data'][''+this.name]);
					layout['data'][''+this.name].name = this.value;
				});

				var el = s.append('select')
				.attr('name',counter)
				.style('width','20%')
				.attr('class','btn btn-default')
				.on('change',function(d){
					layout['data'][''+this.name].elementType = this.value;
					// console.log(layout);
					// console.log(this.value);
					// console.log(this.name);
					// console.log(this);
					// console.log(layout['data'][layout.length-1][''+this.name]);
					if (this.value == 'select') {
						d3.select("#dataType"+this.name).style('visibility','hidden')
						d3.select("#info"+this.name).style('visibility','visible')
						// $("#info"+this.name).show();
					}
					if (this.value == 'input') {
						// $("#info"+this.name).hide();
						d3.select("#dataType"+this.name).style('visibility','visible')
						d3.select("#info"+this.name).style('visibility','hidden')
					}
				});

				el.selectAll("option").data(elementTypes).enter()
				.append('option')
				.attr('value',function(m){return m;})
				.html(function(m){return m;})


				var ss = s.append('select')
				.style('width','30%')
				.attr('name',counter)
				.attr('id','dataType'+counter)
				.attr('class','btn btn-default')
				.on('change',function(){
					layout['data'][''+this.name].dataType = this.value;
					console.log(this.value);
					console.log(this.name);
					console.log(layout['data'][''+this.name]);
				})
				ss.selectAll("option").data(inputTypes).enter()
				.append('option')
				.attr('value',function(m){return m;})
				.html(function(m){return m;})
				
				
				delete_ui = s.append('input')
				.attr('type','button')
				.attr('name',counter)
				.attr('value','Delete')
				.style("position","absolute")
				.style('right','5px')
				.on('click',function(){
					delete layout['data'][''+this.name];
					$('#li_'+this.name).remove();
				})


				s.append('input')
				.attr('type','text')
				.attr('id','info'+counter)
				.attr('name',counter)
				// .attr('value',layout['data'][''+this.name].info)
				.style("position","absolute")
				.style('right','18%')
				.style('width','28%')
				.style('visibility','hidden')
				.on('change',function(){
					layout['data'][''+this.name].info = this.value;
					console.log(this.value);
					console.log(this.name);
					console.log(layout['data'][''+this.name]);
				});
				// $('input[type="checkbox"]').width('25px');
				// $('input[type="checkbox"]').height('25px');
				counter++;

			});


			model_ui.append('button')
			.html('Generate element')
			.style("position","absolute")
			// .style("margin",marginpx+'px')
			.style('left','22%')
			.style('bottom','5px')
			.on('click',function(d){
				// console.log(layout);
				var exampleView = require(["app/view"],function(view){
				  view.show(
				  	d3.select("body"),
				  	counter,
				  	layout,
				  	winWidth*0.5,
				  	winHeight*0.2
				  	);
				});
				counter++;
			});


			model_ui.append('button')
			.html('Save model')
			.style("position","absolute")
			// .style("margin",marginpx+'px')
			.style('left','60%')
			.style('bottom','5px')
			.on('click',function(d){
				var jsonfile = JSON.stringify(layout);
				// console.log(jsonfile);
				saveDataAsFile(jsonfile,layout.id.info+count+'.json');
			});

			model_ui.append('button')
			.html('X')
			.attr('name',layout.id.info+count)
			.style("position","absolute")
			.style("margin",marginpx+'px')
			.style('right','2%')
			.style('top','5px')
			.on('click',function(d){
				$("#"+this.name).hide();
				$("#"+this.name).remove();
			});

			// $('input[type="checkbox"]').width('25px');
			// $('input[type="checkbox"]').height('25px');
			$("#"+layout.id.info +count).draggable({
				// stack: ".products",
				//grid: [ 20, 20 ],
				start:	function() { 
					$(this).css({'z-index': topzindex}); 
				}, 
				drag: function(event) {
					// console.log($(this).position().left+" "+$(this).position().top);
					$( "#ui_log_div" ).text( " pageX: " + event.pageX + ", pageY: " + event.pageY );
					if ( drap_id != undefined && drap_2_id!=undefined) {
						line.attr("x1", $("#"+drap_id).position().left+$("#"+drap_id).width()/1);
			            line.attr("y1", $("#"+drap_id).position().top+$("#"+drap_id).height()/1.5);
			            line.attr("x2", $("#"+drap_2_id).position().left+$("#"+drap_2_id).width()/10);
			            line.attr("y2", $("#"+drap_2_id).position().top+$("#"+drap_2_id).height()/2);
			        } else {
			        	
			        }
				},
                stop: function() { 
                	$(this).css({'z-index': ++zindex}); 
                } 
			});

			console.log("Function : show"+div);
			// console.log(window.styleTypes);
		},
		hide: function() {
			console.log("Function : hide");
			$("#"+layout.id.info+count ).hide();
		}
	}
});

