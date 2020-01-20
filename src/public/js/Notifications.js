this.stateAlerts = {

    ArrAllAlerts: [],
    ArrAlertsNoViewed: [],
    ArrIdsNoViewed: []
}

/*
  Click Event Listener 
*/
document.addEventListener('click', function (e) {
    // Listener for the IDs
    
    switch (e.target.id)
    {   
        // show the devices list in visorUno
        case 'numberNoViewedAlerts':
                ClickAlertBell(e);
        break;

    }
});

function ClickAlertBell(e) {
    e.preventDefault();
    if (document.querySelector('#bellOfAlerts') != null){
    document.querySelector('#bellOfAlerts').innerText = "";
    }
    this.stateAlerts.ArrAlertsNoViewed.forEach(element => {
        this.stateAlerts.ArrIdsNoViewed.push(element._id);
    });
    console.log("se genero el array");
    if (this.stateAlerts.ArrIdsNoViewed.length > 0){
        console.log("array con 1 o mas items");
    APIupdateAlertTags(this.stateAlerts.ArrIdsNoViewed);
    } else {
        console.log("array con 0 items");
    }
    // TODO 
}

function CreateAlertTagDesconnection(fecha, texto, viewed) {
   var container = document.querySelector('#alertContainer');
    
   var a = document.createElement('a');
   var div = document.createElement('div');
   var div2 = document.createElement('div');
   var i = document.createElement('i');
   var div3 = document.createElement('div'); 
   var div4 = document.createElement('div');
   var span = document.createElement('span');

   a.setAttribute('class', 'dropdown-item d-flex align-items-center');
   a.setAttribute('href', '#');
   div.setAttribute('class', 'mr-3');
   div2.setAttribute('class', 'btn btn-secondary btn-circle');
   i.setAttribute('class', 'fas fa-link text-white');
   div4.setAttribute('class', 'small text-gray-500');
   span.setAttribute('class', 'font-weight-bold');

   div4.innerText = fecha;

   
   div2.appendChild(i);
   div.appendChild(div2);
   div3.appendChild(div4);


   if (viewed == true){
    div3.innerText = texto;
    } else {
     span.innerText = texto;
     div3.appendChild(span);   
    }

   a.appendChild(div);
   a.appendChild(div3);
    return a;
}

function CreateAlertTagSeverity(fecha, texto, viewed) {
    var container = document.querySelector('#alertContainer');
     
    var a = document.createElement('a');
    var div = document.createElement('div');
    var div2 = document.createElement('div');
    var i = document.createElement('i');
    var div3 = document.createElement('div'); 
    var div4 = document.createElement('div');
    var span = document.createElement('span');
 
    a.setAttribute('class', 'dropdown-item d-flex align-items-center');
    a.setAttribute('href', '#');
    div.setAttribute('class', 'mr-3');
    div2.setAttribute('class', 'icon-circle bg-warning');
    i.setAttribute('class', 'fas fa-exclamation-triangle text-white');
    div4.setAttribute('class', 'small text-gray-500');
    span.setAttribute('class', 'font-weight-bold');
 
    div4.innerText = fecha;
 
    
    div2.appendChild(i);
    div.appendChild(div2);
    div3.appendChild(div4);
 
 
    if (viewed == true){
     div3.innerText = texto;
     } else {
      span.innerText = texto;
      div3.appendChild(span);   
     }
 
    a.appendChild(div);
    a.appendChild(div3);
     return a;
 }
 


function GenerateAlertsList() {
    this.stateAlerts.ArrAllAlerts.forEach(element => {
        if (element.viewed == false){
            this.stateAlerts.ArrAlertsNoViewed.push(element);
        }

        var date = timeConverter(element.time);


        if (element.alertType == 1){ // severity

            var severityString;
            switch (element.DeviceSeverity)
            {
                case 0:
                    severityString = "normal";
                    break;
                case 1:
                    severityString = "menor";
                    break;
                case 2:
                    severityString = "advertencia";
                    break;
                case 3:
                    severityString = "alarmada";
                    break;
                case 4:
                    severityString = "critica";
                    break; 
            }

            var msj = "Alerta Dispositivo " + element.deviceName + " con una severidad  " + severityString;
            element.vars.forEach(varSer => {
                console.log(varSer);
                var msj2 = "\n" + varSer.name + " " + varSer.value + " " + varSer.unit;
                 msj = msj + msj2;
            });
            document.querySelector('#alertContainer').appendChild(CreateAlertTagSeverity(date, msj, element.viewed)); 
        } else if (element.alertType == 2){ // desconnection
            var msj = "Desconexion Dispositivo " + element.deviceName;
            document.querySelector('#alertContainer').appendChild(CreateAlertTagDesconnection(date, msj, element.viewed));
        }


    });
    var a = document.createElement('a');
        a.setAttribute('class', 'dropdown-item text-center small text-gray-500');
        a.setAttribute('href', '#');
        a.innerText = "Show All Alerts";
        document.querySelector('#alertContainer').appendChild(a);
        if (this.stateAlerts.ArrAlertsNoViewed.length > 0 && this.stateAlerts.ArrAlertsNoViewed.length != null) {
        var span = document.createElement('span');
            span.setAttribute('class', 'badge badge-danger badge-counter');
            span.innerText = this.stateAlerts.ArrAlertsNoViewed.length;
            span.setAttribute('id', 'bellOfAlerts');
            
        document.querySelector('#numberNoViewedAlerts').appendChild(span);
            }
}


function LoadAlertArr() {
    
    APIarrayAlerts().then(response => {
        this.stateAlerts.ArrAllAlerts = response;
        GenerateAlertsList();    
    });


}