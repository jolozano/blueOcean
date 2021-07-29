import React from 'react';

class StudentProfile extends React.Component {
    // Detail page of a student
    constructor (props) {
        super()
        this.state = {
            selected_student = 10    // ID of student selected
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
                            <td>{mockData.firstName}</td>
                            <td>{mockData.lastName}</td>
                        </tr>
                        <tr>
                            <td>Cohort:</td>
                            <td>Email Address:</td>
                        </tr>
                        <tr>
                            <td>MCSP-07</td>
                            <td>Tony65@gmail.com</td>
                        </tr>
                        <tr>
                            <td>ETS Date:</td>
                            <td>ETS Countdown:</td>
                        </tr>
                        <tr>
                            <td>{mockData.etsDate}</td>
                            <td>20 Days</td>657
                        </tr>
                        <tr>
                            <td>Deliverables:</td>
                            <td>
                                Completed Tasks:
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <ul>
                                    {mockData.deliverables.map((item)=>{
                                        return <li key={item.id} >{item} </li>
                                    })}
                                </ul>
                            </td>
                            <td>
                                <ul>
                                    {mockData.completedTasks.map((item)=>{
                                        return <li key={item.id} >{item} </li>
                                    })}
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                    </table>
                    <div className={"student-profile-img-canvas"}>
                        <img className={"student-profile-img"} src={mockData.selfieURL} width="80%" height="80%"></img>
                    </div>
            </div>
        )
    }
}

export default StudentProfile;
