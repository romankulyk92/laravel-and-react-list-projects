import React, { Component } from 'react';

class AddProject extends Component {

    constructor(props) {
        super(props);
        /* Initialize the state. */
        this.state = {
            newProject: {
                title: '',
                description: '',
                price: 0,
                availability: 0
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(key, e) {
        /*Duplicating and updating the state */
        var state = Object.assign({}, this.state.newProject);
        state[key] = e.target.value;
        this.setState({newProject: state });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onAdd(this.state.newProject);
    }

    render() {
        return(
            <div className="col-md-12">
                <h4 className="mb-3">Add project</h4>
                    <form name="handleSubmit" method='post' onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-md-3 mb-3">
                                <label> Title:</label>
                                <input type="text"
                                       name="title"
                                       placeholder="Enter Title" className="form-control" onChange={(e)=>this.handleInput('title',e)} />
                            </div>
                            <div className="col-md-3 mb-3">
                                <label> Description:</label>
                                <input type="text"
                                       name="description"
                                       placeholder="Enter Description"  className="form-control" onChange={(e)=>this.handleInput('description',e)} />
                            </div>
                            <div className="col-md-3 mb-3">
                                <label> Price:</label>
                                <input type="text"
                                       name="price"
                                       placeholder="Enter Price"  className="form-control" onChange={(e)=>this.handleInput('price',e)} />
                            </div>
                            <div className="col-md-3 mb-3">
                                <label></label>
                                <button type="submit" className="btn btn-primary btn-lg btn-block">Submit</button>
                            </div>
                        </div>
                    </form>
            </div>)
    }
}

export default AddProject;