import React, { Component } from "react";
import Banner from './Banner';
import Footer from './Footer';
import CohortBar from './AdminPage/CohortBar';
import CohortProfile from './AdminPage/CohortProfile';
import StudentProfile from './AdminPage/StudentProfile';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected_student: 0, // ID of student selected
      selected_cohort: '', // name of the cohort selected
      current_page: 'Admin-Home'    
    };

    this.change_cohort = this.change_cohort.bind(this);
  }

  change_student(event){
    // Callback for child component to call when a student name is clicked on
    // in the CohortBar component
    const new_id = Number.parseInt( event.target.value );
    if(typeof(new_id)==Number) this.setState({selected_student:new_id});
    event.preventDefault();
  }

  change_cohort(cohort_name) {
    this.setState({selected_cohort: cohort_name});
  }

  change_page (page) {
    this.setState({current_page:page})
  }



  render() {
    let cohortList = [{name: 'MCSP-07'},{name: 'MCSP-08'},{name: 'MCSP-09'},{name: 'MCSP-10'},{name: 'MCSP-11'}]
    let studentList = 
    [
      {
      firstName: 'Tony',
      lastName: 'Robbins',
      cohort: 'MCSP-07',
      email: 'tonyrobbins@gmail.com',
      gender: 'male',
      terminalLeave: 'Aug 6',
      etsDate: 'August 20, 2021',
      etsCountDown: '20 days',
      phoneNumber: '523-423-2551',
      maritalStatus: 'Single',
      deliverables: ['Complete capstone', 'CIF', 'Clear barracks'],
      completedTasks: ['SFL TAP courses'],
      currentPhase: 1,
      selfieURL: 'https://i.pinimg.com/originals/35/5b/f7/355bf7c6116d655b605cbecf568223cc.jpg'
    },
    {
      firstName: 'Johnny',
      lastName: 'Cash',
      cohort: 'MCSP-07',
      email: 'cash@gmail.com',
      gender: 'male',
      terminalLeave: 'Aug 6',
      etsDate: 'August 20, 2021',
      etsCountDown: '20 days',
      phoneNumber: '523-423-2551',
      maritalStatus: 'Single',
      deliverables: ['Complete capstone', 'CIF', 'Clear barracks'],
      completedTasks: ['SFL TAP courses'],
      currentPhase: 1,
      selfieURL: 'https://i.pinimg.com/originals/35/5b/f7/355bf7c6116d655b605cbecf568223cc.jpg'
    },
    {
      firstName: 'Shawn',
      lastName: 'West',
      cohort: 'MCSP-07',
      email: 'cash@gmail.com',
      gender: 'male',
      terminalLeave: 'Aug 6',
      etsDate: 'August 20, 2021',
      etsCountDown: '20 days',
      phoneNumber: '523-423-2551',
      maritalStatus: 'Single',
      deliverables: ['Complete capstone', 'CIF', 'Clear barracks'],
      completedTasks: ['SFL TAP courses'],
      currentPhase: 1,
      selfieURL: 'https://i.pinimg.com/originals/35/5b/f7/355bf7c6116d655b605cbecf568223cc.jpg'
    },
    {
      firstName: 'Suzie',
      lastName: 'Q',
      cohort: 'MCSP-07',
      email: 'Suzie@hotmail.com',
      gender: 'male',
      terminalLeave: 'Aug 6',
      etsDate: 'August 20, 2021',
      etsCountDown: '20 days',
      phoneNumber: '523-423-2551',
      maritalStatus: 'Single',
      deliverables: ['Complete capstone', 'CIF', 'Clear barracks'],
      completedTasks: ['SFL TAP courses'],
      currentPhase: 1,
      selfieURL: 'https://i.pinimg.com/originals/35/5b/f7/355bf7c6116d655b605cbecf568223cc.jpg'
    }
  ];

    return (
      <div className={"wrapper"}>
        <CohortBar 
        change_page={()=>{this.change_page("Admin-Cohort-Profile")}}
        cohortList={cohortList}
        change_cohort={this.change_cohort}
        />
        <section className={'main-content'}>
            <Banner />
            {this.state.current_page === 'Admin-Student-Profile' && 
            <StudentProfile studentID={ this.state.selected_student } />}
            {this.state.current_page === 'Admin-Cohort-Profile' && 
            <CohortProfile 
            cohortList={cohortList}
            selected_cohort={this.state.selected_cohort}
            />}
            <Footer  change_page={()=>{this.change_page('Admin-Student-Profile')}}/>
        </section>
      </div>
    )
  }
}
