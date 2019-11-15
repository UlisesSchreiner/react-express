

// load login html
let peticion = new XMLHttpRequest();
        peticion.open("get", "html/login.txt");
        peticion.send();
        peticion.addEventListener("load", ()=> {

           
           document.querySelector("#contenedorPrincipal").innerHTML = peticion.response;
              
        // listen for click events
        document.addEventListener('click', function(e) {
            

            switch (e.target.id)
            {
                case 'login':
                        BotonLogeo();
                    break;

                case 'liveDemo':
                        BotonLiveDemo();           
                    break;

                case 'customCheck':
                        Recordarme();
                    break;

                case 'createAcount':
                        botonCreateCuenta();
                    break;

            }
            
        });

});


function BotonLogeo() {
    var password = document.querySelector('#InputPassword').value;
    var email = document.querySelector('#InputEmail').value;
    
    fetch('http://localhost:3000/auth/login', {
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


function BotonLiveDemo() {
    var password = "contraseña";
    var email = "info@energytec.com.ar";
    console.log(email + password);

    fetch('http://localhost:3000/auth/login', {
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

function Recordarme() {
    console.log("recordar cuenta");
}

function botonCreateCuenta() {
    console.log("crear cuenta");
}


function LoadPrincipal() {
    
// load login html
let peticion = new XMLHttpRequest();
peticion.open("get", "html/principal.txt");
peticion.send();
peticion.addEventListener("load", ()=> {
    document.querySelector("#contenedorPrincipal").innerHTML = peticion.response;
});
}



  

     