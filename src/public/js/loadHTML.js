

// load login html
function LoadLoginScreen() {
    // clear token 
    document.cookie = "token=Bearer " + encodeURIComponent( "" );

    let peticion = new XMLHttpRequest();
    peticion.open("get", "html/login.txt");
    peticion.send();
    peticion.addEventListener("load", ()=> {

        document.querySelector("#contenedorPrincipal").innerHTML = "";
       document.querySelector("#contenedorPrincipal").innerHTML = peticion.response;
    

});    
}
LoadLoginScreen();

// listen for click events
document.addEventListener('click', function(e) {
        

    switch (e.target.id)
    {
        case 'login':
                BotonLogeo(e);
            break;

        case 'liveDemo':
                BotonLiveDemo(e);           
            break;

        case 'customCheck':
                Recordarme();
            break;

        case 'createAcount':
                botonCreateCuenta(e);
            break;

            case 'createRegistreAccount':
                botonRegistrerAcount(e);
            break;

            case 'createBackToLogin':
                    backToLogin(e);
                break;
          

    }
    
});



function backToLogin(e) {
    e.preventDefault();
    LoadLoginScreen();
}

// Login Button
function BotonLogeo(e) {
    e.preventDefault();
    var password = document.querySelector('#InputPassword').value;
    var email = document.querySelector('#InputEmail').value;
    
    fetch('http://energytec.ddns.net:4000/auth/login', {
        method: 'POST', 
        body: JSON.stringify({
            mail:email,
            password:password
        }), 
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(function(response) {
        if (response.status === 200) {
             response.json().then(dat => {
                document.cookie = "token=Bearer " + encodeURIComponent( dat.token );
                LoadPrincipal(); 
                });
        } else if (response.status === 204){
            toastr["error"]("Usuario o Contraseña incorrectos", "Error");
        } else if (response.status === 401){
            toastr["error"]("Cuenta desactivada, Active su cuenta", "Error");
        }
      }).catch(err => {console.log(err)});
}


function BotonLiveDemo(e) {
    e.preventDefault();
    var password = "contraseña";
    var email = "visualizador@mail.com";
    console.log(email + password);

    fetch('http://energytec.ddns.net:4000/auth/login', {
        method: 'POST', 
        body: JSON.stringify({
            mail:email,
            password:password
        }), 
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(dat => {
          if (!dat.token) return console.log("falla de autentificacion");
          
            // guardar la cookie 
            document.cookie = "token=Bearer " + encodeURIComponent( dat.token );
            LoadPrincipal();
           
        })
      .catch(error => console.error('Error:', error));
}
// Clikeo sobre rememberme
function Recordarme() {
    console.log("recordar cuenta");
}

// btn crear cuenta
function botonCreateCuenta(e) {
    e.preventDefault();
    LoadRegistrer();
}

// function to load the principal dashboard
function LoadPrincipal() {
    
// load login html
let peticion = new XMLHttpRequest();
peticion.open("get", "html/principal.txt");
peticion.send();
peticion.addEventListener("load", ()=> {
    document.querySelector("#contenedorPrincipal").innerHTML = "";
    document.querySelector("#contenedorPrincipal").innerHTML = peticion.response;
});
}

// function to load the registrer page
function LoadRegistrer() {
    
    // load login html
    let peticion = new XMLHttpRequest();
    peticion.open("get", "html/register.txt");
    peticion.send();
    peticion.addEventListener("load", ()=> {
        document.querySelector("#contenedorPrincipal").innerHTML = "";
        document.querySelector("#contenedorPrincipal").innerHTML = peticion.response;
    });
    }

  
function botonRegistrerAcount(e)
{
    e.preventDefault();
    var firstName = document.querySelector('#createFirstName').value;
    var lastName = document.querySelector('#createLastName').value;
    var email = document.querySelector('#createInputEmail').value;
    var pass = document.querySelector('#createInputPassword').value;
    var Repeatpass = document.querySelector('#createRepeatPassword').value;
    var InputRepeatpass = document.querySelector('#createRepeatPassword');

   
    if (pass === Repeatpass){

        if (firstName != null && lastName != null && email != null && pass != null) {

         let token = readCookie('token');
         return fetch('http://energytec.ddns.net:4000/newUser', {
             method: 'POST',
             body: JSON.stringify({
                "name": firstName,
                "surname": lastName,
                "mail": email,
                "password": pass
             }),  
             headers:{
               'Content-Type': 'application/json',
               'Authorization': token
             }
           }).then(dat => {
                 if (dat.status == 201){
                    LoadLoginScreen();
                  } else if (dat.status == 204){
                   toastr["error"]("Error creando el usuario", "Error");
                 } else {
                   toastr["error"]("Error creando el usuario", "Error");
                 }
             })
           .catch(error => console.warn(error));


       }
    } else {
        InputRepeatpass.setAttribute('class', 'border border-danger');
    }
}
