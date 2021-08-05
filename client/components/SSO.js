import React, { Component } from "react";
import GoogleLogin from "react-google-login";

export default class SignOn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            promptLogIn: true
        }
    };
    handleLogin = (response) => {
        const profile = response.profileObj
        console.log('profile', profile)
        //make AJAX call to verify user in the db
        if (profile.email === 'jose.e.lozano.jr@gmail.com') {
            this.props.callBack();
            console.log(this.state.promptLogIn)
        } else {
            this.setState({promptLogIn: false})
        }
    }

    render() {
        if (this.state.promptLogIn === false) {
            return (
                <div>
                    <div>
                        <h1>Unauthorized User. Please Sign in with verified user credentials</h1>
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
        } else {
            return (
                <div>
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