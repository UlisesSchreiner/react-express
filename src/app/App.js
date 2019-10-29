import React, { Component } from 'react';
// import { threadId } from 'worker_threads';

import StyleSheet from 'css/sb-admin-2.min.css';


class App extends Component {

    constructor(){
        super();
        this.state = {
           devices: [],
           devicesViews: [],
           eventDevicesActual: '',
           eventsToShow: [],
           eventsKeyToSwoh: ''
        };
        //this.addTask = this.addTask.bind(this);
        //this.handleChange = this.handleChange.bind(this);
    }


    LoadDevicesEvents(eventKey) {

        this.setState({eventsKeyToSwoh:eventKey});
        console.log(this.state.eventsKeyToSwoh);

    }

    LoadEvents(){
         
        // TODO cargar un dia de eventos en eventsToShow

        let token = this.readCookie("Authorization");

        fetch('http://localhost:3000/event',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization':token
            },
            body:JSON.stringify({
                "i": this.state.eventDevicesActual,
                "from":1569129164539,
                "to":new Date()
            })})
        .then(res => res.json())
        .then(dat => {
            this.setState({eventsToShow : dat});
            console.log(this.state.eventsToShow);
        })
        .catch(err => console.log(err));
    }

    LoadDevicesView(e, eventsActual){
        this.setState({devicesViews : e});
        this.setState({eventDevicesActual : eventsActual});
        this.LoadEvents();
    }

    LogIn()
    {
        let email = document.querySelector('#email').value;
        let password = document.querySelector('#password').value;

        fetch('http://localhost:3000/auth/login',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
        body:JSON.stringify({
            "mail":email,
            "password":password
        })})
        .then(res => res.json())
        .then(dat => {
            if (!dat.token) return console.log("eror de logeo");

            document.cookie = "Authorization=Bearer " + encodeURIComponent( dat.token );
            console.log(this.readCookie("Authorization"));
            document.querySelector('#login').innerHTML = "<br/><br/>";
            this.loadDevices();
        })
        .catch(err => console.log(err));
    }

    loadDevices() {

        let token = this.readCookie("Authorization");

        fetch('http://localhost:3000/device',{
            headers: {
                'Content-Type':'application/json',
                'Authorization':token
            }})
        .then(res => res.json())
        .then(dat => {
            this.setState({devices : dat});
            console.log(this.state.devices);
        })
        .catch(err => console.log(err));

    }
  

    readCookie(name) {

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

    render(){
        return (
            <div>
                {/* navegacion */}
               

                
 <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

    
    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
      <i className="fa fa-bars"></i>
    </button>

    

    
    <ul className="navbar-nav ml-auto">

      
      <li className="nav-item dropdown no-arrow d-sm-none">
        <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i className="fas fa-search fa-fw"></i>
        </a>
        
        <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
          <form className="form-inline mr-auto w-100 navbar-search">
            <div className="input-group">
              <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"/>
              <div className="input-group-append">
                <button className="btn btn-primary" type="button">
                  <i className="fas fa-search fa-sm"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </li>

      
      <li className="nav-item dropdown no-arrow mx-1">
        <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i className="fas fa-bell fa-fw"></i>
          
          <span className="badge badge-danger badge-counter">3+</span>
        </a>
        
        <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
          <h6 className="dropdown-header">
            Alerts Center
          </h6>
          <a className="dropdown-item d-flex align-items-center" href="#">
            <div className="mr-3">
              <div className="icon-circle bg-primary">
                <i className="fas fa-file-alt text-white"></i>
              </div>
            </div>
            <div>
              <div className="small text-gray-500">December 12, 2019</div>
              <span className="font-weight-bold">A new monthly report is ready to download!</span>
            </div>
          </a>
          <a className="dropdown-item d-flex align-items-center" href="#">
            <div className="mr-3">
              <div className="icon-circle bg-success">
                <i className="fas fa-donate text-white"></i>
              </div>
            </div>
            <div>
              <div className="small text-gray-500">December 7, 2019</div>
              $290.29 has been deposited into your account!
            </div>
          </a>
          <a className="dropdown-item d-flex align-items-center" href="#">
            <div className="mr-3">
              <div className="icon-circle bg-warning">
                <i className="fas fa-exclamation-triangle text-white"></i>
              </div>
            </div>
            <div>
              <div className="small text-gray-500">December 2, 2019</div>
              Spending Alert: We've noticed unusually high spending for your account.
            </div>
          </a>
          <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
        </div>
      </li>

      
      <li className="nav-item dropdown no-arrow mx-1">
        <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i className="fas fa-envelope fa-fw"></i>
          
          <span className="badge badge-danger badge-counter">7</span>
        </a>
        
        <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
          <h6 className="dropdown-header">
            Message Center
          </h6>
          <a className="dropdown-item d-flex align-items-center" href="#">
            <div className="dropdown-list-image mr-3">
              <img className="rounded-circle" src="https://source.unsplash.com/fn_BT9fwg_E/60x60" alt=""/>
              <div className="status-indicator bg-success"></div>
            </div>
            <div className="font-weight-bold">
              <div className="text-truncate">Hi there! I am wondering if you can help me with a problem I've been having.</div>
              <div className="small text-gray-500">Emily Fowler · 58m</div>
            </div>
          </a>
          <a className="dropdown-item d-flex align-items-center" href="#">
            <div className="dropdown-list-image mr-3">
              <img className="rounded-circle" src="https://source.unsplash.com/AU4VPcFN4LE/60x60" alt=""/>
              <div className="status-indicator"></div>
            </div>
            <div>
              <div className="text-truncate">I have the photos that you ordered last month, how would you like them sent to you?</div>
              <div className="small text-gray-500">Jae Chun · 1d</div>
            </div>
          </a>
          <a className="dropdown-item d-flex align-items-center" href="#">
            <div className="dropdown-list-image mr-3">
              <img className="rounded-circle" src="https://source.unsplash.com/CS2uCrpNzJY/60x60" alt=""/>
              <div className="status-indicator bg-warning"></div>
            </div>
            <div>
              <div className="text-truncate">Last month's report looks great, I am very happy with the progress so far, keep up the good work!</div>
              <div className="small text-gray-500">Morgan Alvarez · 2d</div>
            </div>
          </a>
          <a className="dropdown-item d-flex align-items-center" href="#">
            <div className="dropdown-list-image mr-3">
              <img className="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60" alt=""/>
              <div className="status-indicator bg-success"></div>
            </div>
            <div>
              <div className="text-truncate">Am I a good boy? The reason I ask is because someone told me that people say this to all dogs, even if they aren't good...</div>
              <div className="small text-gray-500">Chicken the Dog · 2w</div>
            </div>
          </a>
          <a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
        </div>
      </li>

      <div className="topbar-divider d-none d-sm-block"></div>

      
      <li className="nav-item dropdown no-arrow">
        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span className="mr-2 d-none d-lg-inline text-gray-600 small">Valerie Luna</span>
          <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60"/>
        </a>
        
        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
          <a className="dropdown-item" href="#">
            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
            Profile
          </a>
          <a className="dropdown-item" href="#">
            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
            Settings
          </a>
          <a className="dropdown-item" href="#">
            <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
            Activity Log
          </a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
            Logout
          </a>
        </div>
      </li>

    </ul>

  </nav>
  

                {/* Principal */}

            

                <div id="panelPrincipal" className="contenedor">
                <div id="devices">
                {
                                        this.state.devices.map(devices => {
                                            return (
                                                <div className="row" key={devices._id} onClick={() => this.LoadDevicesView(devices.view, devices.events)}>
                                                <div className="col s6 m2">
                                                  <div className="card">
                                                    <div className="card-image">
                                                      <span className="card-title">Card Title</span>
                                                      <a className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">add</i></a>
                                                    </div>
                                                    <div className="card-content">
                                                      <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            )
                                        })
                 }
                </div>       

                <div id="visorDevices">
                {
                                        this.state.devicesViews.map(views => {
                                            return (
                                                <tr key={views._id}>
                                                    <td onClick={() => this.LoadDevicesEvents(views.events)}>{views.name}</td>
                                                </tr>
                                            )
                                        })
                 }
                 </div>


                 <div id="visorEvents">

                 {
                                        this.state.eventsToShow.map(event => {
                                            return (
                                                <div key={event._id}>
                                                <tr>
                                                    <td>{event.v[this.state.eventsKeyToSwoh]}</td>
                                                    <td>{event.t}</td>
                                                </tr>
                                                </div>
                                            )
                                        })
                 }

                 </div>




                </div>




            </div>
        )
    }
}

export default App;