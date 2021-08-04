// require('dotenv').config()
import React, { Component } from "react";
import { ReactDOM } from "react";
import GoogleLogin from "react-google-login";



export default class SignOn extends Component {
    constructor() {
        super();
        this.state = {
        }
        // this.handleLogin = this.handleLogin.bind(this)
    };
    
    render() {
        const handleLogin = (response) => {
            return console.log(response)
        }
        console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID)
        console.log('render');
       return (
        <div>
            <GoogleLogin
                clientId={"854591671315-j148rl3knd8t3j4tig9p3qhdpht4da91.apps.googleusercontent.com"}
                buttonText="Log in with Google"
                onSuccess={handleLogin}
                onFailure={handleLogin}
                cookiePolicy={'single_host_origin'}
            />
        </div>

       )
    }
}