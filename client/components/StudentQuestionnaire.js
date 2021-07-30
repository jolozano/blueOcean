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
            duty_station:"",
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
        password: event.target.value
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
        duty_staion: event.target.value
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


handleSubmit = (event) => {
    alert(`${this.state.firstName} ${this.state.lastName}  Registery Successful`)
    console.log(this.state);
    this.setState({
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        ets_date: "",
        duty_station:"",
        current_unit: "",
        phone_number: "",
        marital_status: "",
        terminal_leave: "",
    })
 event.preventDefault()
    
};




render() {
    return (
        <div>

            <form onSubmit={this.handleSubmit}>
                <h1>New Student Registration</h1>
                <label>FirstName :</label> <input type="text" value={this.state.firstName} onChange={this.firsthandler} placeholder="FirstName..." /><br />
                <label>LastName :</label> <input type="text" value={this.state.lastName} onChange={this.lasthandler} placeholder="LastName..." /><br />
                <label>Email :</label> <input type="text" value={this.state.email} onChange={this.emailhandler} placeholder="Email..." /><br />
                <label>Gender :</label><select onChange={this.genderhandler} defaultValue="Select Gender"/>
                    <option defaultValue>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                <label>ETS Date :</label> <input type="text" value={this.state.ets_date} onChange={this.ets_datehandler} placeholder="ETS Date.." /><br />
                <label>Duty Station :</label> <input type="text" value={this.state.duty_station} onChange={this.duty_stationhandler} placeholder="Duty Station..." /><br />
                <label>Current Unit :</label> <input type="text" value={this.state.current_unit} onChange={this.current_unithandler} placeholder="Current Unit..." /><br />
                <label>Phone Number :</label> <input type="integer" value={this.state.phone_number} onChange={this.phone_numberhandler} placeholder="Phone Number..." /><br />
                <label>Marital Status :</label><select onChange={this.marital_status} defaultValue="Select Marital Status"/>
                    <option defaultValue>Select Status</option>
                    <option value="Single">Male</option>
                    <option value="Married">Female</option>
                <label>Terminal Leave :</label><select onChange={this.terminal_leavehandler} defaultValue="Terminal Leave"/>
                    <option defaultValue>Select Status</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                <input type="submit" value="Rigester Now" />
                
            </form>

        </div>
        
        )
    }
}







export default StudentQuestionnaire;

