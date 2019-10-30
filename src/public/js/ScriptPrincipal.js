this.state = {
    devices: []
}

document.addEventListener('click', function (e) {

// listen for the clicks
switch (e.target.id)
{
    case 'showDevices':
            LoadDevicesInVisorUno();
    break;
}
});


function LoadDevicesInVisorUno()
{
    LoadDevices();
    ShowDevicesVisorUno();
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
        })
      .catch(error => console.error('Error:', error));

}

function ShowDevicesVisorUno()
{

    this.state.devices.forEach(function(element) {
        console.log(element);
        var h = document.createElement('h1');
        h.innerText = "hola";
        document.querySelector('#visorUno').appendChild(h);
      });
}