/**
 * this function return array with the objects devices
 */
function APIarrayDevices(){
    let token = readCookie('token');
    return fetch('http://localhost:3000/device', {  
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
        return fetch('http://localhost:3000/device', {
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
                 } else {
                    toastr["error"]("Error creating Device", "Error");
                }
            })
          .catch(error => console.warn(error));

    }

    /**
     * this function delete one divice
     */
    function APIdeleteDevice(id){
        let url = 'http://localhost:3000/device/' + id;
        let token = readCookie('token');
        return fetch(url, {
            method: 'DELETE',  
            headers:{
              'Content-Type': 'application/json',
              'Authorization': token
            }
          }).then(dat => {
              console.log(dat);
              toastr["success"]("Device deleted", "Susses")
            })
          .catch(error => console.warn(error));

    }
    

      /**
 * this function return array with the events objects
 */
function APIarrayEvents(i, from, to){
    let token = readCookie('token');
    return fetch('http://localhost:3000/event/', {
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
        return responseData;
      })
      .catch(error => console.warn(error));
    }


    /**
     * This function get the last event inserted in the events colection
     */
    function APIlastEvent(events)
    {  
        let url = 'http://localhost:3000/event/' + events;
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