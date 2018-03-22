


/**********************************************************************
**********************************************************************
**********************************************************************
***********************************************************************/

// testing new rectangle model.
joint.shapes.basic.newRect = joint.shapes.basic.Generic.extend({
markup: '<g class="rotatable"><g class="scalable"><rect/></g><text/><g class="inPorts"/><g class="outPorts"/></g>',
portMarkup: '<g class="port port<%= id %>"><rect class="port-body"/><text class="port-label"/></g>',
defaults: joint.util.deepSupplement({
  type: 'basic.newRect',
  inPorts: [],
  outPorts: [],
  data:{},
  attrs: {
    '.body': { r: 50, cx: 50, stroke: 'blue', fill: 'lightblue' },
      'rect': { fill: 'white', stroke: '#000', 'follow-scale': true, width: 80, height: 40 },
      '.inPorts circle': { fill: '#16A085', magnet: 'passive', type: 'input'},
	  '.outPorts circle': { fill: '#E74C3C', type: 'output'},
      '.port-body': { width: 10, height: 10, x: -5, stroke: 'gray', fill: 'lightgray' },
      'text': { text: 'new box', fill: '#000', 'font-size': 12, 'ref-x': .5, 'ref-y': .5, ref: 'rect', 'y-alignment': 'middle', 'x-alignment': 'middle' }
  },
  size: { width: 100, height: 30 }
}, joint.shapes.basic.Generic.prototype.defaults)
});




/**********************************************************************
**********************************************************************
**********************************************************************
***********************************************************************/



joint.shapes.devs.GenericModel = joint.shapes.devs.Model.extend({

    markup: '<g class="rotatable"><g class="scalable"><rect class="body-rect"/><svg width="500" height="500" viewBox="0 0 70 70" ></svg><path class="body"/></g><text class="label"/><g class="inPorts"/><g class="outPorts"/></g>',
    portMarkup: '<g class="port port<%= id %>"><circle class="port-body"/><text class="port-label"/></g>',

    defaults: joint.util.deepSupplement({

        type: 'devs.GenericModel',
        inPorts: [],
        outPorts: [],
        data: {
            type:"",
            locked:false,
            JSONData:{}
        },
        attrs: {
            '.body': { stroke: 'black', fill: 'black' },
            '.body-rect' :{ width:70, height:70, fill: 'white', "fill-opacity":0.0 },
            '.label': { 'ref-y': -20 },
            '.port-body': { stroke: 'gray', fill: 'lightgray', magnet: 'active' },
            '.inPorts .port-body circle' : { fill: '#16A085', r:2 },
            '.outPorts .port-body circle': { fill: '#16A085', r:2},
            '.inPorts .port-label': { dx: -20 },
            '.outPorts .port-label': { dx: 20 }
        }

    }, joint.shapes.devs.Model.prototype.defaults)
});

joint.shapes.devs.GenericModelView = joint.shapes.devs.ModelView;

//<svg width="70" height="70" viewBox="0 0 64 64" >

joint.shapes.devs.GenericModelPath = joint.shapes.devs.Model.extend({

    markup: '<g class="rotatable"><g class="scalable"><path class="body"/></g><text class="label"/><g class="inPorts"/><g class="outPorts"/></g>',
    portMarkup: '<g class="port port<%= id %>"><path class="port-body"/><text class="port-label"/></g>',

    defaults: joint.util.deepSupplement({

        type: 'devs.GenericModelPath',
        inPorts: [],
        outPorts: [],
        data: {
            type:"",
            locked:false,
            JSONData:{}
        },
        attrs: {
            '.body': { stroke: 'black', fill: 'black' },
            '.label': { 'ref-y': -30 },
            '.port-body': { stroke: 'gray', fill: 'lightgray', magnet: 'active' },
            '.inPorts .port-body': { transform: 'translate(-35)' },
            '.outPorts .port-body': { transform: 'translate(5)'},
            '.inPorts .port-label': { dx: -20 },
            '.outPorts .port-label': { dx: 20 }
        }

    }, joint.shapes.devs.Model.prototype.defaults)
});

joint.shapes.devs.GenericModelPath = joint.shapes.devs.ModelView;

/**********************************************************************
**********************************************************************
**********************************************************************
***********************************************************************/


