


this.state = {
    devices: [],
    actualDevice: Object,
    actualEvents: [],
    actualEventKey: Number
}

document.addEventListener('click', function (e) {

// listen for the clicks
switch (e.target.id)
{
    case 'showDevices':
            LoadDevicesInVisorUno();
    break;

    case 'cardDevice':
            LoadDeviceInVisorDos(e.target.getAttribute('key'));
    break;

    case 'variableItemVisorDos':
        LoadEventsVisorTres(e.target.getAttribute('key'));
    break;
}

});


function LoadDevicesInVisorUno()
{
    LoadDevices();
   
}

function LoadDevices() {

    var token = readCookie('token');


    fetch('http://localhost:3000/device', {  
        headers:{
          'Content-Type': 'application/json',
          'Authorization': token
        }
      }).then(res => res.json())
      .then(dat => {
            this.state.devices = dat;
            console.log(this.state.devices);  
            ShowDevicesVisorUno();
        })
      .catch(error => console.error('Error:', error));

}

function ShowDevicesVisorUno()
{
    var table = document.querySelector('#tableVisorUno');   
    var array_length = this.state.devices.length;

    var row = table.insertRow(0);

    let cont = 0;
    this.state.devices.forEach(element => {
        let div = document.createElement('div');
        div.setAttribute('class', 'TDcardDevice');
        div.innerText = 'hola';
        div.setAttribute('key', element._id);
        div.setAttribute('id','cardDevice');
        var cell1 = row.insertCell(0);
        cell1.appendChild(div);
       
        cont++;
    });



}

function LoadDeviceInVisorDos(id) {

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

}


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

        /*
        this.state.actualEvents.forEach(element => {
            console.log(element);
            var div = document.createElement('div');
            div.innerText = element.v[eventName];
            div.setAttribute('class', 'itemValueVisorTres');
            div.setAttribute('id', 'idItemVisorTres');
            div.setAttribute('key', eventName);
            contenedor.appendChild(div);
        }); 
        
    
    */
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

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month +  ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }
