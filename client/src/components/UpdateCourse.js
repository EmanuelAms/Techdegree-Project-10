import React, { Component } from 'react';
import Form from './Form';

/*-------------------------------/
UPDATECOURSE STATEFUL COMPONENT
  displays a form to update an
  existing course
/-------------------------------*/

export default class UpdateCourse extends Component {

    state = {
        title: '',
        estimatedTime: '',
        description: '',
        materialsNeeded: '',
        id: '',
        errors: [],
        }

    // fetch the course data from the REST API

    componentDidMount() {
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        const id = this.props.match.params.id;
        fetch(`http://localhost:5000/api/courses/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                this.setState({
                    title: data.title,
                    estimatedTime: data.estimatedTime,
                    description: data.description,
                    materialsNeeded: data.materialsNeeded,
                    id: data.id,
                }) }
                // redirect to notfound page if the requested course isn't returned from the REST API
                else {
                    this.props.history.push('/notfound')
                };
                // redirect users to the /forbidden path if the requested course isn't owned by the authenticated user
                if (authUser.id !== data.userId) {
                    this.props.history.push('/forbidden');
                }
        })
            .catch(err => { 
                console.log('Error fetching and parsing data', err);
        }) ;
    };

    render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;

    const {
        title,
        estimatedTime,
        description,
        materialsNeeded,
        errors,
        } = this.state;

    // render a form with four input fields, one for each course property

    return (
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
                <Form
                    cancel={this.cancel}
                    errors={errors}
                    submit={this.submit}
                    submitButtonText="Update Course"
                    elements={() => (
                    <React.Fragment>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="title">Course Title</label>
                            <input
                            id="title"
                            name="title"
                            type="text"
                            value={title}
                            onChange={this.change} />

                            <p>By {authUser.firstName} {authUser.lastName}</p>

                            <label htmlFor="description">Course Description</label>
                            <textarea
                            id="description"
                            name="description"
                            value={description}
                            onChange={this.change} />
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input
                            id="estimatedTime"
                            name="estimatedTime"
                            type="text"
                            value={estimatedTime ? estimatedTime : 'N/A'}
                            onChange={this.change} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea
                            id="materialsNeeded"
                            name="materialsNeeded"
                            value={materialsNeeded ? materialsNeeded : 'N/A'}
                            onChange={this.change} />
                        </div>
                    </div>
                    </React.Fragment>
                     )} 
                />
            </div>
        </main>
    )
  };

    // update the course properties to update, when the input fields are filled in

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
        return {
            [name]: value
        };
     });
    }

    submit = () => {
        const { context } = this.props;
        const {
        title,
        description,
        estimatedTime,
        materialsNeeded,
        id,
        } = this.state;
        
        const course = {
        title,
        description,
        estimatedTime,
        materialsNeeded,
        id,
        };

        const authUser = context.authenticatedUser;

    // call the updateCourse method from the Data.js file

    context.data.updateCourse(course, authUser.emailAddress, authUser.password)
    .then( errors => {
        if (errors.length) {
        this.setState({ errors });
        } else {
            this.props.history.push('/');    
        }
    })
    .catch((err) => {
        console.log(err);
        this.props.history.push('/error');
    });
    }

    // redirect to course detail page when clicking the cancel button
  
    cancel = () => {
        const {id} = this.state;
        const course = {id};
        this.props.history.push(`/courses/${course.id}`);
    }
}