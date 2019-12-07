/** State of App */
this.state = {
    TimeFrom: Number,
    TimeTo: Number,
    devices: [],
    actualDevice: Object,
    actualEvents: [],
    actualEventKey: Number,
    actualStateListChart: Boolean,
    actualVariablesUnit: String,
    actualVariablesKey: String
}
this.state.actualStateListChart = true;
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
// show the device chose in visorDos
    case 'imgDeviceType':
            LoadDeviceInVisorDos(e.target);
    break;
// show the device chose in visorDos
    case 'titleDeviceType':
            LoadDeviceInVisorDos(e.target);
    break;

    // show event list of one chose variable 
    case 'variableItemVisorDos':
        LoadEventsVisorTres(e.target);
    break;

    case 'buttonChart':
        ChangeStateListChart(e.target);
        ChangeViewMode();
    break;
    
    case 'buttonList':
            ChangeStateListChart(e.target);
            ChangeViewMode();
    break;
    case 'buttonBack':
            ButtonBack();
    break;
        
    case 'buttonNext':
            ButtonNext();
    break;

    case 'LogOutButton':
            LogOut();
    break;
    case 'settingsButton':
            SettingsButton(e);       
        break;
}

});

function LogOut(params) {
    ClearVariables();
    LoadLoginScreen();
}

/**
 * ths function load the first time parameters to search events
 */
function LoadFirstTimeParameters(params) {
    let currentDate = new Date();
    let to = Number(currentDate);
    let from = to - (86400*1000);

    this.state.TimeFrom = from;
    this.state.TimeTo = to;
    console.log(from + " " + to);
}
LoadFirstTimeParameters();

function ButtonBack()
{
    let from = this.state.TimeFrom;
    let to = this.state.TimeTo;
    
    let nFrom = from - (86400*1000);
    let nTo = to - (86400*1000);
    
    this.state.TimeFrom = nFrom;
    this.state.TimeTo = nTo;
    console.log(this.state.TimeFrom + " " + this.state.TimeTo);
    // load the actual event list
    LoadEvents(this.state.actualDevice.events);
    
}

function ButtonNext()
{
    let from = this.state.TimeFrom;
    let to = this.state.TimeTo;
    
    let nFrom = from + (86400*1000);
    let nTo = to + (86400*1000);
    
    this.state.TimeFrom = nFrom;
    this.state.TimeTo = nTo;
    console.log(this.state.TimeFrom + " " + this.state.TimeTo);
    // load the actual event list
    LoadEvents(this.state.actualDevice.events);
    ChangeViewMode();
}


/**
 * This function would load the user device lsit in the visorUno
 */
function LoadDevicesInVisorUno()
{
    LoadScreen01();
    APIarrayDevices().then(response => {
        this.state.devices = response;    
        ShowDevicesVisorUno();
    });
        
}

/**
 * 
 * this function change the status of the chart or list view
 */
function ChangeStateListChart(target) {
    if (target.id == 'buttonChart'){
        this.state.actualStateListChart = true;
    } else if (target.id == 'buttonList') {
        this.state.actualStateListChart = false;
    }
}

/**
 * this function change the view mode of the variables visor tres
 */
function ChangeViewMode()
{
    LoadEventsInVisorTres(this.status.actualVariablesKey, this.status.actualVariablesUnit);
}

/**
 * this function get the devices array in te state and add the ADD device aacion
 * then show these elements in the VisorUno
 */
