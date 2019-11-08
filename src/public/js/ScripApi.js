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
     * this function create a new device
     */
    function APIcreateNewDeice(events, password, dispositivo) {
        console.log(events);
        console.log(password);
        console.log(dispositivo);
    }