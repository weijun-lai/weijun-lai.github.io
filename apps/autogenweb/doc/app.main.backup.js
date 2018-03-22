
    var $app = $('#paper');

    var graph = new joint.dia.Graph;

    var startPointID = 0;
    var startPoint;

    var scaleSize = 2;
    var toolboxSize = 200;

    $('#paper').css({'width': (($(window).width()))+'px','height': (($(window).height()))+'px'});
    var paper = new joint.dia.Paper({
        el: $('#paper'),
        width: $( window ).width()*scaleSize,
        height: $( window ).height()*scaleSize,
        model: graph,
        gridSize: 1,
        defaultLink: new joint.dia.Link({
          attrs: {
            '.label': { text: 'has', 'ref-x': .4, 'ref-y': .2 },
            '.connection': { stroke: 'black' , "stroke-dasharray":"0", "stroke-width":"4"},
            // '.connection': { stroke: 'blue' , "stroke-dasharray":"5,5", "stroke-width":"4"},
            '.marker-source': { fill: 'black', d: 'M 10 0 L 0 5 L 10 10 z' },
            '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' }
          },
          labels: [
              { position: 0.5,
                attrs: {
                  text: { text: 'has', fill: 'black','font-size': 12, 'font-family': 'sans-serif' },
                  rect: { stroke: '#7c68fc', 'stroke-width': 14, rx: 2, ry: 2 } //7c68fc
              }
            }
          ],
          smooth:true
        }),
        snapLinks: { radius: 15 }
    });



    var mouseState = "blank";
    var mouseTempInstance;



    paper.on('blank:pointerdown', onBlankDown);
    paper.on('blank:pointerup', onBlankUp);
    paper.$el.on('mousemove DOMMouseMove', onMouseMove);
    paper.$el.on('mousewheel DOMMouseScroll', onMouseWheel);

    var oldmousposX = 0;
    var oldmousposY = 0;
    function onBlankUp(e) {
      mouseState = "up";
    }

    function onBlankDown(e) {
      mouseState = "panning";
      // e.target;
      // console.log("e.target:",e.target);
      // var p = offsetToLocalPoint(e.clientX, e.clientY);
      oldmousposX = e.clientX+$('#paper').scrollLeft();//e.clientX;
      oldmousposY = e.clientY+$('#paper').scrollTop();//e.clientY;
      // console.log("onBlankDown",e.clientX, e.clientY,$('#paper').scrollLeft(),$('#paper').scrollTop() );
      $('.html-element-design').html('<p>ENGG4801 Project</p><br/><p><i>Automatic Web-based graphical editor generation</i></p><br/><p>Weijun Lai <br/> 10-01-2015</p>');
    }

    function onMouseMove(e) {
      e.preventDefault();
      e = e.originalEvent;

      // paper.translate(e.clientX,e.clientY);
      // var offsetX = (e.offsetX || e.clientX - $(this).offset().left); // offsetX is not defined in FF
      // var offsetY = (e.offsetY || e.clientY - $(this).offset().top); // offsetY is not defined in FF

      if (mouseState=="cloneInstance") {
        mouseTempInstance.position($('#paper').scrollLeft()+e.clientX-mouseTempInstance.attributes.size.width/2, $('#paper').scrollTop()+e.clientY-mouseTempInstance.attributes.size.height/2);
      }

      if (mouseState=="panning"){
        // var p = offsetToLocalPoint(e.clientX, e.clientY);
        var offsetX = oldmousposX - e.clientX;//p.x;
        var offsetY = oldmousposY - e.clientY;//p.y;
        // p = offsetToLocalPoint(offsetX, offsetY);
        console.log(mouseState, e.clientX,e.clientY,e,paper,paper.options.width,paper.options.height);
        $('#paper').scrollLeft( offsetX );
        $('#paper').scrollTop( offsetY );
        offsetX = offsetX>0 ? offsetX/4/scaleSize:0;
        offsetY = offsetY>0 ? offsetY/4/scaleSize:0;
        $('#paper-small-box').css({'left': offsetX+'px','top': offsetY+'px'});
      }
    }

    function onMouseWheel(e) {

        e.preventDefault();
        e = e.originalEvent;

        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))) / 50;
        var offsetX = (e.offsetX || e.clientX - $(this).offset().left); // offsetX is not defined in FF
        var offsetY = (e.offsetY || e.clientY - $(this).offset().top); // offsetY is not defined in FF
        var p = offsetToLocalPoint(offsetX, offsetY);
        var newScale = V(paper.viewport).scale().sx + delta; // the current paper scale changed by delta

        if (newScale > 0.4 && newScale < 2) {
            paper.setOrigin(0, 0); // reset the previous viewport translation
            paper.scale(newScale, newScale, p.x, p.y);
            // paperSmall.scale(.25/(scaleSize/newScale));
            $('#paper-small-box').css({'width': ((($(window).width()-toolboxSize)/4/scaleSize)/newScale)+'px','height': (($(window).height()/4/scaleSize)/newScale)+'px'});
        }
    }

    function offsetToLocalPoint(x, y) {
        var svgPoint = paper.svg.createSVGPoint();
        svgPoint.x = x;
        svgPoint.y = y;
        // Transform point into the viewport coordinate system.
        var pointTransformed = svgPoint.matrixTransform(paper.viewport.getCTM().inverse());
        return pointTransformed;
    }




    $('#paper-tools').css({'height': (($(window).height()))+'px'});
    var graph_tools = new joint.dia.Graph;
    var paper_tools = new joint.dia.Paper({
        el: $('#paper-tools'),
        width: 0,//$( window ).width(),
        height: 0,//$( window ).height()/2,
        model: graph_tools,
        gridSize: 1,
        // interactive: false
    });


    // paper.setDimensions($( window ).width(),$( window ).height())
    // console.log("paper",paper.width,paper.height,paper);















    // var rect = new joint.shapes.basic.Rect({
    //     position: { x: 500, y: 630 },
    //     size: { width: 100, height: 30 },
    //     data:{'name':'system','method':'connect_database'},
    //     attrs: {
    //         rect: { fill: '#2C3E50', rx: 5, ry: 5, 'stroke-width': 2, stroke: 'black' },
    //         text: {
    //             text: 'Model A', fill: '#3498DB',
    //             // 'font-size': 18,  'font-variant': 'small-caps', 'text-transform': 'capitalize'
    //         }
    //     }
    // });




    // var rect2 = rect.clone();
    // rect2.translate(300);
    // rect2.attr("text/text","Model B");
    // rect2.attr("text/fill","Black");
    // rect2.attr("rect/fill","#eCeE50");

    // var myNewRect = new joint.shapes.devs.NewRect({ position: { x: 150, y: 120 }});
    // // myNewRect.set('mycustom2', 'bar');
    // // myNewRect.get('mycustom');

    // toJSONstring(myNewRect);


    var toolBoxElement = new joint.shapes.html.Element({
      position: { x: 0, y: 25 },
      size: { width: toolboxSize, height: $( window ).height() },
      label: 'Property | Present',
      select: 'one',
      visibility: "hidden",
      htmlDesign:''
    });



    // var link = new joint.dia.Link({
    //     source: { id: rect.id },
    //     target: { id: rect2.id },
    //     attrs: {
    //     '.label': { text: 'Normal', 'ref-x': .4, 'ref-y': .2 },
    //     '.connection': { stroke: 'black' },
    //     '.marker-source': { fill: 'black', d: 'M 10 0 L 0 5 L 10 10 z' },
    //     '.marker-target': { fill: 'black', d: 'M 10 0 L 0 5 L 10 10 z' }
    //     }
    // });

    // var link2 = new joint.dia.Link({
    //     source: { id: rect.id },
    //     target: { id: myNewRect.id },
    //     smooth: true,
    //     attrs: {
    //     '.connection': { stroke: 'black' },
    //     '.marker-source': { fill: 'black', d: 'M 10 0 L 0 5 L 10 10 z' },
    //     '.marker-target': { fill: 'black', d: 'M 10 0 L 0 5 L 10 10 z' }
    //     }
    // });


    // var link3 = new joint.dia.Link({
    //     source: { id: toolBoxElement.id },
    //     target: { id: rect.id },
    //     attrs: { '.connection': { 'stroke-width': 5, stroke: '#34495E' } }
    // });


    // link.set('vertices', [{ x: 300, y: 60 }, { x: 400, y: 60 }, { x: 400, y: 20 }]);
    // link.set('smooth', true);


    // var m1 = new joint.shapes.devs.Model({
    //     position: { x: 750, y: 450 },
    //     size: { width: 90, height: 90 },
    //     inPorts: ['in1','in2','in3','in4','in5','in6'],
    //     outPorts: ['out1','out2','out3','out4'],
    //     attrs: {
    //         '.label': { text: 'Models', 'ref-x': .4, 'ref-y': .2 },
    //         rect: { fill: '#2ECC71' },
    //         '.inPorts circle': { fill: '#16A085' , r:5},
    //         '.outPorts circle': { fill: '#E74C3C' , r:5},
    //         text: { fill: '#3498DB', 'font-size': 15,  'font-variant': 'sant', 'text-transform': 'capitalize' }
    //     }
    // });


    // var m2 = new joint.shapes.basic.Circle({
    //     // position: constraint.intersectionWithLineFromCenterToPoint(g.point(100, 100)).offset(-10, -10),
    //     position: { x: 950, y: 550 },
    //     size: { width: 70, height: 70 },
    //     attrs: { text: { text: 'Model2' }, circle: { fill: '#17f' } },
    //     name: 'Model2'
    // });



    // var circleModel = new joint.shapes.devs.CircleModel({
    //     position: { x: 900, y: 800 },
    //     size: { width: 100, height: 100 },
    //     inPorts: ['a'],
    //     outPorts: ['b']
    // });







    var graph_tools_instances = new joint.dia.Graph;
    var paper_tools_instances = new joint.dia.Paper({
        el: $('#paper-tools-instances'),
        width: $( window ).width(),
        height: $( window ).height(),
        model: graph_tools_instances,
        gridSize: 1,
        interactive: false
    });



