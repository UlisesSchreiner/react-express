this.state2 = {
    dashArray: [],
    devicesArray: []
}

function InitDashboard() {
    ClearVariables();
    LoadScreenDashboard01();
    LoadDashArray();
}

function ClearVariables() {
    this.state2.dashArray = []
}

function LoadDashArray() {
    APIarrayDashboards().then(data => {
        this.state2.dashArray = data;
         APIarrayDevices().then(devArr => {
            this.state2.devicesArray = devArr;
            console.log(this.state2.devicesArray);

            
            this.state2.dashArray.forEach(dash => {
    
                switch(dash.dashType)
                {
                    case 1:
                        document.querySelector('#ulDashboard').appendChild(GenerateConnectividadCard());
                    break;
                    case 2: 
                        document.querySelector('#ulDashboard').appendChild(GenerateSeverityCard());
                    break;
                    case 3:
                        document.querySelector('#ulDashboard').appendChild(GenerateSeveritysListCard());
                    break;
                }
    
            });
    


         }).catch(err => console.log("error " + err));

       

    }).catch(err => console.log("error" + err));
    
    
}





function GenerateConnectividadCard() {
    var arrLavels = ["desconectados", "conectados"];
    var arrValues = [];
    var arrColor = ["#a3a8bd", "#99e8bf"];
    var Desconectados = 0;
    var Conectados = 0;

    this.state2.devicesArray.forEach(element => {
        
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
    this.state2.devicesArray.forEach(device => {
        if (device.connectividad == true){ConnectedAndSeverityArr.push(device);}
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
    var AllSeveritys = [];
    var arrLavels = ["normal", "advertencia", "menor", "alarmado", "urgente"];
    var arrValues = [];
    var arrColor = ["#99e8bf", "#93d2ee", "#e5ee93", "#eec093",  "#f26157"];  
    var normal = 0;
    var advertencia = 0;
    var menor = 0;
    var alarmado = 0;
    var urgente = 0;

    this.state2.devicesArray.forEach(device => {
        if (device.connectividad == true){ConnectedAndSeverityArr.push(device);}
    });

    ConnectedAndSeverityArr.forEach(device => {
       for(var propName in device.variablesSeverity) {
        if(device.variablesSeverity.hasOwnProperty(propName)) {
            var data = device.variablesSeverity[propName];
            for(var propName in data) {
                if(data.hasOwnProperty(propName)) {
                    var propValue = data[propName];
                        AllSeveritys.push(propValue);
                }
            }


            // do something with each element here
        }
    }
    });

AllSeveritys.forEach(severity => {
    switch (severity)
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
        
        
        CreateGenericChart("bar", canvas, arrLavels, arrValues, arrColor, "cantidad", "Severidad Alarma de Dispositivos");
        div.appendChild(canvas);
        li.appendChild(div);
        return li;

}