// testing model
joint.shapes.devs.NewRect = joint.shapes.devs.Model.extend({

    // markup: '<g class="rotatable"><g class="scalable"><rect class="body"/></g><text class="label"/><g class="inPorts"/><g class="outPorts"/></g>',
    markup: '<g class="rotatable"><g class="scalable"><rect class="body"/></g><text/><g class="inPorts"/><g class="outPorts"/></g>',
    portMarkup: '<g class="port port<%= id %>"><rect class="port-body"/><text class="port-label"/></g>',

    defaults: joint.util.deepSupplement({

        type: 'devs.NewRect',
        inPorts: [],
        outPorts: [],
        data: {
            type:"",
            locked:false,
            JSONData:{}
        },
        attrs: {
            // '.body': { r: 50, cx: 50, stroke: 'blue', fill: 'lightblue' },
            // '.body': { fill: '#ECEE50', stroke: '#000', 'follow-scale': true, width: 80, height: 40, "rx":"20", "ry":"20" },
            'rect': { fill: '#ECEE50', stroke: 'white',"stroke-width":"2", 'follow-scale': true, width: 40, height: 30 },
            // '.label': { fill:'#000', 'ref-y': 0.5, 'y-alignment': 'middle' , text:"NewRect" },
            '.inPorts circle': { fill: '#16A085' , r:1 , magnet: 'passive', type: 'input'},
            '.outPorts circle': { fill: '#E74C3C' , r:1 , type: 'output'},
            '.port-body': { width: 10, height: 10, x: -5, stroke: 'gray', fill: 'lightgray', magnet: 'active', opacity: 0.1 },
            text:{fill: '#000', "font-family":"sans-serif" , 'font-size': 12, text:"NewRect", 'ref-y': 0.5, 'ref-x': 0.2, 'y-alignment': 'middle' ,}
        }

    }, joint.shapes.devs.Model.prototype.defaults)
});
joint.shapes.devs.NewRectView = joint.shapes.devs.ModelView;





/**********************************************************************
**********************************************************************
**********************************************************************
***********************************************************************/

// testing model
joint.shapes.devs.CircleModel = joint.shapes.devs.Model.extend({
    // markup: '<g class="rotatable"><g class="scalable"><circle class="body"/></g><text class="label"/><g class="inPorts"/><g class="outPorts"/></g>',
    markup: '<g class="rotatable"><g class="scalable"><circle class="body"/></g><text/><g class="inPorts"/><g class="outPorts"/></g>',
    portMarkup: '<g class="port port<%= id %>"><rect class="port-body"/><text class="port-label"/></g>',

    defaults: joint.util.deepSupplement({

        type: 'devs.CircleModel',
        inPorts: [],
        outPorts: [],
        data: {
            type:"",
            locked:false,
            JSONData:{}
        },
        attrs: {
            // '.body': { r: 50, cx: 50, stroke: '#000',"stroke-width":"4", fill: '#ECEE50' },
            'circle': { r: 50, cx: 50, stroke: '#000',"stroke-width":"2", fill: '#ECEE50' },
            // '.label': { text: 'Circle Model', 'ref-y': 0.5, 'y-alignment': 'middle' },
            '.inPorts circle': { fill: '#16A085' , r:2 , magnet: 'passive', type: 'input'},
            '.outPorts circle': { fill: '#E74C3C' , r:2, type: 'output' },
            '.port-body': { width: 10, height: 10, x: -5, stroke: 'gray', fill: 'lightgray', magnet: 'active' ,opacity: 0.1},
            text:{fill: '#000', "font-family":"sans-serif", 'font-size': 12, text: 'Circle Model', 'ref-y': -0.5, 'ref-x': 0.20, 'y-alignment': 'middle' }
        }

    }, joint.shapes.devs.Model.prototype.defaults)
});
joint.shapes.devs.CircleModelView = joint.shapes.devs.ModelView;









/**********************************************************************
**********************************************************************
**********************************************************************
***********************************************************************/

// tool box model.
joint.shapes.html = {};
joint.shapes.html.Element = joint.shapes.basic.Rect.extend({
    defaults: joint.util.deepSupplement({
        type: 'html.Element',
        inPorts: [],
        outPorts: [],
        attrs: {
            rect: { stroke: 'none', 'fill-opacity': 0 }
        }
    }, joint.shapes.basic.Rect.prototype.defaults)
});

