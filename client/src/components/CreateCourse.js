import React, { Component } from 'react';
import Form from './Form';

/*-------------------------------/
CREATECOURSE STATEFUL COMPONENT
  displays form to create new
  course
/-------------------------------*/

export default class CreateCourse extends Component {

    state = {
        title: '',
        estimatedTime: '',
        description: '',
        materialsNeeded: '',
        userId: '',
        errors: [],
      }

    render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const {
        title,
        description,
        estimatedTime,
        materialsNeeded,
        errors,
        } = this.state;

    // render a form with four input fields, one for each course property
        
    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
            <Form
                cancel={this.cancel}
                errors={errors}
                submit={this.submit}
                submitButtonText="Create Course"
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
                        value={estimatedTime}
                        onChange={this.change} />

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea
                        id="materialsNeeded"
                        name="materialsNeeded"
                        value={materialsNeeded}
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

    // update the course properties to create, when the input fields are filled in

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
        userId
        } = this.state;

        const authUser = context.authenticatedUser;

        const course = {
        title,
        description,
        estimatedTime,
        materialsNeeded,
        userId
        };

        course.userId = authUser.id ;  
        
        // call the createCourse method from the Data.js file

        context.data.createCourse(course, authUser.emailAddress, authUser.password)
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

    // redirect to home page when clicking the cancel button

    cancel = () => {
        this.props.history.push('/');
    }
}