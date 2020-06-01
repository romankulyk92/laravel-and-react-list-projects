import React, { Component } from 'react';

/* Stateless component or pure component
 * { project } syntax is the object destructing
 */
const Project = ({project}) => {

    //if the props project is null, return Project doesn't exist
    if(!project) {
        return(<div className="col-md-9"><h3>Project Doesnt exist</h3></div>);
    }

    //Else, display the project data
    return(
        <div className="col-md-9">
            <div className="row">
                <div className="col-md-12">
                    <h2> {project.title} </h2>
                    <p> {project.description} </p>
                    <h3> Status {project.availability ? 'Available' : 'Out of stock'} </h3>
                    <h3> Price : {project.price} </h3>
                </div>
            </div>
        </div>
    )
}

export default Project ;