/**********************************************************************
**********************************************************************
**********************************************************************
***********************************************************************/


    // (new joint.shapes.basic.Rect({
    //   inPorts: ['in'],
    //   outPorts: ['out'],
    //   attrs: {
    //         '.inPorts circle': { fill: '#16A085' , r:5},
    //         '.outPorts circle': { fill: '#E74C3C' , r:5}
    //     }
    // })).position(10, 10).resize(60, 60).attr("text/text","Rect").addTo(graph_tools_instances);

    // (new joint.shapes.basic.Circle).position(90, 10).resize(60, 60).attr("text/text","Circle").addTo(graph_tools_instances);



    // NewRect Software
    (new joint.shapes.devs.NewRect({
      inPorts: [''],
      outPorts: [''],
      data: {
            type:"start",
            level:"0",
            source:"",
            path:"",
            JSONData:{}
        },
      attrs: {
            '.inPorts circle': { fill: '#16A085' , r:5},
            '.outPorts circle': { fill: '#E74C3C' , r:5}
        }
    })).position(20, 20).resize(60, 50).attr(".label/text","Software").addTo(graph_tools_instances);

    // CircleModel package
    (new joint.shapes.devs.CircleModel({
      inPorts: [''],
      outPorts: [''],
      data: {
            type:"package",
            level:"1",
            source:"",
            path:"",
            JSONData:{}
        },
      attrs: {
            // '.inPorts circle': { fill: '#16A085' , r:5},
            // '.outPorts circle': { fill: '#E74C3C' , r:5}
        }
    })).position(100, 50).resize(70, 70).attr(".label/text","package").addTo(graph_tools_instances);


    // NewRect DataSource
    (new joint.shapes.devs.NewRect({
      inPorts: [''],
      outPorts: [''],
      data: {
            type:"source",
            level:"0",
            source:"",
            path:"",
            JSONData:{}
        },
      attrs: {
        'rect': { fill: '#FFF', stroke: 'black',"stroke-width":"1", 'follow-scale': true , "rx":"0", "ry":"0"}
            // '.inPorts circle': { fill: '#16A085' , r:5},
            // '.outPorts circle': { fill: '#E74C3C' , r:5}
        }
    })).position(200, 10).resize(60, 70).attr(".label/text","Source").addTo(graph_tools_instances);

    // Model
    // (new joint.shapes.devs.Model({
    //   inPorts: ['in1','in2','in3','in4'],
    //   outPorts: ['out'],
    //   attrs: {
    //         '.inPorts circle': { fill: '#16A085' , r:5},
    //         '.outPorts circle': { fill: '#E74C3C' , r:5}
    //     }
    // })).position(420, 10).resize(60, 60).attr("text/text","Model").addTo(graph_tools_instances);


    // // Polygon
    // (new joint.shapes.basic.Polygon).position(470, 10).resize(60, 60).attr("text/text","Polygon").addTo(graph_tools_instances);
    // // (new joint.shapes.basic.Generic).position(150, 10).resize(30, 30).addTo(graph_tools_instances);












