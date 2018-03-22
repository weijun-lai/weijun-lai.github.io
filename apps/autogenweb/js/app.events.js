
    paper_tools_instances.on('blank:pointerup', onBlankUp);
    paper_tools_instances.on('blank:pointerdown', onBlankDownToolsInstance);
    paper_tools_instances.$el.on('mousemove DOMMouseMove', onMouseMoveToolsInstance);

    paper_tools_instances.$el.on('mouseover DOMMouseMove', function(e) {
      // showErrorMsg($(window).height());
      $('#paper-tools-instances').css({'height': $(window).height()*0.8+'px'});
      $('#paper-tools').hide();
    });


    paper_tools_instances.on('cell:mouseover', function(cellView, evt, x, y) {
      var cell = cellView.model;
      if (!cell.isLink()){
      cell.attr({ '.body': { 'stroke': 'red' }});
      }
    });

    paper_tools_instances.on('cell:mouseout', function(cellView, evt, x, y) {
      var cell = cellView.model;
      if (!cell.isLink()){
      cell.attr({ '.body': { 'stroke': 'black' }});
      }
    });

    var toggleCount = 0;
    function toggleDisplay() {
      // showErrorMsg(toggleCount);
      if((toggleCount++)%2==0){
        $('#paper-tools').hide();
        $('#paper-tools-instances').hide();
      }else{
        $('#paper-tools').show();
        $('#paper-tools-instances').show();
      }
    }


    var mouseStateToolsInstance = "up";
    function onBlankDownToolsInstance(e) {
      mouseStateToolsInstance = "panning";
      oldmousposX = e.clientX+$('#paper-tools-instances').scrollLeft();//e.clientX;
      oldmousposY = e.clientY+$('#paper-tools-instances').scrollTop();//e.clientY;
    }

    function onMouseMoveToolsInstance(e) {
      e.preventDefault();
      e = e.originalEvent;


      if (mouseStateToolsInstance=="panning"){
        var offsetX = oldmousposX - e.clientX;//p.x;
        var offsetY = oldmousposY - e.clientY;//p.y;
        $('#paper-tools-instances').scrollLeft( offsetX );
        $('#paper-tools-instances').scrollTop( offsetY );
      }
    }

    /**********************************************************************/


    paper.on('blank:pointerdown', onBlankDown);
    paper.on('blank:pointerup', onBlankUp);
    paper.$el.on('mousemove DOMMouseMove', onMouseMove);
    paper.$el.on('mousewheel DOMMouseScroll', onMouseWheel);


    paper.on('cell:pointerdblclick', function(){
      $('#paper-tools-instances').css({'height': (($('#paper-small').height()))+'px'});
      $('#paper-tools').show();
      toggleCount=0;
    });


    function embedCell(cell) {
      var cellViewsBelow = paper.findViewsFromPoint(cell.getBBox().center());
      if (cellViewsBelow.length) {
          // Note that the findViewsFromPoint() returns the view for the `cell` itself.
          var cellViewBelow = _.find(cellViewsBelow, function(c) { return c.model.id !== cell.id });
          // Prevent recursive embedding.
          if (cellViewBelow && cellViewBelow.model.get('parent') !== cell.id) {
              cellViewBelow.model.embed(cell);
          }
      }
    }

    function embedUnderCells(cell) {
      _.each(graph.findModelsUnderElement(cell), function(v,k,l){
          embedCell(v);
          v.toFront();
          _.each(graph.getConnectedLinks(v), function(vv,kk,ll){
            vv.toFront();
            // embedCell(vv);
          });
        });
    }

    function onBlankUp(e) {

      if ( (mouseState=="up" && selectedCell!=undefined) ) {
        if(selectedCell.model.get("data")==undefined){return;}
       if(selectedCell.model.get("data").type=="area"){
        embedUnderCells(selectedCell.model);
         }
      }

      if ( (mouseState=="areaDown") ) {
        embedUnderCells(mouseTempInstance);
      }

      mouseState = "up";
      mouseStateToolsInstance = "up";
      graphUnclickCells();
    }

    function onBlankDown(e) {
      $('.html-element-design').html('<br/><p>ENGG4801 Project</p><br/><p><i>Automatic Web-based graphical editor generation</i></p><br/><p>Weijun Lai <br/> 10-01-2015</p><p><a href="doc/__Poster_42570521.pdf" target="_blank">poster.pdf </a></p>');

      $('#paper-tools-instances').css({'height': (($('#paper-small').height()))+'px'});

      if (mouseState == "up") {
        mouseState = "panning";
      }

      oldmousposX = e.clientX+$('#paper').scrollLeft();//e.clientX;
      oldmousposY = e.clientY+$('#paper').scrollTop();//e.clientY;
      // console.log("onBlankDown",e.clientX, e.clientY,$('#paper').scrollLeft(),$('#paper').scrollTop() );



    }

    function onMouseMove(e) {
      e.preventDefault();
      e = e.originalEvent;

      var x,y,p;

      if ( (mouseState=="areaDown") ) {


        p = offsetToLocalPoint(oldmousposX, oldmousposY);

        w = (e.clientX+$('#paper').scrollLeft()-oldmousposX)/newZoomScale;
        h = (e.clientY+$('#paper').scrollTop()-oldmousposY)/newZoomScale;
        var mp = offsetToLocalPoint(w, h);

        mouseTempInstance.resize(w, h).position(p.x,p.y);
        return;
      }

      if ( mouseState=="area") {
         x = $('#paper').scrollLeft()+e.clientX-(mouseTempInstance.attributes.size.width/2)*newZoomScale;
         y = $('#paper').scrollTop()+e.clientY-(mouseTempInstance.attributes.size.height/2)*newZoomScale;
         p = offsetToLocalPoint(x, y);
        mouseTempInstance.position(p.x, p.y);
      }

      if (mouseState=="cloneInstance") {
         x = $('#paper').scrollLeft()+e.clientX-(mouseTempInstance.attributes.size.width/2)*newZoomScale;
         y = $('#paper').scrollTop()+e.clientY-(mouseTempInstance.attributes.size.height/2)*newZoomScale;
         p = offsetToLocalPoint(x, y);

        mouseTempInstance.position(p.x, p.y).toFront();
      }

      if (mouseState=="panning"){
        var offsetX = oldmousposX - e.clientX;//p.x;
        var offsetY = oldmousposY - e.clientY;//p.y;
        $('#paper').scrollLeft( offsetX );
        $('#paper').scrollTop( offsetY );
        var p = offsetToLocalPoint(offsetX, offsetY);

        offsetX = offsetX>0 ? p.x/4/scaleSize:0;
        offsetY = offsetY>0 ? p.y/4/scaleSize:0;
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

        newZoomScale = newScale;

        if (newScale > 0.4 && newScale < 2) {
            paper.setOrigin(0, 0); // reset the previous viewport translation
            paper.scale(newScale, newScale, p.x, p.y);
            // paperSmall.scale(.25/(scaleSize/newScale));

            var x = $('#paper').scrollLeft();
            var y = $('#paper').scrollTop();
            var p = offsetToLocalPoint(x, y);
            $('#paper-small-box').css({'left': p.x/4/scaleSize+'px','top': p.y/4/scaleSize+'px'});


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





    // cell:pointerdown
    paper_tools_instances.on('cell:pointerdown', function(cellView, evt, x, y) {

      console.log(typeof(cellView.model),cellView.model.attributes.type,evt,evt.target,cellView);

      var cell = cellView.model;

      if(cell.get("data")==undefined){return;}

      var cellType = cell.get("data").type;

      console.log("----cellType pointerdown",cellType,cell);
      if (cellType=="area") {
        mouseState="area";
        mouseTempInstance = cell.clone();
        return;
      }


      mouseTempInstance = cell.clone();
      var offsetX = $('#paper').scrollLeft()+evt.clientX-(mouseTempInstance.attributes.size.width/2)*newZoomScale;
      var offsetY = $('#paper').scrollTop()+evt.clientY-(mouseTempInstance.attributes.size.height/2)*newZoomScale;
      var p = offsetToLocalPoint(offsetX, offsetY);
      mouseTempInstance.position(p.x, p.y).addTo(graph);
      mouseState="cloneInstance";
    });


    // cell:pointerup
    paper_tools_instances.on('cell:pointerup', function(cellView, evt, x, y) {
      var cell = cellView.model;

      if(cell.get("data")==undefined){return;}

      var cellType = cell.get("data").type;

      $('#paper-tools-instances').css({'height': (($('#paper-small').height()))+'px'});
      $('#paper-tools').show();

      console.log("----cellType pointerdown",cellType,cell);
      if (cellType=="area") {
        mouseState="area";
        mouseTempInstance.addTo(graph);
        return;
      }

      mouseState="cloneInstance";
    });







    graph.on('add', function(cell) {
      var numStartPoint = checkStartPoint(graph);
      if (numStartPoint>1) {
        cell.remove();
        showErrorMsg("Sorry, this symbol your dragged is marked as software start point, and we only support one of that in the graph canvas at the same time.");
      } else {
        startPointID = cell.id;
        startPoint = cell;
      }


    });

    graph.on('change', function(cell) {

    });

    graph.on('remove', function(cell) {
      console.log(cell.attributes.type,'remove cell with id ' + cell.id + ' from the graph.');
      if (cell.isLink()) {
        var sourceCell = graph.getCell(cell.attributes.source.id);
        var targetCell = graph.getCell(cell.attributes.target.id);

        var cellLinkType = cell.attributes.data.type;

        if (sourceCell==undefined || targetCell==undefined) {return;}

        sourceCellData = sourceCell.attributes.data.JSONData;
        targetCellData = targetCell.attributes.data.JSONData;

        var sourceCellKey = Object.keys(sourceCellData)[0];
        var targetCellKey = Object.keys(targetCellData)[0];

        deleteObject(sourceCellData[sourceCellKey], targetCellKey);

        if (cellLinkType == "call") {
          deleteObject(sourceCellData[sourceCellKey], "call");
        }

        if (cellLinkType == "relate") {
          deleteObject(sourceCellData[targetCellKey], targetCellKey);
          deleteObject(sourceCell.attributes.data.relate, targetCellKey);
        }

       }
    });

    function checkStartPoint(g) {
      var els = g.getElements();
      var result = 0;
      for (var el in els) {
        if (els[el].attributes.data!= undefined && els[el].attributes.data.type=="start") {
          result++;
        }
      }
      return result;
    }