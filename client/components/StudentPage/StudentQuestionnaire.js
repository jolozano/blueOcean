import { getMaxListeners } from 'process';
import React, { Component } from 'react';

class StudentQuestionnaire extends Component {
    constructor(props){
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            gender: "",
            ets_date: "",
            duty_station: "",
            current_unit: "",
            phone_number: "",
            marital_status: "",
            terminal_leave: "",
        }
        this.handleSubmit=this.handleSubmit.bind(this)
    }






firsthandler = (event) => {
    this.setState({
        firstName: event.target.value
    })
}
lasthandler = (event) => {
    this.setState({
        lastName: event.target.value
    })
}
emailhandler = (event) => {
    this.setState({
        email: event.target.value
    })
}
genderhandler = (event) => {
    this.setState({
        gender: event.target.value
    })
}
ets_datehandler = (event) => {
    this.setState({
        ets_date: event.target.value
    })
}
duty_stationhandler = (event) => {
    this.setState({
        duty_station: event.target.value
    })
}
current_unithandler = (event) => {
    this.setState({
        current_unit: event.target.value
    })
}
phone_numberhandler = (event) => {
    this.setState({
        phone_number: event.target.value
    })
}
marital_statushandler = (event) => {
    this.setState({
        marital_status: event.target.value
    })
}
terminal_leavehandler = (event) => {
    this.setState({
        terminal_leave: event.target.value
    })
}

update_form = (event) => {
    const key = event.target.id
    this.state[key] = event.target.value
    e.preventDefault()
}



handleSubmit = (event) => {
    let myRe = new RegExp('[^@]+')
    let username = myRe.exec(this.state.email)
    const res = fetch("/api/addStudent", {
        method: "POST",
        body: JSON.stringify({
            "_id": this.state.email,
            "credentials": {
                "password": null,
                "username": username[0]
            },
            "pii": {
                "first_name": this.state.firstName,
                "last_name": this.state.lastName,
                "email": this.state.email,
                "gender": this.state.gender,
                "ets_date": this.state.ets_date,
                "current_unit": this.state.current_unit,
                "phone_number": this.state.phone_number,
                "marital_staus": this.state.marital_status,
                "terminal_date": this.state.terminal_date,
                "student_img": "http://dummyimage.com/178x100.png/dddddd/000000"
            },
            "tasks": {
                "uncompleted": [],
                "completed": [],
                "current": 55
            },
            "admin_id": "default_admin@nguyen.com",
            "cohort_id": 1
        }),
        headers: {
        "Content-Type": "application/json"
      }
    })
    // alert(`${this.state.firstName} ${this.state.lastName}  Registry Successful`)
    console.log("this.state", this.state);
    this.setState({
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        ets_date: "",
        duty_station: "",
        current_unit: "",
        phone_number: "",
        marital_status: "",
        terminal_leave: "",
    })
 event.preventDefault()

};




render() {
    return (
        <div className={"student-questionnaire-content"}>
                <h1 className={"student-questionnaire-title"}>New Student Registration</h1>
            <form className={"student-questionnaire-form"} onSubmit={this.handleSubmit}>
                <label>FirstName :</label> <input type="text" value={this.state.firstName} onChange={this.firsthandler} placeholder="FirstName..."/><br />
                <label>LastName :</label> <input type="text" value={this.state.lastName} onChange={this.lasthandler} placeholder="LastName..." /><br />
                <label>Email :</label> <input type="email" value={this.state.email} onChange={this.emailhandler} placeholder="Email..." /><br />
                <label>Gender :</label>
                    <select onChange={this.genderhandler} defaultValue="Select Gender">
                        <option defaultValue>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select><br />
                <label>ETS Date :</label> <input type="date" value={this.state.ets_date} onChange={this.ets_datehandler} placeholder="ETS Date.." /><br />
                <label>Current Unit :</label> <input type="text" value={this.state.current_unit} onChange={this.current_unithandler} placeholder="Current Unit..." /><br />
                <label>Duty Station :</label> <input type="text" value={this.state.duty_station} onChange={this.duty_stationhandler} placeholder="Duty Station..."/><br />
                <label>Phone Number :</label> <input type="tel" value={this.state.phone_number} onChange={this.phone_numberhandler} placeholder="Phone Number..."/><br />
                <label>Marital Status :</label>
                    <select onChange={this.marital_status} defaultValue="Select Marital Status">
                        <option defaultValue>Select Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                    </select><br />
                <label>Terminal Leave :</label>
                    <select id="terminal_leave" onChange={this.terminal_leavehandler} defaultValue="Terminal Leave">
                        <option defaultValue>Select Status</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select><br />
                <input className={'student-questionnaire-submit-button'} type="submit" value="submit" />
            </form>
        </div>
        )
    }
}

export default StudentQuestionnaire;

