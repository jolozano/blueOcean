import React from 'react';

class StudentProfile extends React.Component {
    // Detail page of a student
    constructor (props) {
        super()
        this.state = {
            selected_student: 10    // ID of student selected
        }
    }

    render () {
        let mockData = this.props.mockData;
        return (
            <div className={"student-profile"}>
                <table className={"student-profile-table"}>
                    <tbody>
                        <tr>    
                            <td>First Name:</td>
                            <td>Last Name:</td>
                        </tr>
                        <tr>
                            <td>John</td>
                            <td>Wayne</td>
                        </tr>
                        <tr>
                            <td>Cohort:</td>
                            <td>Email Address:</td>
                        </tr>
                        <tr>
                            <td>MCSP-07</td>
                            <td>TonyRobbins@gmail.com</td>
                        </tr>
                        <tr>
                            <td>Gender</td>
                            <td>Terminal Leave</td>
                        </tr>
                        <tr>
                            <td>Male</td>
                            <td>August 1</td>
                        </tr>
                        <tr>
                            <td>ETS Date:</td>
                            <td>ETS Countdown:</td>
                        </tr>
                        <tr>
                            <td>August 13th, 2021</td>
                            <td>20 Days</td>
                        </tr>
                        <tr>
                            <td>Phone Number:</td>
                            <td>
                                Marital Status:
                            </td>
                        </tr>
                        <tr>
                            <td>503-423-3212</td>
                            <td>Single</td>
                        </tr>
                        <tr>
                            <td>Deliverables</td>
                            <td>Completed Tasks</td>
                        </tr>
                        <tr>
                            <td>
                                <ul>
                                    <li>Phase 2 Medical</li>
                                    <li>CIF Turn in</li>
                                </ul>
                            </td>
                            <td>
                                <ul>
                                <li>Phase 1 Medical</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                    </table>
                    <div className={"student-profile-img-canvas"}>
                        <img className={"student-profile-img"} src={'https://cdn.britannica.com/82/136182-050-6BB308B7/John-Wayne.jpg'} width="80%" height="75%"></img>
                    </div>
            </div>
        )
    }
}

export default StudentProfile;
