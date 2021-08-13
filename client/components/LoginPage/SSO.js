import { getMaxListeners } from "process";
import React, { Component } from "react";
import GoogleLogin from "react-google-login";

export default class SignOn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            promptLogIn: false //displays prompt after unsuccesful login
        }
    };
    handleLogin = (googleData) => {
        console.log("GOOGLE DATA: ", googleData)
        //puts profile details in object
        // const profile = response.profileObj
        //example of profile obj
        // {
        //     email: 'jose.e.lozano.jr@gmail.com',
        //     familyName: 'Lozano',
        //     givenName: 'Jose'
        //     googleId: 123456678,
        //     imageUrl: 'imgUrl.com',
        //     name: 'Jose Lozano'
        // }
        // console.log('current user profile obj', profile)
        //make AJAX call to verify user in the db
        //Sample fetch request that needs to be integrated to this function
        // const handleLogin = async googleData => {
            const res = fetch("/api/v1/auth/google", {
                method: "POST",
                body: JSON.stringify({
                token: googleData.tokenId
              }),
              headers: {
                "Content-Type": "application/json"
              }
            })
            .then((res) => res.json())
            .then((response) => {
                //replace with your email before npm start or change App.js thi.state.verified to equal true.
                //Changing the state will keep you from logging in everytime
                if (googleData.email === response.email) {
                    this.props.callBack(profile);
                } else {
                    this.setState({promptLogIn: true})
                }
            })
            // store returned user somehow
            // console.log(res)
        //   }

    }

    render() {
        if (this.state.promptLogIn === false) {
            return (
                <div className='SSO'>
                    <h1 className='title1SSO'>Transition Tracker</h1>
                    <GoogleLogin
                        clientId={"854591671315-j148rl3knd8t3j4tig9p3qhdpht4da91.apps.googleusercontent.com"}
                        buttonText="Log in with Google"
                        onSuccess={this.handleLogin}
                        onFailure={this.handleLogin}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            )
        } else {
            return (
                <div className='SSO'>
                    <div className='title2SSO'>
                        <h1>Transition Tracker</h1>
                        <h2>Unauthorized User. Please Sign in with verified user credentials</h2>
                    </div>
                    <GoogleLogin
                        clientId={"854591671315-j148rl3knd8t3j4tig9p3qhdpht4da91.apps.googleusercontent.com"}
                        buttonText="Log in with Google"
                        onSuccess={this.handleLogin}
                        onFailure={this.handleLogin}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            )
        }
    }
}
