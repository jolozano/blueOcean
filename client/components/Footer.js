import React from 'react';

class Footer extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <footer className={"footer"}>
                <button onClick={this.props.change_page} className={"new-student-button"}>Add Student</button>
                <div className={"copyright"}>©Copyright 2021 Danny's Angels</div>
            </footer>
        )
    }
}

export default Footer;