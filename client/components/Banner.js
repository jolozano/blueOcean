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
        return (
            <header className={"banner"}>
                <h1 className={"banner-title"}>Transition Tracker App</h1>
                <div className={'logout-button-container'}>
                    <GoogleLogout
                        clientId="854591671315-j148rl3knd8t3j4tig9p3qhdpht4da91.apps.googleusercontent.com"
                        buttonText="Logout"
                        onLogoutSuccess={this.logOut}>
                    </GoogleLogout>
                </div>
            </header>
        )
    }
}

export default Banner;