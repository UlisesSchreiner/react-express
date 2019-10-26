import React, { Component } from 'react';
// import { threadId } from 'worker_threads';


class Devices extends Component {

    constructor(props){
        super(props);
        this.state = {
            objeto: this.props.obj
        }
        console.log(this.props.user);
    };


    render(){
        return (
            <div className="row">
                <div className="col s12 m6">
                     <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                    <span className="card-title">{this.state.objeto.name}</span>
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
    }
}

export default Devices;