/**********************************************************************
**********************************************************************
**********************************************************************
***********************************************************************/















    paper_tools_instances.on('cell:pointerdown', function(cellView, evt, x, y) {
      console.log(typeof(cellView.model),cellView.model.attributes.type,evt,evt.target,cellView);
      var cell = cellView.model;
      mouseTempInstance = cell.clone();
      mouseTempInstance.position($('#paper').scrollLeft()+evt.clientX-mouseTempInstance.attributes.size.width/2, $('#paper').scrollTop()+evt.clientY-mouseTempInstance.attributes.size.height/2).addTo(graph);
      // cell.clone().position(evt.clientX-cell.attributes.size.width/2, evt.clientY-cell.attributes.size.height/2).addTo(graph);
      mouseState="cloneInstance";
    });

    paper_tools_instances.on('cell:pointerup', function(cellView, evt, x, y) {
      var cell = cellView.model;
      cell.clone().position($('#paper').scrollLeft()+evt.clientX-cell.attributes.size.width/2, $('#paper').scrollTop()+evt.clientY-cell.attributes.size.height/2).addTo(graph);
      mouseState="up";
      mouseTempInstance.remove();
      // cell.remove();
    });





    // graph_tools_instances.addCells([  ]);



    $('#paper-small').css({'width': (($(window).width()/4))+'px','height': (($(window).height()/4))+'px'});
    var paperSmall = new joint.dia.Paper({
        el: $('#paper-small'),
        width: $( window ).width()*scaleSize,
        height: $( window ).height()*scaleSize,
        model: graph,
        gridSize: 1
    });

    paperSmall.scale(.25/scaleSize);
    paperSmall.$el.css('pointer-events', 'none');
    // paperSmall.setDimensions($( window ).width(),$( window ).height());
    // paperSmall.setDimensions(($( window ).width()-200)/4,$( window ).height()/4);

    $('#paper-small-box').css({'width': ((($(window).width()-toolboxSize)/4/scaleSize))+'px','height': (($(window).height()/4/scaleSize))+'px'});

    // console.log("paper:",$("#paper").width(), $("#paper").height(),$( window ).width()/4/scaleSize,$( window ).height()/4/scaleSize);

    // graph.addCells([m1, m2, rect, rect2, circleModel, link]);
    // graph.addCells([m1, m2, rect, rect2, myNewRect, circleModel, link, link2]);
    graph_tools.addCell(toolBoxElement);

    graph.on('add', function(cell) {
      var numStartPoint = checkStartPoint(graph);
      console.log("checkStartPoint",numStartPoint);
      console.log(cell.attributes.type,'add cell with id ' + cell.id + ' added to the graph.');
      if (numStartPoint>2) {
        cell.remove();
      } else {
        startPointID = cell.id;
        startPoint = cell;
        console.log("#######data:",startPoint.attributes.data);
      }
    });

    graph.on('change', function(cell) {
      // console.log("checkStartPoint",checkStartPoint(graph));
      console.log(cell.attributes.type,'change cell with id ' + cell.id + ' added to the graph.');
    });

    graph.on('remove', function(cell) {
      console.log("checkStartPoint",checkStartPoint(graph));
      console.log(cell.attributes.type,'remove cell with id ' + cell.id + ' added to the graph.');
    });

    function checkStartPoint(g) {
      var els = g.getElements();
      console.log("checkStartPoint:",els);
      var result = 0;
      for (var el in els) {
        // console.log("####",els[el]);
        if (els[el].attributes.data!= undefined && els[el].attributes.data.type=="start") {  // || els[el].attributes.type=="devs.NewRect"
        // if (els[el].attributes.type=="devs.start") {
          // console.log(list[key].attributes.type);
          result++;
        }
      }
      return result;
    }

    $('#paper').scrollTop(250);
    $('#paper').scrollLeft(250);
    $('#paper-small-box').css({'left': 250/4/scaleSize+'px','top': 250/4/scaleSize+'px'});














