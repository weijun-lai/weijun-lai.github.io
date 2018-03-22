

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



    var toolBoxElement = new joint.shapes.html.Element({
      position: { x: 0, y: 25 },
      size: { width: toolboxSize, height: $( window ).height() },
      label: '',
      select: 'one',
      visibility: "hidden",
      htmlDesign:''
    });


    graph_tools.addCell(toolBoxElement);

    toolBoxElement.resize(toolboxSize, (($(window).height())));

$(function() {
    $("#paper-small-box").on("mouseover", function(){
      $(this).addClass('box-highlight');
    });
    $("#paper-small-box").on("mouseout", function(){
      $(this).removeClass('box-highlight');
    });
    $( "#paper-small-box" ).draggable({
      snap: ".small-paper-box",
      containment: "parent",
      cursor:"move",
      // over: function(event, ui) {
      //  $(this).addClass('box-highlight');
      // },
      // out: function(event, ui) {
      //    $(this).removeClass('box-highlight');
      // },
      drag: function(e) {
        var x = $('#paper-small-box').position().left;
        var y = $('#paper-small-box').position().top;



        var rx = x*scaleSize*4;
        var ry = y*scaleSize*4;
        // var p = offsetToLocalPoint(x, y);
        rx += ($('#paper-small-box').width()/newZoomScale);
        ry += ($('#paper-small-box').height()/newZoomScale);

        // var p = offsetToLocalPoint(rx, ry);

        // showErrorMsg("x:"+x+", y:"+y+", px:"+$('#paper').scrollLeft()+", py:"+$('#paper').scrollTop());
        // console.log("x:"+x+", y:"+y+", px:"+$('#paper').scrollLeft()+"-"+rx+", py:"+$('#paper').scrollTop()+"-"+ry);

        $('#paper').scrollLeft(rx);  //+ ($('#paper-small-box').width()/newZoomScale)
        $('#paper').scrollTop(ry);  //+ ($('#paper-small-box').height()/newZoomScale)

      }
      });
  });


