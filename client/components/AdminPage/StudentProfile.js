import React from 'react';

class StudentProfile extends React.Component {
    // Detail page of a student
    constructor (props) {
        super()
        this.state = {
            selected_student: 10,    // ID of student selected
            pii: {
                "first_name": "Etienne",
                "last_name": "Valance",
                "email": "evalance0@wikispaces.com",
                "gender": "Genderfluid",
                "ets_date": "10/13/2020",
                "current_unit": "5 Blue Bill Park Place",
                "phone_number": "928-698-5462",
                "marital_staus": "Lone Wolf",
                "terminal_date": "3/26/2021",
                "student_img": "http://dummyimage.com/174x100.png/5fa2dd/ffffff",
                ...props.single_student
            },
        }
    }

    render () {
        let studentData = this.state.pii;
        return (
            <div className={"student-profile"}>
                <table className={"student-profile-table"}>
                    <tbody>
                        <tr>
                            <td>First Name:</td>
                            <td>Last Name:</td>
                        </tr>
                        <tr>
                            <td>{studentData.first_name}</td>
                            <td>{studentData.last_name}</td>
                        </tr>
                        <tr>
                            <td>Cohort:</td>
                            <td>Email Address:</td>
                        </tr>
                        <tr>
                            <td>MCSP-07</td>
                            <td>{studentData.email}</td>
                        </tr>
                        <tr>
                            <td>Gender</td>
                            <td>Terminal Leave</td>
                        </tr>
                        <tr>
                            <td>{studentData.gender}</td>
                            <td>{studentData.terminal_date}</td>
                        </tr>
                        <tr>
                            <td>ETS Date:</td>
                            <td>ETS Countdown:</td>
                        </tr>
                        <tr>
                            <td>{studentData.ets_date}</td>
                            <td>20 Days</td>
                        </tr>
                        <tr>
                            <td>Phone Number:</td>
                            <td>Marital Status:</td>
                        </tr>
                        <tr>
                            <td>{studentData.phone_number}</td>
                            <td>{studentData.marital_staus}</td>
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
                        <img className={"student-profile-img"} src={studentData.student_img} width="80%" height="75%"></img>
                    </div>
            </div>
        )
    }
}

export default StudentProfile;