/**********************************************************************
**********************************************************************
**********************************************************************
***********************************************************************/









    // var jsondata = graph.toJSON();
    // console.log("json:",JSON.stringify(jsondata));

    // First, unembed the cell that has just been grabbed by the user.
    paper.on('cell:pointerdown', function(cellView, evt, x, y) {

        var cell = cellView.model;

        if (!cell.get('embeds') || cell.get('embeds').length === 0) {
            // Show the dragged element above all the other cells (except when the
            // element is a parent).
            cell.toFront();
        }

        if (cell.get('parent')) {
            graph.getCell(cell.get('parent')).unembed(cell);
        }




    });

    // When the dragged cell is dropped over another cell, let it become a child of the
    // element below.
    paper.on('cell:pointerup', function(cellView, evt, x, y) {
        console.log(typeof(cellView.model),cellView.model.attributes.type,evt,evt.target,cellView);
        // console.log("toolBoxElement",toolBoxElement);

        var cell = cellView.model;
        var cellAttr = cellView.model.attributes;
        var cellLabel = cell.attr('.label/text') || cell.attr('text/text');

        // if (cellElement!=undefined) {
        if (cellAttr.type!="link"){
          var htmls = '<div class="input-group"><span class="input-group-addon zero-radius" id="basic-addon1">Shape</span>';
          htmls += '<input id="model-type" type="text" value="'+cellAttr.type+'" class="form-control zero-radius" placeholder="Shape" aria-describedby="basic-addon1"/></div>';

          htmls += '<div class="input-group"><span class="input-group-addon zero-radius" id="sizing-addon1">Label</span>';
          htmls += '<input id="model-label" type="text" value="'+cellLabel+'" class="form-control zero-radius" placeholder="Label" aria-describedby="sizing-addon1"></div>';

          htmls += '<div class="input-group"><span class="input-group-addon zero-radius" id="sizing-addon1">Color</span>';
          htmls += '<input id="model-Color" type="color" value="'+cell.attr('./fill')+'" class="form-control zero-radius" placeholder="Color" aria-describedby="sizing-addon1"></div>';

          htmls += '<div class="input-group"><span class="input-group-addon zero-radius" id="sizing-addon1">Rect Color</span>';
          htmls += '<input id="model-Color-rect" type="color" value="'+cell.attr('rect/fill')+'" class="form-control zero-radius" placeholder="Color" aria-describedby="sizing-addon1"></div>';

          htmls += '<div class="input-group"><span class="input-group-addon zero-radius" id="sizing-addon1">Circle Color</span>';
          htmls += '<input id="model-Color-circle" type="color" value="'+cell.attr('circle/fill')+'" class="form-control zero-radius" placeholder="Color" aria-describedby="sizing-addon1"></div>';

          htmls += '<div class="input-group"><span class="input-group-addon zero-radius" id="sizing-addon1">Text Color</span>';
          htmls += '<input id="model-Color-text" type="color" value="'+cell.attr('text/fill')+'" class="form-control zero-radius" placeholder="Color" aria-describedby="sizing-addon1"></div>';

          // htmls += 'Label:<input id="model-label" type="text" value="'+cellLabel+'" />';
          // htmls += 'Color:<input id="model-Color" type="color" value="'+cell.attr('./fill')+'" /><br/>';
          // htmls += 'Rect Color:<input id="model-Color-rect" type="color" value="'+cell.attr('rect/fill')+'" /><br/>';
          // htmls += 'Circle Color:<input id="model-Color-circle" type="color" value="'+cell.attr('circle/fill')+'" /><br/>';
          // htmls += 'Text Color:<input id="model-Color-text" type="color" value="'+cell.attr('text/fill')+'" /><br/>';
          htmls += '<hr>';
          htmls += '<input type="button" id="html-element-update-btn" class="btn btn-info" value="Update" />';
          htmls += '<input type="button" class="btn btn-info" value="Export" onclick="document.getElementById(\'html-element-export-btn\').click();"/>';
          // htmls += '<a id="html-element-export-btn" type="file" class="btn btn-info" style="display: none;">Export</a>';
          // htmls += '<input type="file" id="html-element-import-btn" name="file" class="btn btn-info" style="display: none;"/>';
          htmls += '<input type="button" value="Import" class="btn btn-info" onclick="LoadCell();" />';
          htmls += '<br/>';
          htmls += '<input type="button" id="html-element-clone-btn" class="btn btn-info" value="Clone" />';
          htmls += '<input type="button" id="html-element-remove-btn" class="btn btn-info" value="Remove" />';
          htmls += '<input type="button" id="html-element-getlinks-btn" class="btn btn-info" value="GetLinks" />';
          // htmls += '<input id="html-element-update-btn" class="btn btn-info" type="button" value="Update" />';
          // htmls += '<input id="html-element-export-btn" class="btn btn-info" type="button" value="Export" />';
          // htmls += '<a id="html-element-import-btn" type="file" class="btn btn-info" >Import</a>';
          // htmls += '<input type="file" id="html-element-import-btn" name="file" class="btn btn-info" />';
          $('.html-element-design').html(htmls);
          $('#html-element-export-btn').off('click');
          $('#html-element-import-btn').off('change');
          $('#html-element-update-btn').off('click');
          $('#html-element-remove-btn').off('click');
          $('#html-element-clone-btn').off('click');
          $('#html-element-getlinks-btn').off('click');
          $('#html-element-getlinks-btn').on('click',function(e){
              // cell.clone();
              var outboundLinks = graph.getConnectedLinks(cell, { outbound: true });
              var inboundLinks = graph.getConnectedLinks(cell, { inbound: true });
              var neighbors = graph.getNeighbors(cell);
              console.log(outboundLinks,inboundLinks,neighbors);
           });
          $('#html-element-clone-btn').on('click',function(e){
              // cell.clone();
              graph.addCell(cell.clone().translate(60,30).toFront());
           });
          $('#html-element-remove-btn').on('click',function(e){
              cell.remove();
           });
          $('#html-element-import-btn').on('change',function(e){
              LoadFromJSON();
          });
          $('#html-element-export-btn').on('click',function(e){
            printJSONdata(cell.toJSON());
            // return;
            var url = saveJSONDataToFile(cell.clone().toJSON(),cellLabel+'.'+cellAttr.type+'.json');
            // console.log(url);
            // $('#html-element-export-btn')
            // .attr('href', url)
            // .attr('target', '_blank')
            // .attr('download', cellLabel+'.'+cellAttr.type+'.json')
            // .text('Export');
            // document.getElementById('html-element-export-btn').click();
          });
          $('#html-element-update-btn').on('click',function(e){
            // cellAttr.inPorts=['in0'];
              console.log($('#model-label').val());
              cell.attr('.label/text', $('#model-label').val());
              cell.attr('text/text', $('#model-label').val());
              cell.attr('./fill', $('#model-Color').val());
              cell.attr('rect/fill', $('#model-Color-rect').val());
              cell.attr('circle/fill', $('#model-Color-circle').val());
              cell.attr('text/fill', $('#model-Color-text').val());
              // cellElement.text = $('#model-label').val();
              // console.log(cellElement.text,cellAttr);
              cellView.update();
          });
        }


        if (cellAttr.type=="link"){
          var htmls = '<div class="input-group"><span class="input-group-addon zero-radius" id="basic-addon1">Shape</span>';
          htmls += '<input id="model-Shape" type="text" value="'+cellAttr.type+'" class="form-control zero-radius" placeholder="Shape" aria-describedby="basic-addon1"/></div>';

          htmls += '<div class="input-group"><span class="input-group-addon zero-radius" id="sizing-addon1">Label</span>';
          htmls += '<input id="model-label" type="text" value="'+cellLabel+'" class="form-control zero-radius" placeholder="Label" aria-describedby="sizing-addon1"></div>';

          htmls += '<div class="input-group"><span class="input-group-addon zero-radius" id="sizing-addon1">Color</span>';
          htmls += '<input id="model-Color" type="color" value="'+cell.attr('.connection/stroke')+'" class="form-control zero-radius" placeholder="Color" aria-describedby="sizing-addon1"></div>';

          htmls += '<div class="input-group"><span class="input-group-addon zero-radius" id="sizing-addon1">Size</span>';
          htmls += '<input id="model-stroke-width" type="text" value="'+cell.attr('.connection/stroke-width')+'" class="form-control zero-radius" placeholder="stroke" aria-describedby="sizing-addon1"></div>';

          htmls += '<div class="input-group"><span class="input-group-addon zero-radius" id="sizing-addon1">Dasharray</span>';
          htmls += '<input id="model-dasharray" type="text" value="'+cell.attr('.connection/stroke-dasharray')+'" class="form-control zero-radius" placeholder="dasharray" aria-describedby="sizing-addon1"></div>';

          // htmls += 'Type:<input id="model-label" type="text" value="'+cellLabel+'" />';
          // htmls += 'Color:<input id="model-Color" type="color" value="'+cell.attr('.connection/stroke')+'" /><br/>';
          // htmls += 'Size:<input id="model-stroke-width" type="text" value="'+cell.attr('.connection/stroke-width')+'" />';
          // htmls += 'Dasharray:<input id="model-dasharray" type="text" value="'+cell.attr('.connection/stroke-dasharray')+'" />';
          htmls += '<hr>';
          htmls += '<input type="button" id="html-element-update-btn" class="btn btn-info" value="Update" />';
          htmls += '<input type="button" class="btn btn-info" value="Export" onclick="document.getElementById(\'html-element-export-btn\').click();"/>';
          // htmls += '<a id="html-element-export-btn" type="file" class="btn btn-info" style="display: none;">Export</a>';
          // htmls += '<input type="file" id="html-element-import-btn" name="file" class="btn btn-info" style="display: none;"/>';
          htmls += '<input type="button" value="Import" class="btn btn-info" onclick="LoadCell();" />';
          htmls += '<br/>';
          htmls += '<input type="button" id="html-element-clone-btn" class="btn btn-info" value="Clone" />';
          htmls += '<input type="button" id="html-element-remove-btn" class="btn btn-info" value="Remove" />';
          $('.html-element-design').html(htmls);
          $('#html-element-export-btn').off('click');
          $('#html-element-update-btn').off('click');
          $('#html-element-remove-btn').off('click');
          $('#html-element-clone-btn').off('click');
          $('#html-element-clone-btn').on('click',function(e){
              // cell.clone();
              graph.addCell(cell.clone().translate(60,30).toFront());
           });
          $('#html-element-remove-btn').on('click',function(e){
              cell.remove();
           });
          $('#html-element-export-btn').on('click',function(e){
            printJSONdata(cell.toJSON());
            var url = saveJSONDataToFile(cell.toJSON(),cellLabel+'.'+cellAttr.type+'.json');
            // console.log(url);
            // $('#html-element-export-btn')
            // .attr('href', url)
            // .attr('target', '_blank')
            // .attr('download', cellLabel+'.'+cellAttr.type+'.json')
            // .text('Export');
          });
          $('#html-element-update-btn').on('click',function(e){
              // console.log(cellAttr.labels,cell.label,$('#model-label').val());
              // cellElement.text = $('#model-Shape').val();
              // cellAttr.attrs['.connection'].stroke = $('#model-Color').val();
              cell.attr('.label/text', $('#model-label').val());

              cell.label(0,{position: .5,attrs:{text:{text:$('#model-label').val()}}});
              // cellAttr.labels[0].attrs.text.text = $('#model-label').val();

              if ($('#model-stroke-width').val()!=undefined) {
                cell.attr('.connection/stroke-width', $('#model-stroke-width').val());
              }
              if ($('#model-dasharray').val()!=undefined) {
                cell.attr('.connection/stroke-dasharray', $('#model-dasharray').val());
              }
              // console.log(cellElement.text);
              cell.attr('.connection/stroke', $('#model-Color').val());
              cellAttr.smooth = true;
              cellView.update();
          });
          return;
        }

        var cellViewsBelow = paper.findViewsFromPoint(cell.getBBox().center());

        if (cellViewsBelow.length) {
            // Note that the findViewsFromPoint() returns the view for the `cell` itself.
            var cellViewBelow = _.find(cellViewsBelow, function(c) { return c.model.id !== cell.id });

            // Prevent recursive embedding.
            if (cellViewBelow && cellViewBelow.model.get('parent') !== cell.id) {
                cellViewBelow.model.embed(cell);
            }
        }
    });








