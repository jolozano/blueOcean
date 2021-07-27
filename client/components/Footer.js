import React from 'react';

class Footer extends React.Component {
    constructor () {
        super();
    }

    render () {
        return (
            <footer className={"footer"}>
                <button className={"new-cohort-button"}>Create Cohort</button>
                <div className={"copyright"}>©Copyright 2021 Danny's Angels</div>
            </footer>
        )
    }
}

export default Footer;