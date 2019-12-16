this.state2 = {
    dashArray: [],
    LastEventsOfDevices: [],
    AllDevicesArray: [],
    ConnectedEventsesArr: []
}

function InitDashboard() {
    ClearVariables();
    LoadScreenDashboard01();
    DashLoadLastEvents();
    //LoadDashArray();
}

function ClearVariables() {
    dashArray = []
    LastEventsOfDevices = []
    AllDevicesArray = []
    ConnectedEventsesArr = []
}

function LoadDashArray() {
    var conectividad = {
        dashType: 1,
        chartType: 1,
        name: 'Conectividad Dispositivos'
    }
    var alarmados = {
        dashType: 2,
        chartType: 1,
        name: 'Alarmas Dispositivos'
    }

    // TODO add la consulta a API de los dashboards

    this.state2.dashArray.push(conectividad);
    this.state2.dashArray.push(alarmados);
    console.log(this.state2.dashArray);
    
    document.querySelector('#ulDashboard').appendChild(GenerateConnectividadCard());
    document.querySelector('#ulDashboard').appendChild(GenerateSeverityCard());
    document.querySelector('#ulDashboard').appendChild(GenerateSeveritysListCard());
}


//await DashConnectividad().then(console.log(this.state.LastEventsOfDevices));
var cont = 0;
/**
 * 
 * This function load the array with the lasters events.
 */
 function DashLoadLastEvents() {
    this.state2.LastEventsOfDevices = [];
    APIarrayDevices().then(ArrDevices => {
        this.state2.AllDevicesArray = ArrDevices;
        var x = ArrDevices.length;
        ArrDevices.forEach((element) => {
            APIlastEvent(element.events).then(lasrEvent => {
                if (lasrEvent != null){
                this.state2.LastEventsOfDevices.push(lasrEvent);
                } else {
                    var e = {id:"",connectividad: false,i: 0,t: 0,v:""}
                    this.state2.LastEventsOfDevices.push(e);
                }
                cont ++;
               if (cont >= x){
                   DashConnectividadCheck();
                   DashCheckSeverity();
            }
               
            });
        });
        
    });
}

function DashConnectividadCheck() {
    var timeNow = new Date();
    var fiveMinitAgo = timeNow - 400000;
    

    this.state2.LastEventsOfDevices.forEach(elemento => {
        if (elemento.t <= fiveMinitAgo){
            elemento.connectividad = false;
        } else if (elemento.t > fiveMinitAgo) {
            elemento.connectividad = true;
            this.state2.ConnectedEventsesArr.push(elemento);
        }
    });
    console.log(this.state2.LastEventsOfDevices);
   
}

function DashCheckSeverity() {
    this.state2.ConnectedEventsesArr.forEach(event => {
        var device = this.state2.AllDevicesArray.find(element => element.events == event.i);
        var DeviceSeverity = 0;

        console.log("event");
        console.log(event);
        console.log("device");
        console.log(device);
        
        device.view.forEach(variable => {
            var value = Number(event.v[variable.events]);
            console.log("severidad calculada ");
            var s = CalculateSeverity(variable.umbrales, value);
            variable.severity = s;
            if (s > DeviceSeverity){DeviceSeverity = s}           
        });

        device.severity = DeviceSeverity;
    });
    LoadDashArray();
}



function CalculateSeverity(variable, value) {
    var severity = 10;
    var decidido = false;
    variable.forEach(umbral => {
        var severityUmbral = umbral.severity;
        var argUmbral = umbral.args; 
        switch (umbral.type)
        {
            case '<':
                if (value < argUmbral){ decidido = true; severity = severityUmbral; }else{severity = 0;}
                break;

            case '<=':
                    if (value <= argUmbral){decidido = true; severity = severityUmbral; }else{severity = 0;}
                break;
            case '>':
                    if (value > argUmbral){decidido = true; severity = severityUmbral; }else{severity = 0;}
                break;
            case '>=':    
                    if (value >= argUmbral){decidido = true; severity = severityUmbral; }else{severity = 0;}
               break;
            case '==':
                    if (value == argUmbral){decidido = true; severity = severityUmbral;}else{severity = 0;}
                break;
        }
    
    });
    if (decidido == true ){
        return severity;
    } else {return 0}
}