/**********************************************************************
**********************************************************************
**********************************************************************
***********************************************************************/






    function saveJSONDataToFile(data,filename) {
      var json = JSON.stringify(data);
      var blob = new Blob([json], {type: "application/json"});
      var url  = URL.createObjectURL(blob);
      $('#html-element-export-btn')
            .attr('href', url)
            .attr('target', '_blank')
            .attr('download', filename)
            .text('Export');
            // document.getElementById('html-element-export-btn').click();
      // $('#html-element-export-btn').click();
      return url;
    }


    function hasOwnProperty(obj, prop) {
        var proto = obj.__proto__ || obj.constructor.prototype;
        return (prop in obj) &&
            (!(prop in proto) || proto[prop] !== obj[prop]);
    }


    var historyJSONData;

    function toJSONstring(data) {
      var jsondata = data.toJSON();
      console.log("json:",replaceAll('"',"'",JSON.stringify(jsondata)));
    }

    function printJSONdata(data) {
      console.log("json:",replaceAll('"',"'",JSON.stringify(data)));
    }

    function replaceAll(find, replace, str) {
      return str.replace(new RegExp(find, 'g'), replace);
    }

    function SaveFile() {
      historyJSONData = graph.toJSON();
      // console.log("json:",JSON.stringify(jsondata));
      // console.log("json:",replaceAll('"',"'",JSON.stringify(historyJSONData)));
      // $('#html-element-export-btn').click();
      $('#html-element-export-btn').off('click');
      $('#html-element-export-btn').off('change');
      $('#html-element-export-btn').on('click',function(e){
          // printJSONdata(cell.toJSON());
          saveJSONDataToFile(historyJSONData,'webapp_models_data.json');
      });
      document.getElementById('html-element-export-btn').click();
    }

    function LoadFile() {
      // graph.clear();
      // graph.fromJSON(JSON.parse(string));

      // LoadFromJSON();

      $('#html-element-import-btn').off('click');
      $('#html-element-import-btn').off('change');
      $('#html-element-import-btn').on('change',function(e){
              LoadFromJSON();
          });
      document.getElementById('html-element-import-btn').click();
    }

    function LoadCell() {
      $('#html-element-import-btn').off('change');
          $('#html-element-import-btn').on('change',function(e){
              LoadFromJSON();
          });
      document.getElementById('html-element-import-btn').click();
    }

    function LoadFromJSON() {
      var files = document.getElementById('html-element-import-btn').files;
      console.log("files:",files);
        if (!files.length) {
          console.log('Please select a file!');
          return;
        }
        var file = files[0];
        var reader = new FileReader();
        reader.onloadend = function(evt) {
          console.log("onload...");
          if (evt.target.readyState == FileReader.DONE) { // DONE == 2
            console.log("result:",evt.target.result);
            importModelJSONdata(evt.target.result);
            $('#html-element-import-btn').text('Import');
          }
        };
        reader.readAsBinaryString(file);
    }

    function LoadJSONObject() {
      if (typeof(historyJSONData)!="object"){return;}
      console.log(typeof(historyJSONData));
      graph.clear();
      graph.fromJSON(historyJSONData);
    }

    function importModelJSONdata(data) {
      var dataJSON;
      var cellDataJSON = JSON.parse(data);

      if (cellDataJSON.cells==undefined) {
        dataJSON = graph.toJSON();
        cellDataJSON.id = joint.util.uuid();
        dataJSON.cells.push(cellDataJSON);
      } else {
        dataJSON = JSON.parse(data);
      }
      // console.log("load type:",type);
      graph.clear();
      graph.fromJSON(dataJSON);
      // $('#html-element-import-btn').off('change');
      var control = $("#html-element-import-btn");
      control.replaceWith( control = control.clone( true ) );
    }

    function GraphClear() {
      graph.clear();
    }

    function Generation() {
      var graphJSONObj = graph.toJSON();
      console.log("graph",graph,graph.getElements(),graph.getLinks());

      console.log(graphJSONObj.cells);

      _.each(graph.getElements(), function(value, key, list){
        // console.log(value);
        // console.log(_.keys(value));
        modelText = value.attr("text/text") || value.attr(".label/text");
        console.log(value.attributes.type,modelText);
      });

      _.each(graph.getLinks(), function(value, key, list){
        // console.log(value);
        // console.log(_.keys(value));
        modelText = value.attr("text/text") || value.attr(".label/text");
        console.log(value.attributes.type,modelText);
      });

      // console.log(graphJSONObj.cells,_.keys(graphJSONObj.cells[0])) ;
      // printJSONdata(graphJSONObj);
    }


    $( window ).resize(function() {
      console.log(toolBoxElement.size,$( window ).width(),$( window ).height());
      paper.setDimensions($( window ).width()*scaleSize,$( window ).height()*scaleSize);
      paperSmall.setDimensions(($( window ).width()*scaleSize-toolboxSize)/4,$( window ).height()*scaleSize/4);
      $('#paper').css({'width': (($(window).width()))+'px','height': (($(window).height()))+'px'});
      $('#paper-tools').css({'height': (($(window).height()))+'px'});

      $('#paper-small').css({'width': (($(window).width()/4))+'px','height': (($(window).height()/4))+'px'});
      $('#paper-small-box').css({'width': ((($(window).width()-toolboxSize)/4/scaleSize))+'px','height': (($(window).height()/4/scaleSize))+'px'});


      toolBoxElement.resize(toolboxSize, (($(window).height())));

    //   paperScroller.$el.css({
    //     width: $( window ).width(),
    //     height: $( window ).height()
    // });

    // // $('#paper').append(paperScroller.render().el);

    // // Example of centering the paper.
    //   paperScroller.center();

    });