function ShowDevicesVisorUno()
{
var contenidoVisorUno = document.querySelector('#contenidoVisorUno');
    contenidoVisorUno.innerHTML = "";
var table = document.createElement('ul');

var objPlus = {type: 0}
var arrObjDevices = this.state.devices.concat(objPlus);

arrObjDevices.forEach(element => {

    var li = document.createElement('li');
    var div = document.createElement('div');
    let img = document.createElement('img');
    var title = document.createElement('center');
    img.setAttribute('id', 'imgDeviceType');
    title.setAttribute('id', 'titleDeviceType');
    // check if the element is ADD or normal types
    if (!element._id){
        // ADD element
       
        title.innerText = "ADD";
        img.setAttribute('src', '/images/plus.png');
    } else {
        // normal element 
        div.setAttribute('key', element._id);
        img.setAttribute('key', element._id);
        title.setAttribute('key', element._id);
        APIlastEvent(element.events).then(dat => {
            if(dat){
                title.innerText = dat.v['Nombre'];
                switch (dat.v['Dispositivo'])
                {
                    case 3: img.setAttribute('src', '/images/power.png');
                    break;
                    case 2: img.setAttribute('src', '/images/tempandhummidity.png');
                    break;
                    case 1: img.setAttribute('src', '/images/termotanque.png');
                    break;
                    default: img.setAttribute('src', '/images/error.png');

                } 
                
            } else {
                img.setAttribute('src', '/images/information2.png');
                title.innerText = 'Never Report';
            }
        });
    }   
    div.appendChild(title);
    div.appendChild(img);
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

    LoadScreen02(); 

    var ObjectId = target.getAttribute('key');

    // cheq if is a device o ADD device accion
    if (ObjectId) {
        // device
        LoadDeviceinVisorDos(ObjectId);
    } else {
        // add
        ShowAddDeviceScreen();
        
    }

}


/**
 * thisfunction load the device selected in the visorDos
 */
function LoadDeviceinVisorDos(id) {

    // limpiamos el visor dos
    let contenedor = document.querySelector('#visorDos');
    contenedor.innerHTML = "";

    // Load the actual selected Object
    this.state.actualDevice = this.state.devices.find(element => element._id == id);
    
    // load the actual event list
    LoadEvents(this.state.actualDevice.events);

    // load the view variables in visorDos
    LoadVariablesItemVisorDos();


    // generate new buttons
    let btn = document.createElement('a');
    let divBtn = document.createElement('div');
    //btn.innerText = 'DELETE';
    btn.setAttribute('class', 'btn btn-danger btn-circle btn-lg');
    divBtn.setAttribute('id', 'btnDeleteVisorDos');
    divBtn.appendChild(btn);
    let i = document.createElement('i');
    i.setAttribute('class', 'fas fa-trash');
    btn.appendChild(i);

    contenedor.appendChild(divBtn);
    let objectId = this.state.actualDevice._id;
    btn.addEventListener('click', function (params) {
        if (confirm('Esta seguro de eliminar el dispositivo?')){
            APIdeleteDevice(objectId).then(dat => {
                console.log(dat);
                LoadDevicesInVisorUno();
            })
            .catch(err => console.log(err));
        }
        
    });
}

/**
 * this function get the events array using the actual AppState time
 * @param {} i 
 */
function LoadEvents(i) {
    console.log("loadEvents");
    console.log(i);
    APIarrayEvents(Number(i), this.state.TimeFrom, this.state.TimeTo).then(response => {
        console.log(response);
        this.state.actualEvents = response;
        ChangeViewMode();
    });
}
    

 function LoadVariablesItemVisorDos() {
     let contenedor = document.querySelector('#visorDos');
     let contenedorVariables = document.createElement('div');
     contenedorVariables.innerHTML = "";
     contenedorVariables.setAttribute('id', 'contenidoVariablesVisorDos');
    this.state.actualDevice.view.forEach(function (params) {
        
        var div = document.createElement('div');
        div.setAttribute('class', 'ItemVariableVisorTres');
        let circulo = document.createElement('a');
         circulo.setAttribute('class', 'btn btn-info btn-circle');
        div.appendChild(circulo);
        var title = document.createElement('center');
        title.innerText = params.name;
        title.setAttribute('id', 'variableItemVisorDos');
        title.setAttribute('key', params.events);
        title.setAttribute('unit', params.unit);
        div.appendChild(title);
        contenedorVariables.appendChild(div);
    });
    contenedor.appendChild(contenedorVariables); 
 }

function LoadEventsVisorTres(target) {
    LoadScreen03();
    
   LoadEventsInVisorTres(target.getAttribute('key'), target.getAttribute('unit'));
   this.state.actualVariablesKey = target.getAttribute('key');
   this.state.actualVariablesUnit = target.getAttribute('unit');
}



function LoadEventsInVisorTres(eventKey, eventScale) {
    
    if (eventKey == null || eventScale == null)
    {
        eventKey = this.state.actualVariablesKey;
        eventScale = this.status.actualVariablesUnit;
        console.log(eventKey + " * " + eventScale);
    }

    document.querySelector('#visorTres').innerHTML = "";

    let contenedorTools = document.createElement('div');
        contenedorTools.setAttribute('id', 'contenidorToolsVisorTres');

    let buttonChart = document.createElement('button');
    let buttonList = document.createElement('button');
    let buttonBack = document.createElement('button');
    let buttonNext = document.createElement('button');
    let dateString = document.createElement('div');

    dateString.setAttribute('id', 'dateString');
    buttonNext.setAttribute('class', 'btn btn-outline-info');
    buttonBack.setAttribute('class', 'btn btn-outline-info'); 
    buttonChart.setAttribute('class', 'btn btn-primary');
    buttonList.setAttribute('class', 'btn btn-primary');
    buttonBack.setAttribute('id', 'buttonBack');
    buttonNext.setAttribute('id', 'buttonNext'); // TODO add id listener
    buttonChart.setAttribute('id', 'buttonChart');
    buttonList.setAttribute('id', 'buttonList');

    

    dateString.innerText = timeConverter(this.state.TimeFrom) + " - " + timeConverter(this.state.TimeTo);
    buttonNext.innerText = "Next";
    buttonBack.innerText = "Back";
    buttonChart.innerText = "Charts";
    buttonList.innerText = "List";

    contenedorTools.appendChild(buttonBack);
    contenedorTools.appendChild(buttonNext);
    contenedorTools.appendChild(buttonList);
    contenedorTools.appendChild(buttonChart);
    contenedorTools.appendChild(dateString);
    
        
        if (this.state.actualStateListChart == false){
            var contenedorVariables = document.createElement('div');
        contenedorVariables.setAttribute('id', 'contenidoVisorTres');
        contenedorVariables.appendChild(CreateVariablesTable(eventKey, eventScale));
        console.log("*" + eventKey + " * " + eventScale);
        contenedorTools.appendChild(contenedorVariables);
        } else {
            let divCanvas = document.createElement('div');
                divCanvas.setAttribute('id', 'divCanvas');
            let canvas = document.createElement('canvas');
                canvas.setAttribute('id', 'canvasVisorTres');
                canvas.setAttribute('class', 'chartjs-render-monitor');
                
            divCanvas.appendChild(canvas);
            contenedorTools.appendChild(divCanvas);
            console.log("*" + eventKey + " * " + eventScale);
            CreateVariablesChart(canvas, eventKey, eventScale);
        }
    
    document.querySelector('#visorTres').appendChild(contenedorTools);
}


function CreateVariablesChart(objectHtml, eventKey, eventScale) {

    let lavelsArray = [];
    let valuesArray = [];

    this.state.actualEvents.forEach(function (evnt) {
        if (evnt.v[eventKey] != -1 && evnt.v[eventKey] != -130 && evnt.v[eventKey] != 0){
        lavelsArray.push(timeConverterShort(evnt.t));
        valuesArray.push(evnt.v[eventKey]);
        }
    });

    CreateLinealChart(objectHtml, lavelsArray, valuesArray, eventScale);
}

function CreateVariablesTable(eventKey, eventScale) {
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
return table;
}

function ShowAddDeviceScreen()
{
    document.querySelector('#visorDos').innerHTML = "";

    let div = document.createElement('div');
    let center = document.createElement('center');
    let br = document.createElement('br');
    let form = document.createElement('form');
    let input = document.createElement('input');
    let input2 = document.createElement('input');
    let select = document.createElement('select');
    let option1 = document.createElement('option');
    let option2 = document.createElement('option');
    let option3 = document.createElement('option');
    let button1 = document.createElement('button');
    let button2 = document.createElement('button');

    div.setAttribute('id', 'contenedorNewDevice');
    center.innerText = 'ADD NEW DEVICE';
    div.appendChild(center);
    div.appendChild(br);
    
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Device ID');
    input.setAttribute('id', 'inputNewDeviceID');
    form.appendChild(input);
    form.appendChild(document.createElement('br'));
    input2.setAttribute('type', 'text');
    input2.setAttribute('placeholder', 'Device Password');
    input2.setAttribute('id', 'inputNewDevicePass');
    form.appendChild(input2);

    option1.setAttribute('key', '1');
    option1.innerText = 'Termotanque Solar';
    select.appendChild(option1);
    option2.setAttribute('key', '2');
    option2.innerText = 'Temperatura & Humedad';
    select.appendChild(option2);
    option3.setAttribute('key', '3');
    option3.innerText = 'Power Meeter';
    select.appendChild(option3);
    form.appendChild(document.createElement('br'));
    form.appendChild(select);

    button1.setAttribute('type', 'button');
    button1.setAttribute('id', 'btnNewDeviceAceptar');
    button1.innerText = 'ACEPTAR';
    button2.setAttribute('type', 'button');
    button2.setAttribute('id', 'btnNewDeviceCancelar');
    button2.innerText = 'CANCELAR';

    form.appendChild(document.createElement('br'));
    form.appendChild(document.createElement('br'));

    form.appendChild(button1);
    form.appendChild(button2);

    div.appendChild(form);

    document.querySelector('#visorDos').appendChild(div);

    div.addEventListener('click', function (e) {
        switch (e.target.id)
        {
            case 'btnNewDeviceAceptar':
                CreateNewDevice();
            break;

            case 'btnNewDeviceCancelar':
            break;

        }
    });

   function CreateNewDevice()
   {
       let events = Number(input.value);
       let password = input2.value;
       let dispositivo = select.selectedIndex + 1;
    
    APIcreateNewDeice(events, password, dispositivo).then(LoadDevicesInVisorUno());
   }

}

