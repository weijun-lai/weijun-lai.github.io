


    var graph_tools_instances = new joint.dia.Graph;
    var paper_tools_instances = new joint.dia.Paper({
        el: $('#paper-tools-instances'),
        width: $( window ).width()*2,
        height: $( window ).height()*2,
        model: graph_tools_instances,
        gridSize: 1,
        interactive: false
    });

    $('#paper-tools-instances').css({'height': (($('#paper-small').height()))+'px'});


/**********************************************************************
**********************************************************************
**********************************************************************
***********************************************************************/



/*  Symbols  */
/*
    Software Main Model
    Systems Model
        [custom system]
        database Model
            db-method
                connect_database
                create_database
                create_table
                insert_table
                select_table
                update_table
                delete_table
                db_attributes
                db_values
        handler Model
            hd-method
                associate
                scope
                params
                return
        ui model
            ui-method
    Managers Model
        database Model
        handler Model
        ui model
    Components Model
        ui model
        pages model
    Document Model
        [basic info]
*/

var x = 20, y=20;
var w=80, h=50, maxW=0, i=0,currentLevel=0;
var padding=20;

// Software Main point Model, the start point of the program.
var softwareMainModel = (new joint.shapes.devs.NewRect({
    outPorts: [''],
    attrs: {
        rect:{fill:"#49075e"},
        text:{fill:"#ffffff"},
        '.inPorts circle': { fill: '#16A085' , r:1},
        '.outPorts circle': { fill: '#E74C3C' , r:1}
    },
    data: {
        type:"start",
        locked:true,
        JSONData:{
            'Software':{
                "App": {
                    "name":"autoWebGenEditor",
                    "version":"1.0",
                    "date": (new Date()).toString(),
                    "author":"weijun lai"
                },
                "Systems": {

                },
                 "Components":{
                },
                "Managers":{
                }
            }
        }
    }
})).position(x, y).resize(w, h).attr("text/text","Software").addTo(graph_tools_instances);
maxW = w;


var drawRectTool = (new joint.shapes.devs.NewRect({
    attrs: {
        rect:{fill:"#000000", "fill-opacity":"0.05", stroke: '#000000', "stroke-dasharray":"3", "stroke-width":"2"},
        text:{'ref-y': 18,'ref-x': 8, fill:"#000000"}
    },
    data: {
        type:"area",
        locked:false,
        JSONData:{'Area':{}}
    }
})).position(x, y+h+padding).resize(40, 35).attr("text/text","Area").addTo(graph_tools_instances).set("z",0);
maxW = w;

// var packageModels = ["Systems","Components","Managers","App"];



var portSize = 1;

function createCirleModel(x,y,w,h,text,data,graph,dasharray) {
    return (new joint.shapes.devs.CircleModel({
        inPorts: [''],
        outPorts: [''],
        attrs: {
            circle: { fill: '#FFFFFF', stroke: '#000',"stroke-width":"1","stroke-dasharray":dasharray},
            '.inPorts circle': { fill: '#16A085' , r:portSize, opacity: 0.1},
            '.outPorts circle': { fill: '#E74C3C' , r:portSize , opacity: 0.1}
        },
        data: data,
    })).position(x, y).resize(w, h).attr("text/text",text).addTo(graph);
}

function createNewRect(x,y,w,h,text,data,graph,dasharray) {
    return (new joint.shapes.devs.NewRect({
        inPorts: [''],
        outPorts: [''],
        attrs: {
            text:{'ref-y': 0.25,'ref-x': 0.25, fill: '#000'},
            rect: { fill: '#FFFFFF', stroke: '#000',"stroke-width":"1","stroke-dasharray":dasharray, "rx":"0", "ry":"0"},
            '.inPorts circle': { fill: '#16A085' , r:portSize , opacity: 0.1},
            '.outPorts circle': { fill: '#E74C3C' , r:portSize , opacity: 0.1}
        },
        data: data,
    })).position(x, y).resize(w, h).attr("text/text",text).addTo(graph);
}

function createGenericModel(x,y,w,h,text,data,graph,dasharray) {
    var newCell = (new joint.shapes.devs.GenericModel({
        inPorts: [''],
        outPorts: [''],
        attrs: {
            '.body': { d: svgImage[data.image] },
            '.port-body': { opacity: 0.1 } ,
            '.label': { text: text }
        },
        data: data,
    })).position(x, y).resize(70, 70).attr(".label/text",text).addTo(graph);

    var cellview = paper.findViewByModel(newCell) || paper_tools_instances.findViewByModel(newCell);
    console.log("----createGenericModel",newCell,cellview);
    var scaleValue = cellview.scalableNode.node.attributes.transform.value;
    var scaleNums = scaleValue.substring(6,scaleValue.length-1).split(",");
    var w = 70/Number(scaleNums[0])/70 || 0;
    var h = 70/Number(scaleNums[1])/70 || 0;
    console.log("----createGenericModel",w,h,scaleNums,scaleValue,cellview);
    newCell.attr({ '.body-rect' :{ transform: 'scale('+w+','+h+')' } });
    return newCell;
}

