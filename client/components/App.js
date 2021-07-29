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
      selected_student: 0,
      currentPage: 'Admin-Home'    // ID of student selected
    };
  }

  change_student(event){
    // Callback for child componet to call when a student name is clicked on
    // in the PhaseBar componet
    const new_id = Number.parseInt( event.target.value );
    if(typeof(new_id)==Number) this.setState({selected_student:new_id});
    event.preventDefault();
  }

  changePage (page) {
    this.setState({currentPage:page})
  }

  render() {

    const mockData = {
      firstName: 'Tony',
      middleInitial: 'A',
      lastName: 'Robbins',
      cohort: 'MCSP-07',
      email: 'tonyrobbins@gmail.com',
      etsDate: 'August 20, 2021',
      etsCountDown: '20 days',
      deliverables: ['Complete capstone', 'CIF', 'Clear barracks'],
      completedTasks: ['SFL TAP courses'],
      currentPhase: 1,
      selfieURL: 'https://i.pinimg.com/originals/35/5b/f7/355bf7c6116d655b605cbecf568223cc.jpg'
    };

    let cohortList = [{name: 'MCSP-07'},{name: 'MCSP-08'},{name: 'MCSP-09'},{name: 'MCSP-10'},{name: 'MCSP-11'}]

    return (
      <div className={"wrapper"}>
        <CohortBar 
        changePage={()=>{this.changePage("Admin-Cohort-Profile")}}
        cohortList={cohortList}
        />
        <section className={'main-content'}>
            <Banner />
            {this.state.currentPage === 'Admin-Student-Profile' && 
            <StudentProfile  mockData={mockData} studentID={ this.state.selected_student } />}
            {this.state.currentPage === 'Admin-Cohort-Profile' && <CohortProfile />}
            <Footer  changePage={()=>{this.changePage('Admin-Student-Profile')}}/>
        </section>
      </div>
    )
  }
}
