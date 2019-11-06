

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
        LoadEventsVisorTres(e.target.getAttribute('key'));
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
    /*
let contenedor = document.querySelector('#contenidoVariablesVisorDos');
contenedor.innerHTML = '';

var token = readCookie('token');

var url = 'http://localhost:3000/device/' + id; 

fetch(url, {  
    headers:{
      'Content-Type': 'application/json',
      'Authorization': token
    }
  }).then(res => res.json())
  .then(dat => {
        this.state.actualDevice = dat;
        this.state.actualEventKey = dat.events;

        this.state.actualDevice.view.forEach(element => {
            var div = document.createElement('div');
            div.innerText = element.name;
            div.setAttribute('class', 'variableItem');
            div.setAttribute('id', 'variableItemVisorDos');
            div.setAttribute('key', element.events);
            contenedor.appendChild(div);
            console.log(element);
        }); 
        
    
    
    })
  .catch(error => console.error('Error:', error));
*/



function LoadEventsVisorTres(eventName) {
console.log("estaria buscando ");
console.log(eventName);
console.log("en " + this.state.actualEventKey);

var token = readCookie('token');

var contenedor = document.querySelector('#contenidoVisorTres');
contenedor.innerHTML = "";

fetch('http://localhost:3000/event/', {
    method: 'POST',
    body: JSON.stringify({
        "i":9862124,
        "from":1569129164539,
        "to":1569129404670
    }),  
    headers:{
      'Content-Type': 'application/json',
      'Authorization': token
    }
  }).then(res => res.json())
  .then(dat => {
        this.state.actualEvents = dat;

   LoadEventsInVisorTres(dat, eventName, '°c');
    })
  .catch(error => console.error('Error:', error));

}


function LoadEventsInVisorTres(arrayDeEvents, eventKey, eventScale) {

    var contenedor = document.querySelector('#contenidoVisorTres');
    contenedor.innerHTML = "";

    var table = document.createElement('table');
        table.setAttribute('class', 'table table-striped');
    arrayDeEvents.forEach(function (evnt) {
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

