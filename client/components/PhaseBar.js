import React from 'react';

class PhaseBar extends React.Component {
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