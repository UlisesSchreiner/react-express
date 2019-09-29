import React, { Component } from 'react';
// import { threadId } from 'worker_threads';


class App extends Component {

    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            tasks: [],
            events: [],
            _id: ''
        };
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    addTask(e) {
       if (this.setState._id == e._id)
       {
       fetch('api/tasks/' + this.state._id, {
           method: 'PUT',
           body: JSON.stringify(this.state),
           headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
       })
       .then(res => res.json())
       .then(data => console.log(data))
       .catch(err => console.log(err))
       } else {
        fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            M.toast({html: 'Task Saved'});
            this.setState({title: '', description: ''});
            this.fetchTasks();
         })
        .catch(err => console.log(err));
       }
       this.fetchTasks();
        e.preventDefault();
    }

    // al cargar la app 
    componentDidMount()
    {
        this.fetchTasks();
        this.pruebaApi();
    }

    deleteTask(id){
        if(confirm('are you sure you want to delit it?'))
        {
        fetch('api/tasks/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            M.toast({html: 'Task deleted'});
            this.fetchTasks();
        })
        .catch(err => console.log("error de fetch " + err));
    }
    }

    editTask(id)
    {
        
        
        fetch('api/tasks/' + id)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({
                title: data.title,
                description: data.description,
                _id: data._id
            });
        })
        .catch(err => "error de catch " + err);
        
    }

    fetchTasks()
    {
        fetch('api/tasks')
        .then(res => res.json())
        .then(data => {
            this.setState({tasks: data});
            console.log(this.state.tasks);
        })
        .catch(err => console.log(err));
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]:value
        });
    }

    pruebaApi()
    {
        fetch('api/tasks/events')
        .then(res => res.json())
        .then(data => {
            this.setState({events: data});
        })
        .catch(err => console.log(err));
    }


    render(){
        return (
            <div>
                {/* navegacion */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">Energy View</a>
                    </div>
                    
                    <button className="btn light-blue darken-4" style={{height: "60px"}}><i className="material-icons">account_circle</i></button>
                    
                </nav>

                {/* Principal */}
                <div className="container">

                    <div className="row">

                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                   <input name="title" value={this.state.title} onChange={this.handleChange} type="text" placeholder="titulo"/> 
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12">
                                                   <textarea name="description" value={this.state.description} onChange={this.handleChange} placeholder="descripcion" className="materialize-textarea"></textarea> 
                                            </div>
                                        </div>

                                        <button type="submit" className="btn light-blue darken-4" >SEND</button>  
                                        <button className="btn light-blue darken-4" onClick={() => this.pruebaApi()}>EVENTS</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(tasks => {
                                            return (
                                                <tr key={tasks._id}>
                                                    <td>{tasks.title}</td>
                                                    <td>{tasks.description}</td>
                                                    <td>
                                                         <button className="btn light-blue darken-4" onClick={() => this.deleteTask(tasks._id)} style={{margin: '2px'}}><i className="material-icons">delete</i></button>
                                                          <button className="btn light-blue darken-4" onClick={() => this.editTask(tasks._id)} style={{margin: '2px'}} ><i className="material-icons">edit</i></button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div> 

                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>volt</th>
                                        <th>watt</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.events.map(events => {
                                            return (
                                                <tr key={events._id}>
                                                    <td>{events.v.volt}</td>
                                                    <td>{events.v.watt}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div> 

                    </div>

                </div>

            </div>
        )
    }
}

export default App;