function GenerateConnectividadCard() {
    var arrLavels = ["desconectados", "conectados"];
    var arrValues = [];
    var arrColor = ["#a3a8bd", "#99e8bf"];
    var Desconectados = 0;
    var Conectados = 0;

    this.state2.LastEventsOfDevices.forEach(element => {
        
        if (element.connectividad == true){
            Conectados ++;
        } else if (element.connectividad == false) {
            Desconectados ++;
        }
    });
    arrValues.push(Desconectados);
    arrValues.push(Conectados);

    var div = document.createElement('div');
        div.setAttribute('id', 'divCardDashboard');
    var li = document.createElement('li');
        li.setAttribute('id', 'liCardDashboard');
        li.setAttribute('class', 'card shadow');
    var canvas = document.createElement('canvas');
        
        
        CreateGenericChart("pie", canvas, arrLavels, arrValues, arrColor, "Connectividad", "Connectividad Dispositivos");
        div.appendChild(canvas);
        li.appendChild(div);
        return li;
}

function GenerateSeverityCard() {
    var ConnectedAndSeverityArr = [];
    this.state2.AllDevicesArray.forEach(device => {
        if (device.severity != null){ConnectedAndSeverityArr.push(device);}
    });
    
    var arrLavels = ["normal", "advertencia", "menor", "alarmado", "urgente"];
    var arrValues = [];
    var arrColor = ["#99e8bf", "#93d2ee", "#e5ee93", "#eec093",  "#f26157"];  
    var normal = 0;
    var advertencia = 0;
    var menor = 0;
    var alarmado = 0;
    var urgente = 0;

    ConnectedAndSeverityArr.forEach(device => {
        switch (device.severity)
        {
            case 0:
                normal ++;
                break;
            case 1:
                advertencia ++;
                break;
            case 2:
                menor ++;
                break;
            case 3:
                alarmado ++;
                break;
            case 4:
                urgente ++;
                break; 
        }
    });
    
    arrValues.push(normal);
    arrValues.push(advertencia);
    arrValues.push(menor);
    arrValues.push(alarmado);
    arrValues.push(urgente);

    var div = document.createElement('div');
        div.setAttribute('id', 'divCardDashboard');
    var li = document.createElement('li');
        li.setAttribute('id', 'liCardDashboard');
        li.setAttribute('class', 'card shadow');
    var canvas = document.createElement('canvas');
        
        
        CreateGenericChart("pie", canvas, arrLavels, arrValues, arrColor, "Alarmas", "Severidad Alarma de Dispositivos");
        div.appendChild(canvas);
        li.appendChild(div);
        return li;

}

function GenerateSeveritysListCard() {
    var ConnectedAndSeverityArr = [];
    var arrLavels = ["normal", "advertencia", "menor", "alarmado", "urgente"];
    var arrValues = [];
    var arrColor = ["#99e8bf", "#93d2ee", "#e5ee93", "#eec093",  "#f26157"];  
    var normal = 0;
    var advertencia = 0;
    var menor = 0;
    var alarmado = 0;
    var urgente = 0;

    this.state2.AllDevicesArray.forEach(device => {
        if (device.severity != null){ConnectedAndSeverityArr.push(device);}
    });

    ConnectedAndSeverityArr.forEach(device => {
        device.view.forEach(variable => {
            switch (variable.severity)
            {
                case 0:
                    normal ++;
                    break;
                case 1:
                    advertencia ++;
                    break;
                case 2:
                    menor ++;
                    break;
                case 3:
                    alarmado ++;
                    break;
                case 4:
                    urgente ++;
                    break; 
            }
        });
    });

    arrValues.push(normal);
    arrValues.push(advertencia);
    arrValues.push(menor);
    arrValues.push(alarmado);
    arrValues.push(urgente);

    var div = document.createElement('div');
        div.setAttribute('id', 'divCardDashboard');
    var li = document.createElement('li');
        li.setAttribute('id', 'liCardDashboard');
        li.setAttribute('class', 'card shadow');
    var canvas = document.createElement('canvas');
        
        
        CreateGenericChart("bar", canvas, arrLavels, arrValues, arrColor, "cantidad", "Severidad Alarma de Dispositivos");
        div.appendChild(canvas);
        li.appendChild(div);
        return li;

}