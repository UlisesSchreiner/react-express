

/** State of App */
this.state = {
    TimeFrom: Number,
    TimeTo: Number,
    devices: [],
    actualDevice: Object,
    actualEvents: [],
    actualEventKey: Number
}

/*
  Click Event Listener 
*/
document.addEventListener('click', function (e) {

// Listener for the IDs
switch (e.target.id)
{   
    // show the devices list in visorUno
    case 'showDevices':
            LoadDevicesInVisorUno();
    break;

    // show the device chose in visorDos
    case 'divCardDevice':
            LoadDeviceInVisorDos(e.target);
    break;

    // show event list of one chose variable 
    case 'variableItemVisorDos':
        LoadEventsVisorTres(e.target);
    break;
}

});

/**
 * ths function load the first time parameters to search events
 */
function LoadFirstTimeParameters(params) {
    let currentDate = new Date();
    let to = Number(currentDate);
    let from = to - (86400*1000);

    this.state.TimeFrom = from;
    this.state.TimeTo = to;

}
LoadFirstTimeParameters();

/**
 * This function would load the user device lsit in the visorUno
 */
function LoadDevicesInVisorUno()
{
    APIarrayDevices().then(response => {
        this.state.devices = response;
        ShowDevicesVisorUno();
    });
        
}

/**
 * this function get the devices array in te state and add the ADD device aacion
 * then show these elements in the VisorUno
 */
function ShowDevicesVisorUno()
{
var contenidoVisorUno = document.querySelector('#contenidoVisorUno');
var table = document.createElement('ul');

var objPlus = {type: 0}
var arrObjDevices = this.state.devices.concat(objPlus);

arrObjDevices.forEach(element => {

    var li = document.createElement('li');
    var div = document.createElement('div');
    
    // check if the element is ADD or normal types
    if (!element._id){
        // ADD element
        var title = document.createElement('center');
        title.innerText = "ADD";
        div.appendChild(title);
    } else {
        // normal element 
        div.setAttribute('key', element._id);
    }   
    
    li.setAttribute('id', 'liCardDevices');
    div.setAttribute('id', 'divCardDevice');
    

    li.appendChild(div);
    table.appendChild(li);
});

contenidoVisorUno.appendChild(table);

}

/**
 * this function is called when the user click in one device o ADD device action
 * @param {} target 
 */
function LoadDeviceInVisorDos(target) {

    var ObjectId = target.getAttribute('key');

    // cheq if is a device o ADD device accion
    if (ObjectId) {
        // device
        LoadDeviceinVisorDos(ObjectId);
    } else {
        // add
        
    }

}


/**
 * thisfunction load the device selected in the visorDos
 */
function LoadDeviceinVisorDos(id) {

    // Load the actual selected Object
    this.state.actualDevice = this.state.devices.find(element => element._id == id);

    // load the actual event list
    LoadEvents(this.state.actualDevice.i);

    // load the view variables in visorDos
    LoadVariablesItemVisorDos();
}

/**
 * this function get the events array using the actual AppState time
 * @param {} i 
 */
function LoadEvents(i) {
APIarrayEvents(i, this.state.TimeFrom, this.state.TimeTo).then(response => {
    console.log(response);
    this.state.actualEvents = response;
});
}
    

 function LoadVariablesItemVisorDos() {
    let contenedorVariables = document.querySelector('#contenidoVariablesVisorDos');
    contenedorVariables.innerHTML = "";
    this.state.actualDevice.view.forEach(function (params) {
        
        var div = document.createElement('div');
        div.setAttribute('class', 'ItemVariableVisorTres');
        var h3 = document.createElement('h3');
        h3.innerText = params.name;
        h3.setAttribute('id', 'variableItemVisorDos');
        h3.setAttribute('key', params.events);
        h3.setAttribute('unit', params.unit);
        div.appendChild(h3);
        contenedorVariables.appendChild(div);
    }); 
 }

function LoadEventsVisorTres(target) {
   console.log(target.getAttribute('key'));

   LoadEventsInVisorTres(target.getAttribute('key'), target.getAttribute('unit'));

   console.log("evemts");
   console.log(this.state.actualEvents);
   
   APIarrayEvents(9862124, 1573093574220, 1573094054523).then(response => { /////////// TODO chequiar por que no coinside time stump de evento en db y time de web. 
    console.log(response);
    this.state.actualEvents = response;
});
}


function LoadEventsInVisorTres(eventKey, eventScale) {

    var contenedor = document.querySelector('#contenidoVisorTres');
    contenedor.innerHTML = "";

    var table = document.createElement('table');
        table.setAttribute('class', 'table table-striped');
    this.state.actualEvents.forEach(function (evnt) {
        var row = table.insertRow(0);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerText = timeConverter(evnt.t);
        cell2.innerText = evnt.v[eventKey];
        cell3.innerText = eventScale;
    });

    contenedor.appendChild(table);
}

