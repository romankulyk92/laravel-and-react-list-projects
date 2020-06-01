import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Project from './Project';
import AddProject from './AddProject';

/* An example React component */
class Main extends Component {

    constructor() {

        super();

        /* currentProject keeps track of the project currently
         * displayed */
        this.state = {
            projects: [],
            currentProject: null
        }

        this.handleAddProject = this.handleAddProject.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount() {
        /* fetch API in action */
        fetch('/api/projects')
            .then(response => {
                return response.json();
            })
            .then(projects => {
                //Fetched project is stored in the state
                this.setState({ projects });
            });
    }

    renderProjects() {
        return this.state.projects.map(project => {
            return (
                <li className="list-group-item d-flex justify-content-between align-items-center" onClick={ () =>this.handleClick(project)} key={project.id}>
                    { project.title }
                    <span className="badge badge-primary badge-pill">{ project.price }</span>

                    <button className="btn btn-danger" onClick={ () =>this.handleDelete()}>x</button>
                </li>
            );
        })
    }

    handleClick(project) {
        //handleClick is used to set the state
        this.setState({currentProject:project});

    }

    handleAddProject(project) {
        project.price = Number(project.price);
        /*Fetch API for post request */
        fetch( 'api/projects/', {
            method:'post',
            /* headers are important*/
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(project)
        })
            .then(response => {
                return response.json();
            })
            .then( data => {
                //update the state of projects and currentProject
                this.setState((prevState)=> ({
                    projects: prevState.projects.concat(data),
                    currentProject : data
                }))
            })

    }

    handleDelete() {

        const currentProject = this.state.currentProject;
        fetch( 'api/projects/' + this.state.currentProject.id,
            { method: 'delete' })
            .then(response => {
                /* Duplicate the array and filter out the item to be deleted */
                var array = this.state.projects.filter(function(item) {
                    return item !== currentProject
                });

                this.setState({ projects: array, currentProject: null});

            });
    }

    handleUpdate(project) {

        const currentProject = this.state.currentProject;
        fetch( 'api/projects/' + currentProject.id, {
            method:'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then(response => {
                return response.json();
            })
            .then( data => {
                /* Updating the state */
                var array = this.state.projects.filter(function(item) {
                    return item !== currentProject
                })
                this.setState((prevState)=> ({
                    projects: array.concat(project),
                    currentProject : project
                }))
            })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <AddProject onAdd={this.handleAddProject} />
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <h3> All projects </h3>
                        <ul className="list-group">
                            { this.renderProjects() }
                        </ul>
                    </div>
                    <Project project={this.state.currentProject} />
                </div>
            </div>
        );
    }
}

export default Main;

/* The if statement is required so as to Render the component on pages that have a div with an ID of "root";
*/

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}