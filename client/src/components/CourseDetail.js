import React, { Component } from 'react';
import {Link} from 'react-router-dom';

// use React Markdown to render the course description and materialsNeeded properties as markdown formatted text
import ReactMarkdown from 'react-markdown';

/*-------------------------------/
  COURSEDETAIL STATEFUL COMPONENT
    displays detail of a course,
    update course button,
    and delete course button
/-------------------------------*/

export default class CourseDetail extends Component {

    state = {
        title: '',
        estimatedTime: '',
        description: '',
        materialsNeeded: '',
        id: '',
        userId: '',
        firstName: '',
        lastName: ''
        };

    // fetch the course data from the REST API
    
    componentDidMount() {
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
                    userId: data.userId,
                    firstName: data.User.firstName,
                    lastName: data.User.lastName
                }) }
                // redirect to notfound page if the requested course isn't returned from the REST API
                else {
                    this.props.history.push('/notfound')
                };
        })
            .catch(err => { 
                console.log('Error fetching and parsing data', err);
        }) ;
    };

    render() { 
        const {
            title,
            estimatedTime,
            description,
            materialsNeeded,
            id,
            userId,
            firstName,
            lastName
            } = this.state;
        const { context } = this.props;
        const authUser = context.authenticatedUser;

        // render update and delete buttons if the authenticated user owns the course
        // render return to list button
        // render course details

        return (
        <main>
            <div className="actions--bar">
                <div className="wrap"> 
                {(authUser && authUser.id === userId
                ) ? (
                    <React.Fragment>
                    <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                    <Link className="button" onClick={this.delete} to="/">Delete Course</Link>
                    <Link className="button button-secondary" to="/">Return to List</Link>
                    </React.Fragment>
                ) : (
                    <Link className="button button-secondary" to="/">Return to List</Link>
                )}  
                </div>
            </div>

            <div className="wrap">
            <h2>Course Detail</h2>
            <form>
                <div className="main--flex">
                    <div>
                        <h3 className="course--detail--title">Course</h3>
                        <h4 className="course--name">{title}</h4>
                        <p>By {firstName} {lastName}</p>
                        <ReactMarkdown>
                        {description}
                        </ReactMarkdown>
                    </div>
                    <div>
                        <h3 className="course--detail--title">Estimated Time</h3>
                        <p>{estimatedTime}</p>

                        <h3 className="course--detail--title">Materials Needed</h3>
                        <ul className="course--detail--list">
                        <ReactMarkdown>
                        {materialsNeeded}
                        </ReactMarkdown>
                        </ul>
                    </div>
                </div>
            </form>
        </div>
        </main>
        )
    };


  delete = (e) => {
    e.preventDefault();

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

    // call the deleteCourse method from the Data.js file

    context.data.deleteCourse(course, authUser.emailAddress, authUser.password)
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
}   