// Create a custom view for that element that displays an HTML div above it.
// -------------------------------------------------------------------------

joint.shapes.html.ElementView = joint.dia.ElementView.extend({

    template: [
        '<div class="html-element">',
        '<div class="html-element-top">',
		'<input type="button" value="Save" class="btn btn-info zero-radius" onclick="SaveFile();" />',
		'<input type="button" value="Load" class="btn btn-info zero-radius" onclick="LoadFile();" />',
		'<input type="button" value="Test" class="btn btn-info zero-radius" onclick="Test();" />',
        '<input type="button" value="Clear" class="btn btn-info zero-radius" onclick="GraphClear();" />',
		'<a id="html-element-export-btn" type="file" class="btn btn-info" style="display: none;">Export</a>',
		'<input type="file" id="html-element-import-btn" name="file" class="btn btn-info" style="display: none;"/>',
        '<a id="html-element-builder-btn" href="index_.html" target="_blank" style="display: none;">Builder</a>',
		'<button type="button" value="Generate" class="btn btn-info zero-radius" onclick="Generation();" data-toggle="modal" data-target="#myModal"  >Generate</button>', '<br/>',
    	'</div>',
        '<button class="delete">X</button>','<hr/>',
        '<label></label>',
        '<input type="button" value="Property" class="btn halfWidth zero-radius" onclick="updateModelProperty();"/>',
        '<input  type="button" value="Design" class="btn halfWidth zero-radius" onclick="updateModelDesign();" />',
        '<span></span>', '<br/>',
        '<div class="html-element-design">',
        // '<select><option>--</option><option>one</option><option>two</option></select>',
        '<br/><p>ENGG4801 Project</p><br/><p><i>Automatic Web-based graphical editor generation</i></p><br/><p>Weijun Lai <br/> 10-01-2015</p><p><a href="doc/__Poster_42570521.pdf" target="_blank">poster.pdf </a></p>',
        // '<p><i>Automatic Web-based graphical editor generation</i></p>','<br/>',
        // '<p>Weijun Lai <br/> 2015</p>','<br/>',
        '</div>',
        // '<div id="paper-small" class="small-paper"></div>',
        '</div>'
    ].join(''),

    initialize: function() {
        _.bindAll(this, 'updateBox');
        joint.dia.ElementView.prototype.initialize.apply(this, arguments);

        this.$box = $(_.template(this.template)());
        // Prevent paper from handling pointerdown.
        this.$box.find('input,select').on('mousedown click', function(evt) { evt.stopPropagation(); });
        // This is an example of reacting on the input change and storing the input data in the cell model.
        this.$box.find('input').on('change', _.bind(function(evt) {
            this.model.set('input', $(evt.target).val());
        }, this));
        this.$box.find('select').on('change', _.bind(function(evt) {
            this.model.set('select', $(evt.target).val());
        }, this));
        this.$box.find('select').val(this.model.get('select'));
        this.$box.find('.delete').on('click', _.bind(this.model.remove, this.model));
        // Update the box position whenever the underlying model changes.
        this.model.on('change', this.updateBox, this);
        // Remove the box when the model gets removed from the graph.
        this.model.on('remove', this.removeBox, this);

        this.updateBox();
    },
    render: function() {
        joint.dia.ElementView.prototype.render.apply(this, arguments);
        this.paper.$el.prepend(this.$box);
        this.updateBox();
        return this;
    },
    updateBox: function() {
        // Set the position and dimension of the box so that it covers the JointJS element.
        var bbox = this.model.getBBox();
        this.$box.find('.delete').css({"visibility":this.model.get('visibility')});
        // this.$box.find('.html-element-design').html(this.model.get('htmlDesign'));
        // Example of updating the HTML with a data stored in the cell model.
        this.$box.find('label').html(this.model.get('label'));
        // this.$box.find('span').text(this.model.get('select'));
        this.$box.css({ width: bbox.width, height: bbox.height, left: bbox.x, top: bbox.y, transform: 'rotate(' + (this.model.get('angle') || 0) + 'deg)' });
    },
    removeBox: function(evt) {
        // this.$box.remove();

    }
});




