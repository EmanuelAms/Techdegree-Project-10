import config from './config';

/*---------------------------------/
            DATA CLASS
Holds methods for users and courses
/---------------------------------*/

export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {    
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  // method to get an existing user from the school database, for the sign in page,
  // by sending a GET request to the REST API

  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  // method to create a new user for the school database, for the sign up page,
  // by sending a POST request to the REST API
  
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  // method to create a new course for the school database, for the create course page,
  // by sending a POST request to the REST API

  async createCourse(course, emailAddress, password) {
    const response = await this.api('/courses', 'POST', course, true, { emailAddress, password });
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  // method to update an existing course for the school database, for the update course page,
  // by sending a PUT request to the REST API

  async updateCourse(course, emailAddress, password) {
    const response = await this.api(`/courses/${course.id}`, 'PUT', course, true, { emailAddress, password });
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors; 
      });
    }
    else {
      throw new Error();
    }
  }

  // method to delete an exisiting course for the school database, for the delete course button on the course detail page,
  // by sending a DELETE request to the REST API

  async deleteCourse(course, emailAddress, password) {
    const response = await this.api(`/courses/${course.id}`, 'DELETE', course, true, { emailAddress, password });
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
}