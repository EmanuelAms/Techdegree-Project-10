import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Form from './Form';

/*-------------------------------/
USERSIGNIN STATEFUL COMPONENT
  displays form to sign in with
  account information
/-------------------------------*/ 

export default class UserSignIn extends Component {

  state = {
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      emailAddress,
      password,
      errors,
    } = this.state;

    // render a form with two input fields, for the user email address and password

    return (
      <main>
        <div className="form--centered">
          <h2>Sign In</h2>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <label htmlFor="emailAddress">Email Address</label>
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="email"
                  value={emailAddress} 
                  onChange={this.change} 
                  />
                <label htmlFor="password">Password</label>
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  />                
              </React.Fragment>
            )} />
          <p>
            Don't have a user account? Click here to <Link to="/signup">sign up</Link>!
          </p>
        </div>
      </main>
    );
  }

  // update the user properties to sign in, when the input fields are filled in

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
    const { from } = this.props.location.state || { from: { pathname: '/authenticated' } };
    const { emailAddress, password } = this.state;

    // call the signIn method from the Context.js file

    context.actions.signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          this.setState(() => {
            return { errors: [ 'Sign-in was unsuccessful' ] };
          });
        } else {
          // after the user signs in, he is redirected back to the previous screen
          this.props.history.push(from);
        }
      })
      .catch((error) => {
        console.error(error);
        this.props.history.push('/error');
      });
  }

  // redirect to home page when clicking the cancel button

  cancel = () => {
    this.props.history.push('/');
  }
}