

function addAlert(msgType,message,time) {
    var id = joint.util.uuid();
    var JQueryId = "#" + id;
    $('#alerts_msg').append('<div id="alert_'+id+'"></div>');

    $('#alert_'+id).append(
        '<div style="width:50%/*display:none;*/" class="alert alert-'+msgType+' alert-dismissible alert-map" role="alert" id="' + id + '">' +
            '<button type="button" class="close" data-dismiss="alert">' +
            'x</button>' + message + '</div>');

    $('#alert_'+id).hide().show('slide',{direction: 'right'}, 500);

    if (time<120000) {
        window.setTimeout(function () {
            // closing the popup
            $('#alert_'+id).hide('slide',{direction: 'right'}, 500);
            $(JQueryId).fadeTo(300, 0.5).slideUp(3000, function () {
                $(JQueryId).alert('close');
                $('#alert_'+id).remove();
            });
        }, time);
    }
}

var debug_mode = 1;

function showErrorMsg(message) {
    addAlert('danger',message,10000)
}

function showInfoMsg(message) {
    addAlert('info',message,10000)
}

function showWarningMsg(message) {
    addAlert('warning',message,10000)
}

function showGoodMsg(message) {
    addAlert('success',message,10000)
}

function showTicketMsg(message) {
    addAlert('warning',message,300000)
}

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
      var data = JSON.stringify(historyJSONData);
      showInfoMsg(data.toString());
      $('#html-element-export-btn').off('click');
      $('#html-element-export-btn').off('change');
      $('#html-element-export-btn').on('click',function(e){
          saveJSONDataToFile(historyJSONData,'webapp_models_data.json');
      });
      document.getElementById('html-element-export-btn').click();
    }


    function SaveJSONFile(jsondata) {
      historyJSONData = jsondata;
      $('#html-element-export-btn').off('click');
      $('#html-element-export-btn').off('change');
      $('#html-element-export-btn').on('click',function(e){
          saveJSONDataToFile(historyJSONData,'webapp_models_data.json');
      });
      document.getElementById('html-element-export-btn').click();
    }



    function LoadFile() {

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
      // graph.clear();
      graph.fromJSON(historyJSONData);
    }

    function importModelJSONdata(data) {
      var dataJSON;
      var cellDataJSON = JSON.parse(data);

      if (cellDataJSON.cells==undefined) {
        dataJSON = graph.toJSON();
        cellDataJSON.id = joint.util.uuid();
        dataJSON.cells.push(cellDataJSON);
      }else if (Object.keys(cellDataJSON)[0]=="cells") {
        dataJSON = graph.toJSON();
        _.each(cellDataJSON.cells, function(value, key, list){
            dataJSON.cells.push(value);
        });

      }

      graph.clear();
      graph.fromJSON(dataJSON);
      var control = $("#html-element-import-btn");
      control.replaceWith( control = control.clone( true ) );
    }

    function GraphClear() {
      graph.clear();
    }


    function graphMaxZindex(){
        var maxZ=0;
        _.each(graph.getElements(),function(v,k,l){
            maxZ = maxZ < v.get("z")? v.get("z"): maxZ;
        });
        return maxZ;
    }

    function graphUnclickCells() {

    }



    function UnembedCells(cellId) {
      var cell = graph.getCell(cellId);
      var EmbeddedCells = cell.getEmbeddedCells();
      _.each(EmbeddedCells,function(v,k,l){
        cell.unembed(v);
      });
    }


    function gotoCells(key, cellId) {

      var cell = graph.getCell(cellId);
      var neighbors = graph.getNeighbors(cell);

      var result = _.find(neighbors, function(v,k,l){
        if (Object.keys(v.get("data").JSONData)[0] == key) {
          if(selectedCell!=undefined){selectedCell.model.attr({ '.body': { 'stroke': 'black' }});};
          selectedCell = paper.findViewByModel(v);
          selectedCell.model.attr({ '.body': { 'stroke': 'red' }});
          updateModelProperty();
          return true;
        }
      });

      if(result==undefined){
        _.find(packageModels, function(value,k,l){
          if(k==key){
            var tw = key.length*10;
            var x = cell.position().x+Math.floor((Math.random() * 300) + 100);;
            var y = cell.position().y+Math.floor((Math.random() * 400) - 200);;
            var w = 70,h=70;
            w = tw>h ? tw:h;

            var cellKey = Object.keys(cell.get("data").JSONData)[0];

            var cellData = jQuery.extend(true, {}, value.data);

            if (cellKey!=undefined
              && cell.get('data').JSONData[cellKey][key]!=undefined
              && _.keys(cell.get("data").JSONData[cellKey][key]).length >0
              ){
              cellData.JSONData[key] = cell.get('data').JSONData[cellKey][key];
            }


            if (value.shapes == "CircleModel") {
                var newCell = createCirleModel(x,y,w,h,key,cellData,graph,0);
            }
            if (value.shapes == "NewRect") {
                var newCell = createNewRect(x,y,w,h,key,cellData,graph,0);
            }
            if (value.shapes == "NewRect2") {
                var newCell = createNewRect(x,y,w,h,key,cellData,graph,5);
            }
            if (value.shapes == "GenericModel") {
                var newCell = createGenericModel(x,y,w,h,key,cellData,graph,0);
            }
            if (value.shapes == "GenericModelPath") {
                var newCell = createGenericModelPath(x,y,w,h,key,cellData,graph,0);
            }
            if(newCell==undefined){return;}
            createLinks(cell.id, newCell.id,"has", graph);
            if(selectedCell!=undefined){selectedCell.model.attr({ '.body': { 'stroke': 'black' }});};
            selectedCell = paper.findViewByModel(newCell);
            selectedCell.model.attr({ '.body': { 'stroke': 'red' }});
            updateModelProperty();
          }
        });
      }

    }

    function cloneObj(obj) {
      if (null == obj || "object" != typeof obj) return obj;
      var copy = obj.constructor();
      for (var attr in obj) {
          if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
      }
      return copy;
  }


    function updateSourceLinkData(linkCell) {
        var inboundCell = graph.getCell(linkCell.attributes.source.id);
        loopCellsData(inboundCell);
    }

    function updateCellData(cell) {
        var key = Object.keys(cell.attributes.data.JSONData)[0];
        cell.attributes.data.JSONData = {};
        cell.attributes.data.JSONData[key] = {};
        loopCellsData(cell);
    }

    function updateCellsData(cell) {
        var cellKey = Object.keys(cell.attributes.data.JSONData)[0];
        cell.attributes.data.JSONData[cellKey] = {};
        loopCellsData(cell);
    }

    var loopcouter = 0;
    var loopmax = 10000;


    function loopCellsData(cell) {
        loopcouter = 0;
        loopCellData(cell,[]);
    }

    function loopCellData(cell, targetIds) {
        if (cell.attributes.data==undefined){return;}
        console.log("cell.id:",cell.id,"data:",cell.attributes.data.JSONData);
        var outboundLinks = graph.getConnectedLinks(cell, { outbound: true });
        var inboundLinks = graph.getConnectedLinks(cell, { inbound: true });
        var neighbors = graph.getNeighbors(cell);
        var cellKey = Object.keys(cell.attributes.data.JSONData)[0];
        console.log("out:",outboundLinks,"in:",inboundLinks,"nei:",neighbors);



        // check database connect is at first place or not.
        var cellData = cell.attributes.data.JSONData[cellKey];
        var BDconKey = 'create_table';
        var i=0;
        var findBDconnKey = _.find(cellData, function(value, key, list){
            i++;
            return key==BDconKey;
        });
        if (findBDconnKey) {
            // showGoodMsg(i+" found:"+cellKey);
            if (i!=1) {
                var temp = {};
                temp[BDconKey] = cellData[BDconKey];
                delete cellData[BDconKey];
                _.each(cellData, function(value, key, list){
                    temp[key] = value;
                });
                cellData = temp;
                cell.attributes.data.JSONData[cellKey] = temp;
            }
        }

        // check database connect is at first place or not.
        cellData = cell.attributes.data.JSONData[cellKey];
        BDconKey = 'drop_table';
        i=0;
        findBDconnKey = _.find(cellData, function(value, key, list){
            i++;
            return key==BDconKey;
        });
        if (findBDconnKey) {
            // showGoodMsg(i+" found:"+cellKey);
            if (i!=1) {
                var temp = {};
                temp[BDconKey] = cellData[BDconKey];
                delete cellData[BDconKey];
                _.each(cellData, function(value, key, list){
                    temp[key] = value;
                });
                cellData = temp;
                cell.attributes.data.JSONData[cellKey] = temp;
            }
        }

        // check database connect is at first place or not.
        cellData = cell.attributes.data.JSONData[cellKey];
        BDconKey = 'create_database';
        i=0;
        findBDconnKey = _.find(cellData, function(value, key, list){
            i++;
            return key==BDconKey;
        });
        if (findBDconnKey) {
            // showGoodMsg(i+" found:"+cellKey);
            if (i!=1) {
                var temp = {};
                temp[BDconKey] = cellData[BDconKey];
                delete cellData[BDconKey];
                _.each(cellData, function(value, key, list){
                    temp[key] = value;
                });
                cellData = temp;
                cell.attributes.data.JSONData[cellKey] = temp;
            }
        }




        // check database connect is at first place or not.
        cellData = cell.attributes.data.JSONData[cellKey];
        BDconKey = 'connect_database';
        i=0;
        findBDconnKey = _.find(cellData, function(value, key, list){
            i++;
            return key==BDconKey;
        });
        if (findBDconnKey) {
            // showGoodMsg(i+" found:"+cellKey);
            if (i!=1) {
                var temp = {};
                temp[BDconKey] = cellData[BDconKey];
                delete cellData[BDconKey];
                _.each(cellData, function(value, key, list){
                    temp[key] = value;
                });
                cellData = temp;
                cell.attributes.data.JSONData[cellKey] = temp;
            }
        }






        // get all outbound data
        _.each(outboundLinks, function(value, key, list){
            console.log("target.id:",value.attributes.target.id,"key",key);



            if (value.attributes.data==undefined){return;}
            var outbountLinkType = value.attributes.data.type;
            var outboundTarget = graph.getCell(value.attributes.target.id);
            if (outboundTarget==undefined) {return;}
            var outbountKey =  Object.keys(outboundTarget.attributes.data.JSONData)[0];
            console.log("------outboundTarget:",outboundTarget.id,"type:",outbountLinkType,"data",outboundTarget.attributes.data.JSONData);
            var outboundLink = graph.getConnectedLinks(outboundTarget, { outbound: true });

            var check = _.find(targetIds, function(num){ return num == value.attributes.source.id });

            if(loopcouter++>loopmax){
              // showErrorMsg("Error: infinite loop! "+cellKey);
              return;
            };

            // if (check!=undefined){showErrorMsg("infinite loop! "+cellKey);}
            if (outbountLinkType=="has") {
                targetIds.push(value.attributes.target.id);
            }


            if (Object.keys(outboundLink).length!=0) {
                loopCellData(outboundTarget,targetIds);
            }

            if (outbountLinkType=="call") {
                deleteObject(cell.attributes.data.JSONData[cellKey], outbountKey);
                deleteObject(cell.attributes.data["relate"], outbountKey);
                deleteObject(cell.attributes.data.JSONData[cellKey], "call");
                addObjects(cell.attributes.data.JSONData,cellKey, "call", outbountKey);
                // return;
            }
             if (outbountLinkType=="has") {
                if(cell.attributes.data.JSONData==undefined&&cell.attributes.data.JSONData[cellKey]["call"]!=undefined
                    && cell.attributes.data.JSONData[cellKey]["call"] == outbountKey){
                    deleteObject(cell.attributes.data.JSONData[cellKey], "call");
                    deleteObject(cell.attributes.data["relate"], outbountKey);
                }
                addObjects(cell.attributes.data.JSONData, cellKey, outbountKey,outboundTarget.attributes.data.JSONData[outbountKey]);
            }
             if (outbountLinkType=="relate") {
                if(cell.attributes.data.JSONData[cellKey]["call"]!=undefined
                    && cell.attributes.data.JSONData[cellKey]["call"] == outbountKey){
                    deleteObject(cell.attributes.data.JSONData[cellKey], "call");
                  deleteObject(cell.attributes.data.JSONData[cellKey], outbountKey);
                }
                if(cell.attributes.data["relate"]==undefined){cell.attributes.data["relate"]={}};
                addObjects(cell.attributes.data["relate"], "", outbountKey,outboundTarget.attributes.data.JSONData[outbountKey]);
                var oldCellKeyData =  cell.attributes.data.JSONData[cellKey][outbountKey];
                oldCellKeyData = typeof(oldCellKeyData)=="object"? "":oldCellKeyData;
                addObjects(cell.attributes.data.JSONData[cellKey], "", outbountKey,oldCellKeyData);
            }



        });


    }



    function loopCellsParentData(cell, paths) {
        if (startPoint==undefined){return;}
        console.log("cell.id:",cell.id,"data:",cell.attributes.data.JSONData);
        var outboundLinks = graph.getConnectedLinks(cell, { outbound: true });
        var inboundLinks = graph.getConnectedLinks(cell, { inbound: true });
        var neighbors = graph.getNeighbors(cell);
        var cellKey = Object.keys(cell.attributes.data.JSONData)[0];
        console.log("out:",outboundLinks,"in:",inboundLinks,"nei:",neighbors);

        paths.push(cellKey);

        _.each(inboundLinks, function(value, key, list){
            if (value.attributes.data==undefined){return;}
            console.log("---source.id:",value.attributes.source.id,"key",key,value.attributes.data);
            var inbountLinkType = value.attributes.data.type;
            var inboundTarget = graph.getCell(value.attributes.source.id);
            if (inboundTarget==undefined) {return;}
            var inbountKey =  Object.keys(inboundTarget.attributes.data.JSONData)[0];


            var obj = inboundTarget.attributes.data.JSONData[inbountKey];
            var oldkey = cellKey;

            showGoodMsg("change "+oldkey+" to "+newKey);
            console.log('-----obj---',obj,oldkey,newKey,inbountKey,inboundTarget);

        });
    }



    function loopCellsParentDataKeys(cell, newKey) {
        console.log("cell.id:",cell.id,"data:",cell.attributes.data.JSONData);
        var outboundLinks = graph.getConnectedLinks(cell, { outbound: true });
        var inboundLinks = graph.getConnectedLinks(cell, { inbound: true });
        var neighbors = graph.getNeighbors(cell);
        var cellKey = Object.keys(cell.attributes.data.JSONData)[0];
        console.log("out:",outboundLinks,"in:",inboundLinks,"nei:",neighbors);

        _.each(inboundLinks, function(value, key, list){
            // console.log("---source.id:",value.attributes.target.id,"key",key);
            if (value.attributes.data==undefined){return;}
            console.log("---source.id:",value.attributes.source.id,"key",key,value.attributes.data);
            var inbountLinkType = value.attributes.data.type;
            var inboundTarget = graph.getCell(value.attributes.source.id);
            if (inboundTarget==undefined) {return;}
            var inbountKey =  Object.keys(inboundTarget.attributes.data.JSONData)[0];

            var obj = inboundTarget.attributes.data.JSONData[inbountKey];
            var oldkey = cellKey;

            showGoodMsg(inbountKey+" change "+oldkey+" to "+newKey);
            console.log('-----obj---',obj,oldkey,newKey,inbountKey,inboundTarget);

            editObjectElementKey(obj, oldkey, newKey);

        });
    }





    function Generation() {

        var allElements = graph.getElements();
        var cell = startPoint;

        var contents = document.getElementById("modal-body-content");
        contents.innerHTML="Generating...<br/>";


        for (var e in allElements) {
            // console.log("cell.id:",cell.id);
            // console.log("element.type:",allElements[e].attributes.data);
            if (allElements[e].attributes.data==undefined){continue;}
            if (allElements[e].attributes.data.type==undefined){continue;}
            if (allElements[e].attributes.data.type=="start") {
                cell = allElements[e];
                startPoint = cell;
                console.log("element.type:",allElements[e].attributes.data.type,allElements[e].id);
                break;
            }
        }



        if (startPoint==undefined || cell.get("data").type.toString() !="start"){
            contents.innerHTML="No software main start point found.<br/>";
            showErrorMsg("no software main start point found.");return;
        }


        var cellKey = Object.keys(startPoint.attributes.data.JSONData)[0];
        updateCellsData(startPoint);


      var jdata = JSON.stringify(startPoint.attributes.data.JSONData[cellKey]);

      ajax_post('php/createApp.php', startPoint.attributes.data.JSONData[cellKey]);

    }


    function getJsonFile() {
      // saveDataAsFile(JSON.stringify(app_json),app_json.app.name+".json");
      var cellKey = Object.keys(startPoint.attributes.data.JSONData)[0];
      SaveJSONFile(startPoint.attributes.data.JSONData[cellKey]);
    }


    function removeOutputFolder() {
      $.ajax({
        type: 'POST',
        url: 'php/funs.php',
        data: {methods: 'removeOutputFolder'}, // or JSON.stringify ({name: 'jonas'}),
        success: function(data) {
          console.log("Clear Output Folder Done!");
          showInfoMsg("Clear Output Folder Done!");
        }
      });
    }


    function ajax_post(url,jsondata) {
      // return showGoodMsg(url+", "+jsondata);
      var newDiv = document.createElement("div");
      var contents = document.getElementById("modal-body-content");
      contents.innerHTML="";
      contents.appendChild(newDiv);

      var appinfo = jsondata.app || jsondata.App;
      jfilename = appinfo.name+"_"+appinfo.version;

      $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(jsondata), // or JSON.stringify ({name: 'jonas'}),
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          newDiv.innerHTML+="<pre>Server responded "+XMLHttpRequest.status+": "+errorThrown+"</pre>";
          newDiv.innerHTML+="<pre>"+XMLHttpRequest.responseText+"</pre><br/>";
          console.log("----XMLHttpRequest:",XMLHttpRequest);
        },
        success: function(data) {
          // console.log('ajax_success_data: ' + data);
          // if(app_json.app.version==undefined){}
          newDiv.innerHTML="<br/><pre>View:<a href='output/' target='_blank'>output</a> --- <a href='javascript:removeOutputFolder()' target='_blank'> Clear</a>\
           - Download <a href='output/output.zip' target='_blank'>output.zip</a>, <a href='javascript:getJsonFile()' target='_blank'>"+jfilename+".json"+"</a> </pre>";
          newDiv.innerHTML+="<pre>Server responded data</pre>";
          newDiv.innerHTML+="<pre>"+data+"</pre><br/>";
        }
      });
    }


    $( window ).resize(function() {
      console.log(toolBoxElement.size,$( window ).width(),$( window ).height());
      paper.setDimensions($( window ).width()*scaleSize,$( window ).height()*scaleSize);
      paperSmall.setDimensions(($( window ).width()*scaleSize-toolboxSize)/4,$( window ).height()*scaleSize/4);
      $('#paper').css({'width': (($(window).width()))+'px','height': (($(window).height()))+'px'});
      $('#paper-tools').css({'height': (($(window).height()))+'px'});

      $('#paper-small').css({'width': (($(window).width()/4))+'px','height': (($(window).height()/4))+'px'});
      $('#paper-small-box').css({'width': ((($(window).width()-toolboxSize)/4/scaleSize))+'px','height': (($(window).height()/4/scaleSize))+'px'});
      //-toolboxSize

      $('#paper-tools-instances').css({'height': (($('#paper-small').height()))+'px'});



    });