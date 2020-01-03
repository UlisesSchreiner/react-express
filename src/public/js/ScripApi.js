/**
 * this function return array with the objects devices
 */
function APIarrayDevices(){
    let token = readCookie('token');
    return fetch('http://energytec.ddns.net:4000/device', {  
        headers:{
          'Content-Type': 'application/json',
          'Authorization': token
        }
      }).then((response) => response.json())
      .then((responseData) => {
        return responseData;
      })
      .catch(error => console.warn(error));
    }

    /**
     * this function create a new device
     */
    function APIcreateNewDeice(events, password, dispositivo) {
      
        let token = readCookie('token');
        return fetch('http://energytec.ddns.net:4000/device', {
            method: 'POST',
            body: JSON.stringify({
                "events":Number(events),
                "password":password,
                "dispositivo":Number(dispositivo)
            }),  
            headers:{
              'Content-Type': 'application/json',
              'Authorization': token
            }
          }).then(dat => {
              console.log(dat.status);
                if (dat.status == 201){
                    toastr["success"]("Device Created", "Susses");
                 } else if (dat.status == 401){
                  toastr["error"]("No tiene permisos suficientes para realizar esta accion", "Error");
                } else {
                  toastr["error"]("Error creando Device", "Error");
                }
            })
          .catch(error => console.warn(error));

    }

    /**
     * this function delete one divice
     */
    function APIdeleteDevice(id){
        let url = 'http://energytec.ddns.net:4000/device/' + id;
        let token = readCookie('token');
        return fetch(url, {
            method: 'DELETE',  
            headers:{
              'Content-Type': 'application/json',
              'Authorization': token
            }
          }).then(dat => {
            console.log(dat.status);
            if (dat.status === 200) {
              toastr["success"]("Device deleted", "Susses");
         } else if (dat.status === 204){
             toastr["error"]("Error eliminando el Device", "Error");
         } else if (dat.status === 401){
             toastr["error"]("No tiene permisos suficientes para realizar esta accion", "Error");
         }
              
            })
          .catch();

    }
    

      /**
 * this function return array with the events objects
 */
function APIarrayEvents(i, from, to){
    let token = readCookie('token');
    return fetch('http://energytec.ddns.net:4000/event/', {
        method: 'POST',
        body: JSON.stringify({
            "i":i,
            "from":from,
            "to":to
        }),  
        headers:{
          'Content-Type': 'application/json',
          'Authorization': token
        }
      }).then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        return responseData;
      })
      .catch(error => console.warn(error));
    }


    /**
     * This function get the last event inserted in the events colection
     */
    function APIlastEvent(events)
    {  
        let url = 'http://energytec.ddns.net:4000/event/' + events;
        let token = readCookie('token');
        return fetch(url, {  
            headers:{
              'Content-Type': 'application/json',
              'Authorization': token
            }
          }).then((response) => response.json())
          .then((responseData) => {
            return responseData;
          })
          .catch(error => console.warn(error));
    }

    function APIgetSelfUser() {
      let token = readCookie('token');
      return fetch('http://energytec.ddns.net:4000/user/selfUser/get', {  
          headers:{
            'Content-Type': 'application/json',
            'Authorization': token
          }
        }).then((response) => response.json())
        .then((responseData) => {
          return responseData;
        })
        .catch(error => console.warn(error));
    }

    function APIsetSelfUser(obj) {
      let token = readCookie('token');
      return fetch('http://energytec.ddns.net:4000/user/autoUpdate/', {
        method: 'POST',
        body: JSON.stringify(obj),  
        headers:{
          'Content-Type': 'application/json',
          'Authorization': token
        }
      }).then(dat => {
        console.log(dat.status);
        if (dat.status === 200) {
          toastr["success"]("User updated", "Susses");
     } else if (dat.status === 204){
         toastr["error"]("Error updating user", "Error");
        } else if (dat.status === 401) {
          toastr["error"]("Password incorrecta", "Error");
        }
      })
      .catch(error => console.warn(error));
    }

    
    function APIarrayDashboards(){
      let token = readCookie('token');
      return fetch('http://energytec.ddns.net:4000/dashboard/', {  
          headers:{
            'Content-Type': 'application/json',
            'Authorization': token
          }
        }).then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          return responseData;
        })
        .catch(error => console.warn(error));
      }