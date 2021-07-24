import React from 'react';

class Banner extends React.Component {
    constructor () {
        super();
    }

    render () {
        return (
            <header className={"banner"}>
                <h1 className={"banner-title"}>Transition App</h1>
            </header>
        ) 
    }
} 

export default Banner;