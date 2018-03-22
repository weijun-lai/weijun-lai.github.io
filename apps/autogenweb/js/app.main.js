
    var $app = $('#paper');

    var graph = new joint.dia.Graph;

    // var startPointID = 0;
    var startPoint;

    var scaleSize = 4;
    var toolboxSize = 300;

    var mouseState = "blank";
    var mouseTempInstance;
    var areaInstance;

    var selectedCell;

    var newZoomScale = 1;

    var oldmousposX = 0;
    var oldmousposY = 0;

    var linksTypes = ['has','call','relate'];

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
            // text: { text: 'has', fill: '#000','font-size': 12, 'font-family': 'sans-serif' },
            '.connection': { stroke: '#000' , "stroke-dasharray":"0", "stroke-width":"4"},
            // '.connection': { stroke: 'blue' , "stroke-dasharray":"5,5", "stroke-width":"4"},
            // '.marker-source': { fill: '#000', d: 'M 10 0 L 0 5 L 10 10 z' },
            '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' }
          },
          data: {
            type:"has",
            level:"",
            source:"",
            path:"",
            JSONData:{}
        },
          labels: [
              { position: 0.5,
                attrs: {
                  text: { text: 'has', fill: '#ffffff','font-size': 12, 'font-family': 'sans-serif' },
                  rect: { stroke: '#49075e', 'stroke-width': 14, rx: 2, ry: 2 } //7c68fc
              }
            }
          ],
          smooth:false
        }),
        markAvailable: true,
        snapLinks: { radius: 35 }
    });




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
    // graph_tools.addCell(toolBoxElement);


    var startY = $( window ).height()*scaleSize/2;
    var startX = $( window ).width()*scaleSize/10;

    $('#paper').scrollTop(startY);
    $('#paper').scrollLeft(startX);
    $('#paper-small-box').css({'left': startX/4/scaleSize+'px','top': startY/4/scaleSize+'px'});