var svgImage = {
    start:'M28.631,12.359c-0.268-0.826-1.036-1.382-1.903-1.382h-0.015l-7.15,0.056l-2.155-6.816c-0.262-0.831-1.035-1.397-1.906-1.397s-1.645,0.566-1.906,1.397l-2.157,6.816l-7.15-0.056H4.273c-0.868,0-1.636,0.556-1.904,1.382c-0.27,0.831,0.029,1.737,0.74,2.246l5.815,4.158l-2.26,6.783c-0.276,0.828,0.017,1.739,0.723,2.25c0.351,0.256,0.763,0.384,1.175,0.384c0.418,0,0.834-0.132,1.189-0.392l5.751-4.247l5.751,4.247c0.354,0.26,0.771,0.392,1.189,0.392c0.412,0,0.826-0.128,1.177-0.384c0.704-0.513,0.997-1.424,0.721-2.25l-2.263-6.783l5.815-4.158C28.603,14.097,28.901,13.19,28.631,12.359zM19.712,17.996l2.729,8.184l-6.94-5.125L8.56,26.18l2.729-8.184l-7.019-5.018l8.627,0.066L15.5,4.82l2.603,8.225l8.627-0.066L19.712,17.996z',
umbrella:'M14.784,26.991c0,1.238-1.329,1.696-1.835,1.696c-0.504,0-1.536-0.413-1.65-1.812c0-0.354-0.288-0.642-0.644-0.642c-0.354,0-0.641,0.287-0.641,0.642c0.045,1.056,0.756,3.052,2.935,3.052c2.432,0,3.166-1.882,3.166-3.144v-8.176l-1.328-0.024C14.787,18.584,14.784,25.889,14.784,26.991zM15.584,9.804c-6.807,0-11.084,4.859-11.587,8.326c0.636-0.913,1.694-1.51,2.89-1.51c1.197,0,2.22,0.582,2.855,1.495c0.638-0.904,1.69-1.495,2.88-1.495c1.2,0,2.26,0.6,2.896,1.517c0.635-0.917,1.83-1.517,3.03-1.517c1.19,0,2.241,0.591,2.879,1.495c0.636-0.913,1.659-1.495,2.855-1.495c1.197,0,2.254,0.597,2.89,1.51C26.669,14.663,22.393,9.804,15.584,9.804zM14.733,7.125v2.081h1.323V7.125c0-0.365-0.296-0.661-0.661-0.661C15.029,6.464,14.733,6.76,14.733,7.125z',
music:'M12.751,8.042v6.041v9.862c-0.677-0.45-1.636-0.736-2.708-0.736c-2.048,0-3.708,1.025-3.708,2.292c0,1.265,1.66,2.291,3.708,2.291s3.708-1.026,3.708-2.291V13.786l10.915-3.24v9.565c-0.678-0.45-1.635-0.736-2.708-0.736c-2.048,0-3.708,1.025-3.708,2.292c0,1.265,1.66,2.291,3.708,2.291s3.708-1.026,3.708-2.291V10.249V4.208L12.751,8.042z',
thunder:'M25.371,7.306c-0.092-3.924-3.301-7.077-7.248-7.079c-2.638,0.001-4.942,1.412-6.208,3.517c-0.595-0.327-1.28-0.517-2.01-0.517C7.626,3.229,5.772,5.033,5.689,7.293c-2.393,0.786-4.125,3.025-4.127,5.686c0,3.312,2.687,6,6,6v-0.002h5.271l-2.166,3.398l1.977-0.411L10,30.875l9.138-10.102L17,21l2.167-2.023h4.269c3.312,0,6-2.688,6-6C29.434,10.34,27.732,8.11,25.371,7.306zM23.436,16.979H7.561c-2.209-0.006-3.997-1.792-4.001-4.001c-0.002-1.982,1.45-3.618,3.35-3.931c0.265-0.043,0.502-0.191,0.657-0.414C7.722,8.41,7.779,8.136,7.73,7.87C7.702,7.722,7.685,7.582,7.685,7.446C7.689,6.221,8.68,5.23,9.905,5.228c0.647,0,1.217,0.278,1.633,0.731c0.233,0.257,0.587,0.375,0.927,0.309c0.342-0.066,0.626-0.307,0.748-0.63c0.749-1.992,2.662-3.412,4.911-3.41c2.899,0.004,5.244,2.35,5.251,5.249c0,0.161-0.009,0.326-0.027,0.497c-0.049,0.517,0.305,0.984,0.815,1.079c1.86,0.344,3.274,1.966,3.271,3.923C27.43,15.186,25.645,16.973,23.436,16.979z',
home:'M64 36.903l-32-24.839-32 24.839v-10.127l32-24.839 32 24.839zM56 36v24h-16v-16h-16v16h-16v-24l24-18z',
newspaper:"M56 16v-8h-56v44c0 2.209 1.791 4 4 4h54c3.314 0 6-2.686 6-6v-34h-8zM52 52h-48v-40h48v40zM8 20h40v4h-40zM32 28h16v4h-16zM32 36h16v4h-16zM32 44h12v4h-12zM8 28h20v20h-20z",
lock:'M112,177.75V144C112,64.594,176.594,0,256,0s144,64.594,144,144v33.75c-11.844,2.438-22.688,7.5-32,14.563V144c0-61.75-50.25-112-112-112S144,82.25,144,144v48.313C134.688,185.25,123.859,180.188,112,177.75z M416,192v64v96c0,88.375-71.625,160-160,160S96,440.375,96,352v-96v-64c35.344,0,64,28.656,64,64h192C352,220.656,380.656,192,416,192z M288,352c0-17.688-14.313-32-32-32s-32,14.313-32,32c0,11.719,6.625,21.531,16,27.094V432c0,8.844,7.156,16,16,16s16-7.156,16-16v-52.906C281.375,373.531,288,363.719,288,352z',
databaseIcon:'M0 796.888l0 -593.712q0 -97.65 130.851 -150.381t306.621 -52.731 306.621 52.731 130.851 150.381l0 593.712q0 97.65 -130.851 150.381t-306.621 52.731 -306.621 -52.731 -130.851 -150.381zm62.496 0q0 58.59 109.368 99.603t265.608 41.013 265.608 -41.013 109.368 -99.603l0 -117.18q-46.872 48.825 -150.381 75.191t-224.595 26.366 -224.595 -26.366 -150.381 -75.191l0 117.18zm0 -187.488q0 58.59 109.368 99.603t265.608 41.013 265.608 -41.013 109.368 -99.603l0 -117.18q-46.872 48.825 -150.381 75.191t-224.595 26.366 -224.595 -26.366 -150.381 -75.191l0 117.18zm0 -187.488q0 58.59 109.368 99.603t265.608 41.013 265.608 -41.013 109.368 -99.603l0 -107.415q-58.59 44.919 -160.146 68.355t-214.83 23.436 -214.83 -23.436 -160.146 -68.355l0 107.415zm0 -218.736q0 58.59 109.368 99.603t265.608 41.013 265.608 -41.013 109.368 -99.603 -109.368 -99.603 -265.608 -41.013 -265.608 41.013 -109.368 99.603zm624.96 609.336q0 -13.671 8.789 -22.46t22.46 -8.789 22.46 8.789 8.789 22.46 -8.789 22.46 -22.46 8.789 -22.46 -8.789 -8.789 -22.46zm0 -187.488q0 -13.671 8.789 -22.46t22.46 -8.789 22.46 8.789 8.789 22.46 -8.789 22.46 -22.46 8.789 -22.46 -8.789 -8.789 -22.46zm0 -187.488q0 -13.671 8.789 -22.46t22.46 -8.789 22.46 8.789 8.789 22.46 -8.789 22.46 -22.46 8.789 -22.46 -8.789 -8.789 -22.46z',
grid_two_up:'M0 0v3h3v-3h-3zm5 0v3h3v-3h-3zm-5 5v3h3v-3h-3zm5 0v3h3v-3h-3z',
basic_cloud:'M41,50h14c4.565,0,8-3.582,8-8s-3.435-8-8-8c0-11.046-9.52-20-20.934-20C23.966,14,14.8,20.732,13,30c0,0-0.831,0-1.667,0C5.626,30,1,34.477,1,40s4.293,10,10,10H41',
basic_compass:'M41,50h14c4.565,0,8-3.582,8-8s-3.435-8-8-8c0-11.046-9.52-20-20.934-20C23.966,14,14.8,20.732,13,30c0,0-0.831,0-1.667,0C5.626,30,1,34.477,1,40s4.293,10,10,10H41',
basic_gear:'M53.144,20.271L59.414,14L50,4.586l-6.27,6.27L39,9.279V0H25v9.279l-4.73,1.576L14,4.586L4.586,14l6.27,6.271L9.279,25H0v14h9.279l1.577,4.729L4.586,50L14,59.414l6.27-6.27L25,54.721V64h14v-9.279l4.73-1.576l6.27,6.27L59.414,50l-6.27-6.271L54.721,39H64V25h-9.279L53.144,20.271z M62,37h-8.721l-2.423,7.271L56.586,50L50,56.586l-5.73-5.73L37,53.279V62H27v-8.721l-7.27-2.424L14,56.586L7.414,50l5.73-5.729L10.721,37H2V27h8.721l2.423-7.271L7.414,14L14,7.414l5.73,5.73L27,10.721V2h10v8.721l7.27,2.424L50,7.414L56.586,14l-5.73,5.729L53.279,27H62V37z',
basic_mail_open_text:'M54,0H10v21.142L0,25.335V64h64V25.335l-10-4.193V0z M52,2v29.716L32,44.253L12,31.716V2H52z M10,30.462l-6.835-4.285L10,23.311V30.462z M2,62V27.807l30,18.807l30-18.807V62H2z M60.835,26.177L54,30.462v-7.151L60.835,26.177z',

basic_message_txt:'M17,61.174L32.37,48H64V4H0v44h17V61.174z M2,46V6h60v40H31.63L19,56.826V46H2z',

basic_pencil_ruler:'M0,64h64.414L0-0.414V64z M2,55h6v-2H2v-6h4v-2H2v-6h6v-2H2v-6h4v-2H2v-6h6v-2H2V4.414L59.586,62H2V55zM13,27.586V55h27.414L13,27.586z M15,32.414L35.586,53H15V32.414zM64.375,46.375l-2.472-9.886L25-0.414L17.586,7l36.903,36.903L64.375,46.375z M61.625,43.625l-6.114-1.528L26.414,13L31,8.414l29.097,29.097L61.625,43.625z M25,2.414L29.586,7L25,11.586L20.414,7L25,2.414z',
basic_picture_multiple:'M54,15H0v42h54V15z M52,17v34.826L39.104,40.771l-9.901,5.941L15.049,30.537L2,43.586V17H52z M2,55v-8.586l12.951-12.951l13.847,15.824l10.099-6.059L52,54.459V55H2zM40,35c3.309,0,6-2.691,6-6s-2.691-6-6-6s-6,2.691-6,6S36.691,35,40,35z M40,25c2.206,0,4,1.794,4,4s-1.794,4-4,4s-4-1.794-4-4S37.794,25,40,25z',

basic_question:'M32,0C23.452,0,15.417,3.329,9.373,9.374C3.328,15.418-0.001,23.453-0.001,32s3.329,16.582,9.374,22.626C15.417,60.671,23.452,64,32,64c8.547,0,16.583-3.329,22.627-9.374c6.045-6.044,9.374-14.079,9.374-22.626s-3.329-16.582-9.374-22.626C48.583,3.329,40.547,0,32,0z M53.213,53.212C47.547,58.879,40.013,62,32,62c-8.014,0-15.547-3.121-21.213-8.788C5.12,47.546,1.999,40.013,1.999,32s3.121-15.546,8.788-21.212C16.453,5.121,23.986,2,32,2c8.013,0,15.547,3.121,21.213,8.788C58.88,16.454,62.001,23.987,62.001,32S58.88,47.546,53.213,53.212zM32,15c-5.972,0-9,2.019-9,6h2c0-1.862,0.796-4,7-4c4.252,0,7,2.355,7,6c0,2.765-3.933,5.345-5.447,6.105C33.367,29.198,29,31.457,29,38v1h2v-1c0-5.259,3.312-7.036,3.447-7.105C34.715,30.761,41,27.565,41,23C41,18.29,37.299,15,32,15z',

basic_rss:'M8,0v2c16,0,31.173,7.065,41.472,19.386C57.567,31.065,62.051,43.358,62.051,56h2c0-13.11-4.649-25.858-13.044-35.897C40.326,7.327,25,0,8,0zM50.769,56h2C52.769,31.343,33,11.282,8,11.282v2C32,13.282,50.769,32.445,50.769,56zM8,22.564v2c17,0,31.486,14.102,31.486,31.436h2C41.486,37.563,26,22.564,8,22.564zM30.205,56C30.205,43.784,20,33.846,8,33.846v2c11,0,20.205,9.041,20.205,20.154H30.205zM16.103,56c0-4.439-3.612-8.051-8.052-8.051S0,51.561,0,56s3.611,8.051,8.051,8.051S16.103,60.439,16.103,56z M2,56c0-3.336,2.715-6.051,6.051-6.051c3.337,0,6.052,2.715,6.052,6.051s-2.715,6.051-6.052,6.051C4.715,62.051,2,59.336,2,56z',

basic_server_cloud:'M53.861,0H10.139l-6,40H4v24h56V40h-0.139L53.861,0z M11.861,2h40.277l5.7,38H6.161L11.861,2z M58,62H6V42h52V62zM48,56c2.206,0,4-1.794,4-4s-1.794-4-4-4s-4,1.794-4,4S45.794,56,48,56z M48,50c1.103,0,2,0.897,2,2s-0.897,2-2,2s-2-0.897-2-2S46.897,50,48,50zM39.942,20.114C39.475,16.572,36.217,14,32,14c-3.69,0-6.845,3.022-7.797,6.081C22.07,20.527,21,22.715,21,24c0,2.542,1.458,4,4,4h14c2.505,0,4-1.495,4-4C43,22.745,41.979,20.627,39.942,20.114z M39,26H25c-1.439,0-2-0.561-2-2c0-0.482,0.602-2,2-2h0.824l0.157-0.81C26.457,18.74,29.133,16,32,16c2.908,0,6,1.752,6,5v1h1c1.398,0,2,1.518,2,2C41,25.383,40.383,26,39,26z',

basic_database:'M33,0C19.583,0,6,2.748,6,8v48c0,5.252,13.583,8,27,8s27-2.748,27-8V8C60,2.748,46.417,0,33,0z M33,62c-15.489,0-25-3.495-25-6V43.225C12.254,46.37,22.672,48,33,48s20.746-1.63,25-4.775V56C58,58.505,48.489,62,33,62z M33,46c-15.489,0-25-3.495-25-6V27.225C12.254,30.37,22.672,32,33,32s20.746-1.63,25-4.775V40C58,42.505,48.489,46,33,46z M33,30c-15.489,0-25-3.495-25-6V11.225C12.254,14.37,22.672,16,33,16s20.746-1.63,25-4.775V24C58,26.505,48.489,30,33,30z M33,14C17.511,14,8,10.505,8,8s9.511-6,25-6s25,3.495,25,6S48.489,14,33,14z',

basic_sheet_txt :'M8,64h48V0H22.586L8,14.586V64z M54,62H10V16h14V2h30V62z M11.414,14L22,3.414V14H11.414z',

basic_video:'M47,19h-6.586l-8-8H6v2h25.586l6,6H0v34h47v-9.252l17,10V18.252l-17,10V19z M62,21.748v28.504l-17-10V51H2V21h43v10.748M6,47h20V35H6V47z M8,37h16v8H8V37z',


database_flag_icon:'M60,40h-0.139l-6-40H10.139l-6,40H4v24h56V40z M11.861,2h40.277l5.7,38H42v1c0,5.514-4.486,10-10,10s-10-4.486-10-10v-1H6.161L11.861,2z M58,62H6V42h14.042C20.551,48.15,25.72,53,32,53s11.449-4.85,11.958-11H58V62zM28,23h15.81l-3.145-5l3.145-5H28v-2h-2v23h2V23z M40.19,15l-1.887,3l1.887,3H28v-6H40.19z',

database_update_icon:'M60,40h-0.139l-6-40H10.139l-6,40H4v24h56V40z M11.861,2h40.277l5.7,38H42v1c0,5.514-4.486,10-10,10s-10-4.486-10-10v-1H6.161L11.861,2z M58,62H6V42h14.042C20.551,48.15,25.72,53,32,53s11.449-4.85,11.958-11H58V62zM32,34h2l-1.8,2.4l1.7,1.199l3.1-4V32.4l-3.1-4L32.25,29.6L34,32h-2c-3.942,0-7-4.301-7-8h-2C23,28.721,26.849,34,32,34zM33.8,18.4L32,16h2c3.942,0,7,4.301,7,8h2c0-4.721-3.849-10-9-10h-2l1.8-2.4L32.1,10.4l-3.1,4V15.6l3.1,4L33.8,18.4z',

database_select_icon:'M60,40h-0.139l-6-40H10.139l-6,40H4v24h56V40z M11.861,2h40.277l5.7,38H42v1c0,5.514-4.486,10-10,10s-10-4.486-10-10v-1H6.161L11.861,2z M58,62H6V42h14.042C20.551,48.15,25.72,53,32,53s11.449-4.85,11.958-11H58V62zM29,28c1.57,0,3.016-0.525,4.184-1.401l7.109,7.108l1.414-1.414l-7.109-7.108C35.474,24.016,36,22.569,36,21c0-3.859-3.14-7-7-7s-7,3.141-7,7S25.14,28,29,28z M29,16c2.757,0,5,2.243,5,5s-2.243,5-5,5s-5-2.243-5-5S26.243,16,29,16z',

database_insert_icon:'M60,40h-0.139l-6-40H10.139l-6,40H4v24h56V40z M11.861,2h40.277l5.7,38H42v1c0,5.514-4.486,10-10,10s-10-4.486-10-10v-1H6.161L11.861,2z M58,62H6V42h14.042C20.551,48.15,25.72,53,32,53s11.449-4.85,11.958-11H58V62z',

method_setting:'m256 0c-141.390999 0-256 114.609001-256 256s114.609001 256 256 256 256-114.609009 256-256 -114.609009-256-256-256zm0 472c-119.296997 0-216-96.703003-216-216s96.703003-216 216-216 216 96.703003 216 216 -96.703003 216-216 216zM357.497986 285l-26.093994-15.062012c0.828003-4.530975 1.390991-9.171997 1.390991-13.937988 0-4.781006-0.561981-9.438004-1.437988-13.968994l26.109009-15.078003c12.265991-7.109009 16.437988-22.75 9.375-34.953003 -7.078003-12.25-22.688019-16.453003-34.938019-9.406006l-26.359009 15.219009c-7.046997-6-15.077972-10.719009-23.952972-13.875v-30.344009c0-14.125-11.438019-25.593994-25.594009-25.593994 -14.141006 0-25.594009 11.468994-25.594009 25.593994v30.312012c-8.875 3.155991-16.905991 7.890991-23.968994 13.890991l-26.281006-15.171997c-12.25-7.078003-27.937988-2.891006-35 9.358994 -7.061996 12.234009-2.858994 27.891006 9.391006 34.953003l26.046997 15.046997c-0.843994 4.547012-1.405991 9.219009-1.405991 14.016006 0 4.765991 0.561996 9.406006 1.405991 13.953003l-26.061981 15.046997c-12.265991 7.062012-16.468994 22.75-9.375 35 7.031006 12.203003 22.703003 16.406006 34.969009 9.343994l26.280991-15.171997c7.031006 6 15.094009 10.765991 24 13.921997v30.312012c0 14.140991 11.453003 25.593994 25.594009 25.593994 14.156982 0 25.593994-11.453003 25.593994-25.593994v-30.343994c8.906006-3.156006 16.953003-7.891022 23.968994-13.906006l26.343994 15.187988c12.25 7.062012 27.891022 2.859009 34.938019-9.343994 7.092987-12.25 2.904968-27.906006-9.345032-35zm-127.093979-29c0-14.125 11.438004-25.593994 25.594009-25.593994 14.125 0 25.593994 11.468994 25.593994 25.593994s-11.468994 25.593994-25.593994 25.593994c-14.157013 0-25.594009-11.468994-25.594009-25.593994z'
}

