

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


function BotonLiveDemo() {
    console.log("liveDemo");
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


function readCookie(name) {

    var nameEQ = name + "="; 
    var ca = document.cookie.split(';');
  
    for(var i=0;i < ca.length;i++) {
  
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) {
        return decodeURIComponent( c.substring(nameEQ.length,c.length) );
      }
  
    }
  
    return null;
  
  }
  

     