/**********************************************************************
**********************************************************************
**********************************************************************
***********************************************************************/

    paper.on('cell:mouseover', function(cellView, evt, x, y) {
      var cell = cellView.model;
      // var cellAttr = cellView.model.attributes;
      if (!cell.isLink()){
        var rectId = cellView.scalableNode.node.firstElementChild.id;
        // $('#'+rectId).attr('stroke','red');
        cell.attr({ '.body': { 'stroke': 'red' }});
        cell.attr({ '.port-body': { opacity: 1 }, '.body-rect' :{ width:70, height:70, fill: 'white', "fill-opacity":0.0 }}); //d: umbrella ,

      }


    });

    paper.on('cell:mouseout', function(cellView, evt, x, y) {
      var cell = cellView.model;
      // var cellAttr = cellView.model.attributes;
      if (!cell.isLink()){
        var rectId = cellView.scalableNode.node.firstElementChild.id;
        // $('#'+rectId).attr('stroke','black');
        cell.attr({ '.body': { 'stroke': 'black' }, '.body-rect' :{ width:70, height:70, fill: 'white', "fill-opacity":0.0 }});
        cell.attr({ '.port-body': {opacity: 0.1 }});
        if(selectedCell==undefined){return;}
        selectedCell.model.attr({ '.body': { 'stroke': 'red' }});
      }
    });

    // var jsondata = graph.toJSON();
    // console.log("json:",JSON.stringify(jsondata));

    // First, unembed the cell that has just been grabbed by the user.
    paper.on('cell:pointerdown', function(cellView, evt, x, y) {

        var cell = cellView.model;


        $('#paper-tools-instances').css({'height': (($('#paper-small').height()))+'px'});
        if(selectedCell!=undefined){selectedCell.model.attr({ '.body': { 'stroke': 'black' }});};
        selectedCell = cellView;


        if (mouseState=="area") {
          oldmousposX = evt.clientX+$('#paper').scrollLeft();//e.clientX;
          oldmousposY = evt.clientY+$('#paper').scrollTop();//e.clientY;
         var p = offsetToLocalPoint(oldmousposX, oldmousposY);
          mouseTempInstance.position(p.x,p.y);
          mouseState="areaDown";
        }


        if (!cell.isLink()){
          loopCellsData(cell);
          showModelProperty(cellView, evt, x, y);
        }

        if (cell.isLink()){
          showLinkProperty(cellView, evt, x, y);
          return;
        }

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


        var cell = cellView.model;
        var cellAttr = cellView.model.attributes;


        console.log("---pointerup:",typeof(cellView.model),cellView.model.attributes.type,evt,evt.target,cellView);


        if (cell.isLink()){
          //showLinkProperty(cellView, evt, x, y);
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


    function showEditorBox(type,cellView, evt, x, y) {
      cellView = cellView == undefined ? selectedCell:cellView;
      console.log('cellView:',cellView,"selectedCell:",selectedCell);
      if (cellView==undefined){return;}
      var cell = cellView.model;
      var cellAttr = cellView.model.attributes;
      var cellLabel = cell.attr('.label/text') || cell.attr('text/text');


      console.log('type:',type,"cellAttr.type:",cellAttr.type);

      if (cellAttr.type!="link"){
          type == "property"? showModelProperty(cellView, evt, x, y):showModelDesign (cellView, evt, x, y);

        }

        if (cellAttr.type=="link"){
          type == "property"? showLinkProperty(cellView, evt, x, y):showLinkDesign (cellView, evt, x, y);

          return;
        }
    }


    function showLinkProperty (cellView, evt, x, y) {
        var cell = cellView.model;
        var cellAttr = cellView.model.attributes;
        var cellAttrs = cellAttr.attrs;
        var cellData = cellAttr.data;
        var cellDataType = cellAttr.data.type;

        // cellView.model.attributes.data

        var htmls = "";
        var onChangeEvent = "";

        $('.html-element-design').html("");

        console.log("###########CELL showLinkProperty",cellData);

        for (var ca in cellData) {

            onChangeEvent =[
              'graph.getCell(\''+cellAttr.id+'\').attributes.data.'+ca+' = this.value;'
            ].join('');


            htmls += '<div class="input-group"><span class="input-group-addon zero-radius" id="basic-addon1">'+ca+'</span>';

            if (ca=="type") {
              onChangeEvent +=[
              'graph.getCell(\''+cell.id+'\').attr(\'.label/text\', this.value);',
              'graph.getCell(\''+cell.id+'\').label(0,{position: .5,attrs:{text:{text:this.value}}});',
              'graph.getCell(\''+cell.id+'\').attr(\'.connection/stroke-dasharray\' , this.value==\'call\'?5:0);',
              'graph.getCell(\''+cell.id+'\').attr(\'rect/stroke\' , this.value==\'relate\'?\'#0066CC\':\'#49075e\');',
              'updateSourceLinkData(graph.getCell(\''+cell.id+'\'));'
              ].join('');

              htmls += '<select id="model-'+ca+'" value="'+cellData[ca]+'" class="form-control zero-radius" onchange="'+onChangeEvent+'">';

              _.each(linksTypes,function(v,k,l){
                htmls += '<option value="'+v+'">'+v+'</option>';
              });

              htmls += '</select>';

              htmls += '</div>';break;

            } else {
              htmls += '<input id="model-'+ca+'" type="text" value="'+cellData[ca]+'" class="form-control zero-radius" placeholder="'+ca+'" aria-describedby="basic-addon1" onchange="'+onChangeEvent+'" />';
            }

            htmls += '</div>';
        }

        showModelControlButtons (cellView, evt, x, y, htmls);

        $("#model-type").val(cellDataType);

        return htmls;

    }


    function updateModelProperty () {
      if (selectedCell == undefined){return}
      loopCellsData(selectedCell.model);
      showEditorBox('property',selectedCell,'','','');
      if (selectedCell.model.attributes.data == undefined){return}
      var jsondata = JSON.stringify(selectedCell.model.attributes.data.JSONData);
      if (jsondata != undefined) {showInfoMsg(jsondata);}
    }

    function updateModelDesign () {
      if (selectedCell == undefined){return}
      loopCellsData(selectedCell.model);
      showEditorBox('design',selectedCell,'','','');
    }


    function showModelProperty (cellView, evt, x, y) {
        var cell = cellView.model;
        var cellAttr = cellView.model.attributes;
        var cellAttrs = cellAttr.attrs;
        var cellData = cellAttr.data;

        if (cellData==undefined){return;}

        var htmls = "<div class='model-design-div'>";
        var onChangeEvent = "";
        var disabled = "";
        var resizeWidth ="";

        $('.html-element-design').html("");

        console.log("###########CELL showModelProperty",cellData);
        console.log("cell.id:",cell.id);
        var outboundLinks = graph.getConnectedLinks(cell, { outbound: true });
        var inboundLinks = graph.getConnectedLinks(cell, { inbound: true });
        var neighbors = graph.getNeighbors(cell);
        console.log("out:",outboundLinks,"in:",inboundLinks,"nei:",neighbors);

        if (cellData.locked!=undefined && cellData.locked) {disabled="pointer-events: none;";}

        for (var ca in cellData) {
          // console.log("---------CELL",ca);

          if (typeof(cellData[ca])=="object") {
            // console.log("---------CELL",cellData[ca],"ca:",ca,"cellData:",cellData[ca]);
            for (var c in cellData[ca]) {
              console.log("---------CELL",cellData[ca][c],"ca:",ca,"cellData:",cellData[ca]);

              if(ca=="relate"){
                continue;
              }

              resizeWidth = 'objCell.resize(objCellWidth>70?objCellWidth:70, objCell.get(\'size\').height);';
              if(cellData.type=="area" || cellData.type=="gmethod") {
                resizeWidth="";
              }


              onChangeEvent =[
                'objCell=graph.getCell(\''+cellAttr.id+'\');',
                'objCellWidth=(this.value.length)*10;',
                'objCell.attr(\'text/text\' , this.value);',
                'objCell.attr(\'.label/text\' , this.value);',
                resizeWidth,
                'loopCellsParentDataKeys(objCell, this.value);',
                'editObjectKey(objCell.attributes.data.'+ca+', \''+c+'\', this.value);',
                'updateModelProperty();'
              ].join('');



              htmls +=[
                '<div class="input-group">',
                // '<span class="input-group-addon zero-radius" id="basic-addon1">'+c+'</span>',
                '<input type="text" value="Label" class="form-control zero-radius small-font property-input-label" style="width: 50%;position: relative;pointer-events: none;" aria-describedby="basic-addon1" />',

                '<input id="model-'+ca+'-'+c+'" type="text" value="'+c+'" class="form-control zero-radius small-font" placeholder="'+c+'" style="width: 50%;position: relative;'+disabled+'" aria-describedby="basic-addon1" onchange="'+onChangeEvent+'" />',

                '<input type="text" value="Key" class="form-control zero-radius small-font property-input-label" style="width: 50%;position: relative;pointer-events: none;" aria-describedby="basic-addon1" />',
                '<input type="text" value="Value" class="form-control zero-radius small-font property-input-label" style="width: 50%;position: relative;pointer-events: none;" aria-describedby="basic-addon1" />'

              ].join('');



            for (var d in cellData[ca][c]) {
              if (d=="") {delete cellData[ca][c][d];showModelProperty (cellView, evt, x, y);return;}



              onChangeEvent =[
                'editObjectKey(graph.getCell(\''+cellAttr.id+'\').attributes.data.JSONData, \''+d+'\',this.value.toString());',
                'updateModelProperty();',
              ].join('');

              htmls +=[
                //left col
                '<input id="model-'+ca+'-'+c+'-'+d+'-key" type="text" value="'+d+'" class="form-control zero-radius small-font" style="width: 50%;position: relative;" placeholder="'+d+'" aria-describedby="basic-addon1" onchange="'+onChangeEvent+'" />',
                //right col
                // '<input id="model-'+ca+'-'+c+'-'+d+'-value" type="text" value="'+cellData[ca][c][d]+'" class="form-control zero-radius small-font" style="width: 50%;position: relative;" placeholder="'+cellData[ca][c][d]+'" aria-describedby="basic-addon1" ',
                // 'onchange="graph.getCell(\''+cellAttr.id+'\').attributes.data.'+ca+'.'+c+'.'+d+' = this.value.toString();updateModelProperty();" />'
              ].join('');

              if (typeof(cellData[ca][c][d])=="object") {

                htmls +=[
                '<input id="model-'+ca+'-'+c+'-'+d+'-value" type="button" value="[click to edit]" class="form-control zero-radius small-font" style="width: 50%;position: relative;" placeholder="'+cellData[ca][c][d]+'" aria-describedby="basic-addon1" ',
                // 'onclick="showErrorMsg(\''+d+','+cellAttr.id+'\');" />'
                'onclick="gotoCells(\''+d+'\',\''+cellAttr.id+'\');" />'
                ].join('');

               } else if(cellData.relate!=undefined && cellData.relate[d]!=undefined) {
                onChangeEvent =[
                'var objcell=graph.getCell(\''+cellAttr.id+'\');',
                'objcell.get(\'data\').JSONData[\''+c+'\'][\''+d+'\']=this.value;',
                'updateModelProperty();',
              ].join('');

              htmls += '<select id="model-'+ca+'-'+c+'-'+d+'" value="'+cellData[ca][c][d]+'" class="form-control zero-radius" style="width: 50%;position: relative;" onchange="'+onChangeEvent+'">';

              htmls += '<option value="" '+(cellData[ca][c][d]==""?"selected":"")+'></option>';
              _.each(cellData.relate[d],function(v,k,l){
                htmls += '<option value="'+k+'" '+(cellData[ca][c][d]==k?"selected":"")+'>'+k+'</option>';
              });

              htmls += '</select>';

               } else {
                htmls +=[
                //left col
                // '<input id="model-'+ca+'-'+c+'-'+d+'-key" type="text" value="'+d+'" class="form-control zero-radius small-font" style="width: 50%;position: relative;" placeholder="'+d+'" aria-describedby="basic-addon1" onchange="'+onChangeEvent+'" />',
                  //right col
                '<input id="model-'+ca+'-'+c+'-'+d+'-value" type="text" value="'+cellData[ca][c][d]+'" class="form-control zero-radius small-font" style="width: 50%;position: relative;" placeholder="'+cellData[ca][c][d]+'" aria-describedby="basic-addon1" ',
                'onchange="graph.getCell(\''+cellAttr.id+'\').attributes.data.'+ca+'.'+c+'.'+d+' = this.value.toString();updateModelProperty();" />'
                ].join('');
               }

            }





            htmls += '<input type="button" value="add new" class="halfWidth" onclick="addObjects(graph.getCell(\''+cellAttr.id+'\').attributes.data.JSONData, \''+c+'\', \'newKey\', \'\');updateModelProperty();"/>'
            htmls += '<input type="button" value="update" class="halfWidth" onclick="updateModelProperty();"/>'
            htmls += "</div>";


            }

          }
        }



        htmls += "</div>";

        showModelControlButtons (cellView, evt, x, y, htmls);



        return htmls;

    }



    function showLinkDesign (cellView, evt, x, y) {
        var cell = cellView.model;
        var cellAttr = cellView.model.attributes;
        var cellAttrs = cellAttr.attrs;
        var cellLabel = cell.attr('.label/text'); // || cell.attr('text/text');
        // var cellLabel = cell.attr('text/text');
        var htmls = "";
        var onChangeEvent = "";

        $('.html-element-design').html("");


        for (var ca in cellAttr) {
          // console.log("-------LINK--CELL",ca);
          if (typeof(cellAttr[ca])!="object") {
            onChangeEvent = [
              'graph.getCell(\''+cellAttr.id+'\').attributes.'+ca+' = this.value;',
              // 'graph.getCell(\''+cellAttr.id+'\').set(\''+ca+'\',this.value);'
            ].join('');

            if (ca=="smooth") {
              onChangeEvent = [
              // 'graph.getCell(\''+cellAttr.id+'\').attributes.'+ca+' = Boolean(this.value);',
              'graph.getCell(\''+cellAttr.id+'\').set(\''+ca+'\',Boolean(this.value==\'true\'));'
              ].join('');

              htmls += [
              '<div class="input-group">',
              '<span class="input-group-addon zero-radius" id="basic-addon1">'+ca+'</span>',
              '<select id="model-'+ca+'" value='+cellAttr[ca]+' class="form-control zero-radius" aria-describedby="basic-addon1" onchange="'+onChangeEvent+'">',
              '<option value=true>true</option><option value=false>false</option>',
              '</select>',
              '</div>'
              ].join('');
            } else {
              htmls += [
                '<div class="input-group">',
                '<span class="input-group-addon zero-radius" id="basic-addon1">'+ca+'</span>',
                '<input id="model-'+ca+'" type="text" value="'+cellAttr[ca]+'" class="form-control zero-radius" placeholder="'+ca+'" aria-describedby="basic-addon1" onchange="'+onChangeEvent+'" />',
                '</div>'
              ].join('');
            }

          }
        }


        // console.log("---------CELL",cellAttrs);
        for (var ca in cellAttrs) {
          // console.log("---------CELL",ca);
          // || cellAttrs[ca].text!=undefined
          // if (cellAttrs[ca].fill!=undefined) { // && ca.indexOf('.')==-1
          if (typeof(cellAttrs[ca])=="object" && ca.indexOf('.label')==-1) {
            for (var c in cellAttrs[ca]) {
              htmls += '<div class="input-group"><span class="input-group-addon zero-radius" id="basic-addon1">'+c+'</span>';
              htmls += '<input id="model-'+ca+'-'+c+'" type="'+(c=="stroke"?"color":(c=="stroke-width"?"range":"text"))+'" value="'+cellAttrs[ca][c]+'" class="form-control zero-radius" placeholder="'+c+'" aria-describedby="basic-addon1" onchange="graph.getCell(\''+cellAttr.id+'\').attr(\''+ca+'/'+c+'\' , this.value);" /></div>';
            }
          }
        }



        htmls += '<div class="input-group"><span class="input-group-addon zero-radius" id="sizing-addon1">Label</span>';
        htmls += '<input id="model-label" type="text" value="'+cellLabel+'" class="form-control zero-radius" placeholder="Label" aria-describedby="sizing-addon1"  onchange="graph.getCell(\''+cell.id+'\').attr(\'.label/text\', $(\'#model-label\').val());graph.getCell(\''+cell.id+'\').label(0,{position: .5,attrs:{text:{text:$(\'#model-label\').val()}}});"></div>';

        showModelControlButtons (cellView, evt, x, y, htmls);

        $("#model-smooth").val(cellAttr.smooth==true?"true":"false");

        return htmls;

    }






    function showModelDesign (cellView, evt, x, y) {

        var cell = cellView.model;
        var cellAttr = cellView.model.attributes;
        var cellAttrs = cellAttr.attrs;
        var cellLabel = cell.attr('.label/text') || cell.attr('text/text');

        var htmls = "<div class='model-design-div'>";
        var onChangeEvent = "";

        $('.html-element-design').html("");

        console.log("###########CELL showModelDesign",cell.attr());

        for (var ca in cellAttr) {
          // console.log("---------CELL",ca);
          if (typeof(cellAttr[ca])!="object") {
            htmls += '<div class="input-group"><span class="input-group-addon zero-radius" id="basic-addon1">'+ca+'</span>';
            htmls += '<input id="model-'+ca+'" type="text" value="'+cellAttr[ca]+'" class="form-control zero-radius" placeholder="'+ca+'" aria-describedby="basic-addon1" onchange="graph.getCell(\''+cellAttr.id+'\').attributes.'+ca+' = this.value;" '+(ca=="type"?"style=\'pointer-events: none;\'":"")+'/></div>';
          }

          if(typeof(cellAttr[ca])=="object" && ca=="size") {
            onChangeEvent += [

            ].join('');
            htmls += [
              '<div class="input-group">',
              '<span class="input-group-addon zero-radius" id="basic-addon1" >'+ca+'.width</span>',
              '<input id="model-'+ca+'-width" type="text" value="'+cellAttr[ca].width+'" class="form-control zero-radius halfWidth" placeholder="'+ca+'.width" aria-describedby="basic-addon1" onchange="var objcell=graph.getCell(\''+cellAttr.id+'\');objcell.resize( this.value,objcell.get(\'size\').height);" />',
              '</div>',

              '<div id="slider-cell-'+ca+'-width" style="pointer-events: auto;"></div>',
              '<script>',
              '$(function() {',
              'var objcell=graph.getCell(\''+cellAttr.id+'\');',
              'var w=objcell.get("size").width;',
              '$( "#slider-cell-'+ca+'-width" ).slider({',
                 ' value:w,min: 70,max: $(\'#paper\').width()*3,step: 5,',
                  'slide: function( event, ui ) {$( "#model-'+ca+'-width" ).val( ui.value );',
                  'objcell.resize( ui.value,objcell.get(\'size\').height);',
                  '}',
                '});',
               '$( "#model-'+ca+'-width" ).val($( "#slider-cell-'+ca+'-width" ).slider( "value" ) );',
                '});',
              '</script>',

              '<div class="input-group">',
              '<span class="input-group-addon zero-radius" id="basic-addon1" >'+ca+'.height</span>',
              '<input id="model-'+ca+'-height" type="text" value="'+cellAttr[ca].height+'" class="form-control zero-radius halfWidth" placeholder="'+ca+'.height" aria-describedby="basic-addon1" onchange="var objcell=graph.getCell(\''+cellAttr.id+'\');objcell.resize(objcell.get(\'size\').width, this.value);" />',
              '</div>',

              '<div id="slider-cell-'+ca+'-height" style="pointer-events: auto;"></div>',
              '<script>',
              '$(function() {',
              'var objcell=graph.getCell(\''+cellAttr.id+'\');',
              'var w=objcell.get("size").height;',
              '$( "#slider-cell-'+ca+'-height" ).slider({',
                 ' value:w,min: 70,max: $(\'#paper\').height()*3,step: 5,',
                  'slide: function( event, ui ) {$( "#model-'+ca+'-height" ).val( ui.value );',
                  'objcell.resize( objcell.get(\'size\').width,ui.value);',
                  '}',
                '});',
               '$( "#model-'+ca+'-height" ).val($( "#slider-cell-'+ca+'-height" ).slider( "value" ) );',
                '});',
              '</script>',

            ].join('');
          }


        }

        for (var ca in cellAttrs) {
          if (cellAttrs[ca].text!=undefined && ca.indexOf('.')==-1) {
            console.log("----text-----CELL text",ca,graph.getCell(cellAttr.id).attributes.data);
            // var jsondate = graph.getCell(cellAttr.id).attributes.data.JSONData;

            htmls += '<div class="input-group"><span class="input-group-addon zero-radius" id="basic-addon1">'+ca+'</span>';
            htmls += '<input id="model-'+ca+'-text" type="text" value="'+cellAttrs[ca].text+'" class="form-control zero-radius" placeholder="'+ca+'" aria-describedby="basic-addon1" onchange="graph.getCell(\''+cellAttr.id+'\').attr(\''+ca+'/text\' , this.value);editObjectKey(graph.getCell(\''+cellAttr.id+'\').attributes.data.JSONData, \''+cellAttrs[ca].text+'\',this.value);" /></div>';
          }



        }

        for (var ca in cellAttrs) {
          if (cellAttrs[ca].fill!=undefined && ca.indexOf('.')==-1) {
            htmls += '<div class="input-group"><span class="input-group-addon zero-radius" id="basic-addon1">'+ca+'</span>';
            htmls += '<input id="model-'+ca+'-fill" type="color" value="'+cellAttrs[ca].fill+'" class="form-control zero-radius" placeholder="'+ca+'" aria-describedby="basic-addon1" onchange="graph.getCell(\''+cellAttr.id+'\').attr(\''+ca+'/fill\' , this.value);" /></div>';
          }
        }


        for (var ca in cellAttrs) {
          if ( ca == ".body" || ca == ".port-body" || ca == "rect" || ca == "circle" || ca == "text" || ca == ".label") {
            htmls += '<div class="input-group"><span class="input-group-addon zero-radius" id="basic-addon1">'+ca+'</span></div>';
            for (var c in cellAttrs[ca]) {
              htmls += '<div class="input-group"><span class="input-group-addon zero-radius" id="basic-addon1">'+c+'</span>';
              htmls += '<input id="model-'+ca+'-attr-body" type="'+((c=="fill"||c=="stroke")?"color":"text")+'" value="'+cellAttrs[ca][c]+'" class="form-control zero-radius" placeholder="'+c+'" aria-describedby="basic-addon1" onchange="graph.getCell(\''+cellAttr.id+'\').attr(\''+ca+'/'+c+'\' , this.value);" /></div>';
            }
          }
        }


        htmls +="</div>";

        showModelControlButtons (cellView, evt, x, y, htmls);





        return htmls;

    }


    function showModelControlButtons (cellView, evt, x, y, htmls) {

        var cell = cellView.model;
        var cellAttr = cellView.model.attributes;
        var cellAttrs = cellAttr.attrs;
        var cellLabel = cell.attr('.label/text') || cell.attr('text/text');

        var cellData = cell.get("data");

        // var htmls = "";


        htmls += [
          '<hr>',
          '<input type="button" id="html-element-update-btn" class="btn btn-info zero-radius" value="Update" />',
          '<input type="button" class="btn btn-info zero-radius" value="Export" onclick="document.getElementById(\'html-element-export-btn\').click();"/>',
          '<input type="button" value="Import" class="btn btn-info zero-radius" onclick="LoadCell();" />',
          // '<br/>',
          '<input type="button" id="html-element-clone-btn" class="btn btn-info zero-radius" value="Clone" />',
          '<input type="button" id="html-element-remove-btn" class="btn btn-info zero-radius" value="Remove" />',
          '<input type="button" id="html-element-showjson-btn" class="btn btn-info zero-radius" value="ShowJSON" />'
        ].join('');

        if (cellData.type == "area" || (cell.get("embeds")!=undefined&&cell.get("embeds").length>0)) {
          htmls += '<input type="button" value="UnembedCells" class="btn btn-info zero-radius" onclick="UnembedCells(\''+cell.id+'\');" />';
        }



        $('.html-element-design').html(htmls);
        $('#html-element-export-btn').off('click');
        $('#html-element-import-btn').off('change');
        $('#html-element-update-btn').off('click');
        $('#html-element-remove-btn').off('click');
        $('#html-element-clone-btn').off('click');
        $('#html-element-showjson-btn').off('click');
        $('#html-element-showjson-btn').on('click',function(e){
            loopCellsData(cell);
            // updateCellData(cell);
            if (cell.attributes.data == undefined){return;}
            var jsondata = JSON.stringify(cell.attributes.data.JSONData);
            if (jsondata != undefined) {showGoodMsg(jsondata);}
         });
        $('#html-element-clone-btn').on('click',function(e){
            cell = selectedCell.model;
            var w = cell.get("size").width;
            var newCell = cell.clone().translate(w+60,30).toFront().addTo(graph);
            var EmbeddedCells = cell.getEmbeddedCells();
            var cellsIdMap = {};
            cellsIdMap[cell.id] = newCell.id;
            _.each(EmbeddedCells,function(v,k,l){
              // var width = v.get("size").width;
              var newEmbedCell = v.clone().translate(w+60,30).toFront().addTo(graph);
              newCell.embed(newEmbedCell);
              cellsIdMap[v.id] = newEmbedCell.id;
              console.log("-----cell.id:",v.id,", newCell.id",newEmbedCell.id);
            });


            _.each(EmbeddedCells,function(v,k,l){
              // var vlinks = graph.getLinks();
              var vlinks = graph.getConnectedLinks(v, { inbound: true });
              console.log("---vlinks:",vlinks);
              _.each(vlinks,function(vv,kk,ll){
                  // if(!vv.isEmbeddedIn(cell)){return;}
                  var sId = cellsIdMap[vv.get("source").id] || vv.get("source").id;
                  var tId = cellsIdMap[vv.get("target").id] || vv.get("target").id;
                  // if (vv.get("source").id!=vv.attributes.source.id || vv.get("target").id!=vv.attributes.target.id){return;}
                  if (sId==undefined||sId==undefined){return;}
                  console.log("-----cellsIdMap:",vv.get("source").id,sId,vv.get("target").id,tId);
                  var newLink = createLinks(sId,tId,vv.get("data").type,graph);
                  console.log("---newLink:",newLink);
              });
            });


            if(EmbeddedCells==undefined || EmbeddedCells.length==0){
              var vlinks = graph.getConnectedLinks(cell, { inbound: true });
              console.log("---vlinks:",vlinks);
              _.each(vlinks,function(vv,kk,ll){
                  // if(!vv.isEmbeddedIn(cell)){return;}
                  var sId = cellsIdMap[vv.get("source").id] || vv.get("source").id;
                  var tId = cellsIdMap[vv.get("target").id] || vv.get("target").id;
                  // if (vv.get("source").id!=vv.attributes.source.id || vv.get("target").id!=vv.attributes.target.id){return;}
                  if (sId==undefined||sId==undefined){return;}
                  console.log("-----cellsIdMap:",vv.get("source").id,sId,vv.get("target").id,tId);
                  var newLink = createLinks(sId,tId,vv.get("data").type,graph);
                  console.log("---newLink:",newLink);
              });
              return;
            }

         });
        $('#html-element-remove-btn').on('click',function(e){
            cell.remove();
         });
        $('#html-element-import-btn').on('change',function(e){
            LoadFromJSON();
        });
        $('#html-element-export-btn').on('click',function(e){
          if(cell==undefined || cell.isLink()) {return;}
          var data = JSON.stringify(cell.toJSON());
          // showInfoMsg(data.toString());
          console.log("----getEmbeddedCells:",cell,cell.getEmbeddedCells(),cell.getEmbeddedCells({"deep":true}));

          var exportData = {"cells":[]};
          // exportData.cells.push(data);
          _.each(graph.findModelsInArea(cell.getBBox()), function(value, key, list){
            exportData.cells.push(value.toJSON());
            _.each(graph.getConnectedLinks(value), function(v, k, l){
              console.log('---getAllLinks',k,v);
              // graph.getCell(id)
              graph.getCell(v.get("source").id).get("parent");
              graph.getCell(v.get("target").id).get("parent");

              if (graph.getCell(v.get("source").id).get("parent")!=undefined &&
                graph.getCell(v.get("target").id).get("parent")!=undefined &&
                graph.getCell(v.get("source").id).get("parent") == graph.getCell(v.get("target").id).get("parent")) {
                exportData.cells.push(v.toJSON());
              }
            });
          });
          showInfoMsg(JSON.stringify(exportData).toString());
          // console.log("----exportData:",exportData,cell.getBBox(),graph.findModelsInArea(cell.getBBox()));

          saveJSONDataToFile(exportData,cellLabel+'.'+cellAttr.type+'.json');

        });


    }