function createGenericModelPath(x,y,w,h,text,data,graph,dasharray) {
    return (new joint.shapes.devs.GenericModelPath({
        inPorts: [''],
        outPorts: [''],
        attrs: {
            '.body': { d: svgImage[data.image] },
            '.port-body': { opacity: 0.1 } ,
            '.label': { text: text }
        },
        data: data,
    })).position(x, y).resize(70, 70).attr(".label/text",text).addTo(graph);
}


function createLinks(sId, tId,lktype, graph){
    return (new joint.dia.Link({
        source: { id: sId },
        target: { id: tId },
          attrs: {
            '.label': { text: lktype, 'ref-x': .4, 'ref-y': .2 },
            // text: { text: 'has', fill: '#000','font-size': 12, 'font-family': 'sans-serif' },
            '.connection': { stroke: '#000' , "stroke-dasharray":(lktype=="call"?5:0), "stroke-width":"4"},
            // '.connection': { stroke: 'blue' , "stroke-dasharray":"5,5", "stroke-width":"4"},
            // '.marker-source': { fill: '#000', d: 'M 10 0 L 0 5 L 10 10 z' },
            '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' }
          },
          data: {
            type:lktype,
            level:"",
            source:"",
            path:"",
            JSONData:{}
        },
          labels: [
              { position: 0.5,
                attrs: {
                  text: { text: lktype, fill: '#ffffff','font-size': 12, 'font-family': 'sans-serif' },
                  rect: { stroke: (lktype=="relate"?'#0066CC':'#49075e') , 'stroke-width': 14, rx: 2, ry: 2 } //7c68fc
              }
            }
          ],
          smooth:false
        })).addTo(graph);
}


x += maxW+padding;maxW=0;i=0;currentLevel=1;
offsetT=0;
_.each(packageModels, function(value, key, list){
    var tw = key.length*10;
    w = tw>h ? tw:70;
    offsetT=0;
    maxW = maxW>w ? maxW:w;
    if (currentLevel!=value.level) {
        currentLevel=value.level;
        x += maxW+padding;maxW=0;i=0;
    }
    if (value.data.image != undefined && value.data.image != "" && value.shapes != "GenericModel") {
        value.shapes = "GenericModel";
        value.data.type = "gmethod";
        offsetT=-70*2;
    }
    if (value.shapes == "GenericModel") {
        createGenericModel(x-h*0.7-offsetT/5,offsetT+h/2+y+(i++)*(h+padding*2.5),w,h,key,value.data,graph_tools_instances,0);
    }
    if (value.shapes == "GenericModelPath") {
        createGenericModelPath(x-h,y+(i++)*(h+padding),w,h,key,value.data,graph_tools_instances,0);
    }
    if (value.shapes == "CircleModel") {
        createCirleModel(x,h/2+y+(i++)*(h+padding),w,h,key,value.data,graph_tools_instances,0);
    }
    if (value.shapes == "NewRect") {
        createNewRect(x-h,y+(i++)*(h+padding),w,h,key,value.data,graph_tools_instances,0);
    }
    if (value.shapes == "NewRect2") {
        createNewRect(x-h,y+(i++)*(h+padding),w,h,key,value.data,graph_tools_instances,5);
    }

});




// var model = new joint.shapes.devs.GenericModel({
//     size: { width: 70, height: 70 },
//     inPorts: [''],
//     outPorts: ['']
// });

// _.each(svgImage, function(v,k,l){
//     var x = Math.floor(Math.random() * $(window).width()) + 1;
//     var y = Math.floor(Math.random() * $(window).height()) + 1;
//     var tdata = {
//             type:"gmethod",
//             locked:false,
//             JSONData:{}
//         };
//     tdata.JSONData[k]={"svg source":k};
//     graph.addCell(model.clone().set("data",tdata).position(startX+x,startY+y)
//         .attr({ '.body': { d: v }, '.port-body': { opacity: 0.1 } , '.label': { text: k }})
//         );

// });



// graph.addCell(model.clone().set("data",tdata).position(startX+150,startY+100).attr({ '.body': { d: svgImage.thunder }, '.port-body': { d: svgImage.umbrella }}));
// graph.addCell(model.clone().set("data",tdata).position(startX+550,startY+200).attr({ '.body': { d: svgImage.newspaper }, '.port-body': { d: svgImage.music }}));
// graph.addCell(model.clone().set("data",tdata).position(startX+300,startY+250).attr({ '.body': { d: svgImage.home }, '.port-body': { d: svgImage.star }}));
// graph.addCell(model.clone().set("data",tdata).position(startX+200,startY+450).attr({ '.body': { d: svgImage.databaseIcon }}));

