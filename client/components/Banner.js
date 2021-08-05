import React, { Component } from "react";
import { GoogleLogout } from 'react-google-login';


class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    logOut = () => {
        this.props.callBack()
    }

    render () {
        console.log('props', this.props)
        return (
            <header className={"banner"}>
                <GoogleLogout
                    clientId="854591671315-j148rl3knd8t3j4tig9p3qhdpht4da91.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={this.logOut}>
                </GoogleLogout>
                <h1 className={"banner-title"}>Transition Tracker App</h1>
            </header>
        )
    }
}

export default Banner;