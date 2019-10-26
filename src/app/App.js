import React  from 'react';
// import { threadId } from 'worker_threads';

import Devices from './Devices';

class App extends React.Component {

    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            tasks: [],
            events: [],
            _id: '',
            userName: '',
            devices: [],
            devicesArray: [],
            eventsArray: [],
            objeto: {
                name: 'ulises',
                edad: 22
            }
        };
        /*
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        */
     
    }


    loadDevices()
    {
        var array = [];
        
            //console.log(JSON.stringify({deviceId: this.state.devices[i]}));
            fetch('/api/devices/', {
                method: 'POST',
                body: JSON.stringify({deviceId: this.state.userName}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
               //this.setState({devicesArray: data});
               array = data;
               var obj = { user: "default", i: 0, e: 0, name: "ADD", password: "0", type: 0 };
               array.push(obj);
               console.log(array);
               this.setState({devicesArray: array});
             })
            .catch(err => console.log(err));
        
        
       
       
    }

    


    loadUser()
    {
        fetch('api/users/')
        .then(res => res.json())
        .then(data => {
            this.setState({userName: data.name, devices: data.devices});
            this.loadDevices();
        })
        .catch(err => "error de catch " + err);
    }


    // al cargar la app 
    componentDidMount()
    {
        //his.fetchTasks();
        //this.pruebaApi();
        this.loadUser();
    }

    prueba(param)
    {
       var html = "<div>";
         html += "<button className=\"btn light-blue darken-4\" style={{margin: '2px'}}><i className=\"material-icons\">+</i></button>";
         html += "<button>-</button>";
         html += "<table className='striped'> <thead><tr><th>volt</th><th>watt</th><th>amper</th></tr></thead><tbody>";

        fetch('/api/events/', {
            method: 'POST',
            body: JSON.stringify({eventsId: param}),
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
        this.setState({eventsArray: data});
        data.forEach(function(element) {
            console.log(element.v.volt);
            html += "<tr>";
            html += "<td>" + element.v.volt + "</td>";
            html += "<td>" + element.v.watt + "</td>";
            html += "<td>" + element.v.amper + "</td>";
            html += "</tr>";
          });
            console.log(data);

        html += "</tbody></table></div>";
        document.querySelector('#contenedor').innerHTML = html;
         })
        .catch(err => console.log(err));
        
        
    }
    loadEvent(e)
    {
        if (e.user != 'default')
        {
            this.prueba(e.e);
        } else {
            console.log('add');
        }
        
    }

   

    render(){
        return (
            <div id="principal">
                
                {/* navegacion */}
                <nav className="light-blue darken-4">
                <div className="nav-wrapper">
                <a href="#!" className="brand-logo"><i className="material-icons">cloud</i>Logo</a>
                <ul className="right hide-on-med-and-down">
                    <li><a href="sass.html"><i className="material-icons">search</i></a></li>
                    <li><a href="badges.html"><i className="material-icons">view_module</i></a></li>
                    <li><a href="collapsible.html"><i className="material-icons">refresh</i></a></li>
                    <li><a href="mobile.html"><i className="material-icons">more_vert</i></a></li>
                </ul>
                </div>
                </nav>

                {/* Principal */}
                <div >

                    <div className="row">
 
                    
                        <div className="col s5">
                         
                          
                                    {
                                    
                                        this.state.devicesArray.map(devicesArray => {
                                            return (
                                                <div className="row" key={devicesArray.e}>
                                                  <div className="col s5 m5" onClick={() => this.loadEvent(devicesArray)}>
                                                    <div className="card blue-grey darken-1">
                                                            <div className="card-content white-text">
                                                                    <span className="card-title">{devicesArray.name}</span>
                                                                    <p>IMAGEN SENSOR POTENCIA</p>
                                                            </div>
                                                            <div className="card-action">
                                                                    <a href="#">This is a link</a>
                                                                    <a href="#">This is a link</a>
                                                            </div>
                                                    </div>
                                                </div>
                                              </div>
                                            )
                                        })
                                        
                                    }
                               
                           
                               <div id="contenedor" ></div>
                        </div> 

                    </div>

                   

                </div>

            </div>
        )
    }
}

export default App;