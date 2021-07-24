import React from 'react';

class Footer extends React.Component {
    constructor () {
        super();
    }

    render () {
        return (
            <footer className={"footer"}>
                <button className={"new-cohort-button"}>Create Cohort</button>
            </footer>
        )
    }
}

export default Footer;