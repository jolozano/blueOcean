import React from 'react';

// db.get ( "" )
const students = [
    {
        firstName: 'Tony',
        lastName: 'Robbins',
        currentPhase: 1,
        etsDate: 'August 20, 2021',
        deliverables: ['Complete capstone', 'CIF', 'Clear barracks'],
        completedTasks: ['SFL TAP courses'],
        selfieURL: 'https://www.irishtimes.com/polopoly_fs/1.4097152.1574880860!/image/image.jpg_gen/derivatives/ratio_1x1_w1200/image.jpg'
    },
    {
        firstName: 'Tony',
        lastName: 'Robbins',
        currentPhase: 1,
        etsDate: 'August 20, 2021',
        deliverables: ['Complete capstone', 'CIF', 'Clear barracks'],
        completedTasks: ['SFL TAP courses'],
        selfieURL: 'https://www.irishtimes.com/polopoly_fs/1.4097152.1574880860!/image/image.jpg_gen/derivatives/ratio_1x1_w1200/image.jpg'
    }
]


class PhaseBar extends React.Component {
    constructor(){
        super();
        this.state = {}
    }

    getStudents(admin_id){
        // Primary method to make a GET all students assigned to admin
        fetch( '/api/search/history' )
            .then((response) => response.json())
            .then((data) => {
                if(data) this.setState({ history: data[0] });
                else alert("Sorry, I couldn't get your students...");
            } );
    }

    render () {
        return (
        <aside className={"phase-bar"}>
            <div className={"phase-box"}>
                <div className={"phase-title"}>
                    <h1>Phase 1 (180 days out)</h1>
                </div>
                <div className={"phase-box-content"}>
                    <ol className={"student-phase-list"}>
                        <li className={"student-phase-list-item"}>Johnny Appleseed</li>
                        <li className={"student-phase-list-item"}>Will Smith</li>
                        <li className={"student-phase-list-item"}>Johnny Appleseed</li>
                        <li className={"student-phase-list-item"}>Will Smith</li>
                        <li className={"student-phase-list-item"}>Johnny Appleseed</li>
                        <li className={"student-phase-list-item"}>Will Smith</li>
                    </ol>
                </div>
            </div>
            <div className={"phase-box"}>
            <div className={"phase-title"}>
                    <h1>Phase 2 (150 days out)</h1>
                </div>
                <div className={"phase-box-content"}>
                    <ol className={"student-phase-list"}>
                        <li className={"student-phase-list-item"}>Johnny Appleseed</li>
                        <li className={"student-phase-list-item"}>Will Smith</li>
                    </ol>
                </div>
            </div>
            <div className={"phase-box"}>
            <div className={"phase-title"}>
                    <h1>Phase 3 (120 days out)</h1>
                </div>
                <div className={"phase-box-content"}>
                    <ol className={"student-phase-list"}>
                        <li className={"student-phase-list-item"}>Wayne Gretzsky</li>
                        <li className={"student-phase-list-item"}>Nicolas Cage</li>
                    </ol>
                </div>
            </div>
            <div className={"phase-box"}>
            <div className={"phase-title"}>
                    <h1>Phase 4 (90 days out)</h1>
                </div>
                <div className={"phase-box-content"}>
                    <ol className={"student-phase-list"}>

                    </ol>
                </div>
            </div>
            <div className={"phase-box"}>
            <div className={"phase-title"}>
                    <h1>Phase 5 (60 days out)</h1>
                </div>
                <div className={"phase-box-content"}>
                    <ol className={"student-phase-list"}>
                        <li className={"student-phase-list-item"}>Michael Jordan</li>
                    </ol>
                </div>
            </div>
            <div className={"phase-box"}>
            <div className={"phase-title"}>
                    <h1>Phase 6 (30 days out)</h1>
                </div>
                <div className={"phase-box-content"}>
                    <ol className={"student-phase-list"}>
                        <li className={"student-phase-list-item"}>Christian Bale</li>
                        <li className={"student-phase-list-item"}>Madonna</li>
                        <li className={"student-phase-list-item"}>Sherlock Holmes</li>
                    </ol>
                </div>
            </div>
        </aside>
        )
    }
}

export default PhaseBar;
