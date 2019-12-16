
this.state = {
    actualScreen: Number,
    screen01State: Boolean,
    screen02State: Boolean,
    screen03State: Boolean,
    screenAccSettings: Boolean,
    screenDashboard01: Boolean
}
    this.state.actualScreen = 0;
    this.state.screen01State = false;
    this.state.screen02State = false;
    this.state.screen03State = false;
    this.state.screenAccSettings = false;
    this.state.screenDashboard01 = false;

    function ClearVariables() {
        this.state.screen01State = false;
        this.state.screen02State = false;
        this.state.screen03State = false;
        this.state.screenAccSettings = false;
        this.state.screenDashboard01 = false;        
    }

    function ClearContCuadros() {
        document.querySelector('#contenedorCuadros').innerHTML = "";    
    }


    function LoadScreen01() {
    if (this.state.screen01State) {return false;}

    ClearContCuadros();
    const contenedorPrincipal = document.querySelector('#contenedorCuadros');
    const visorUno = document.createElement('div');
          visorUno.setAttribute('id', 'visorUno');
          visorUno.setAttribute('class', 'card shadow');

    const navVisorUno = document.createElement('div');
          navVisorUno.setAttribute('id', 'navVisorUno');
    const contenidoVisorUno = document.createElement('div');
          contenidoVisorUno.setAttribute('id', 'contenidoVisorUno');


    visorUno.appendChild(navVisorUno);
    visorUno.appendChild(contenidoVisorUno);
    contenedorPrincipal.appendChild(visorUno);

    this.state.screen01State = true;
    this.state.actualScreen = 1;
}

function LoadScreen02() {
    if (this.state.screen02State) {return false;}
    const contenedorPrincipal = document.querySelector('#contenedorCuadros');
    const visorUno2 = document.createElement('div');
          visorUno2.setAttribute('id', 'visorDos');
          visorUno2.setAttribute('class', 'card shadow');

    contenedorPrincipal.appendChild(visorUno2);
    this.state.screen02State = true;
}

function LoadScreen03() {
    if (this.state.screen03State) {return false;}
    const contenedorPrincipal = document.querySelector('#contenedorCuadros');
    const visorUno3 = document.createElement('div');
          visorUno3.setAttribute('id', 'visorTres');
          visorUno3.setAttribute('class', 'card shadow');

    contenedorPrincipal.appendChild(visorUno3);

    this.state.screen03State = true;
}


function LoadScreenDashboard01() {
    if (this.state.screenDashboard01) {return false;}

    var contenedorCuadrosDashboard = document.querySelector('#contenedorCuadros');
        contenedorCuadrosDashboard.innerHTML = "";
    var divContDashboard = document.createElement('div');
        divContDashboard.setAttribute('id', 'visorCuadrosDhasboard');

    var ul = document.createElement('ul');
        ul.setAttribute('id', 'ulDashboard');

        divContDashboard.appendChild(ul);

    var divContNavVar = document.createElement('div');
        divContNavVar.setAttribute('id', 'visorNavVarDhasboard');

    var divBoton = document.createElement('div');
        divBoton.setAttribute('id', 'divBotonNavDash');
    var img = document.createElement('img');
        img.setAttribute('src', '/images/plus.png');
        img.setAttribute('id', 'imgPlusDashboard');
        divBoton.appendChild(img);
        divContNavVar.appendChild(divBoton);

        contenedorCuadrosDashboard.appendChild(divContNavVar);
        contenedorCuadrosDashboard.appendChild(divContDashboard);
}




function SettingsButton(e) {
    e.preventDefault();
    LoadAccountSettingsScreen();
    
}

     
function LoadAccountSettingsScreen() {
   

    let peticion = new XMLHttpRequest();
    peticion.open("get", "html/accountSettings.txt");
    peticion.send();
    peticion.addEventListener("load", ()=> {

        document.querySelector("#contenedorCuadros").innerHTML = "";
       document.querySelector("#contenedorCuadros").innerHTML = peticion.response;
   
       
    let name = document.querySelector("#asFirstName");
    let lastName = document.querySelector("#asLastName");
    let email = document.querySelector("#asEmail");
    var buttonSubmit = document.querySelector('#asSubmit');
    var currentPass = document.querySelector('#asPass');


       APIgetSelfUser().then(dat => loadVarInForm(dat));

        
        buttonSubmit.addEventListener('click', function () {
           var nreObj = {
            "name":name.value,
            "surname":lastName.value,
            "mail":email.value,
            "password":currentPass.value
           } 
           console.log(nreObj);
           APIsetSelfUser(nreObj).then(dat => console.log(dat)); // TODO que compruebe la contraseña antes de updatear en la api
        });


        function loadVarInForm(obj) {
            console.log(obj);
            name.value = obj.name;
            lastName.value = obj.surname;
            email.value = obj.mail;
            ClearVariables();
        }

       this.state.actualScreen = 3; // accountSettings
});
}
