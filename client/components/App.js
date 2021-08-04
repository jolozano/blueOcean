import React, { Component } from "react";
import Banner from './Banner';
import Splash from './Splash';
import Footer from './Footer';
import CohortBar from './AdminPage/CohortBar';
import CohortProfile from './AdminPage/CohortProfile';
import StudentProfile from './AdminPage/StudentProfile';
import StudentQuestionnaire from "./StudentQuestionnaire";
import SignOn from "./SSO";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected_student: 0, // ID of student selected
      selected_cohort: '', // name of the cohort selected
      current_page: 'Admin-Home',
      verified: false
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
    let studentList = require('./studentList')
    if (this.state.verified) {
      return (
        <div className={"wrapper"}>
          <CohortBar
          change_page={()=>{this.change_page("Admin-Cohort-Profile")}}
          cohortList={cohortList}
          change_cohort={this.change_cohort}
          />
          <section className={'main-content'}>
              <Banner />
              {this.state.current_page === 'Admin-Home' && <Splash />}
              {this.state.current_page === 'Admin-Student-Profile' && 
              <StudentProfile studentID={ this.state.selected_student } />}
              {this.state.current_page === 'Admin-Cohort-Profile' && 
              <CohortProfile 
              cohortList={cohortList}
              selected_cohort={this.state.selected_cohort}
              />}
              {this.state.current_page === 'Admin-Student-Questionnaire' && <StudentQuestionnaire />}
              <Footer  change_page={()=>{this.change_page('Admin-Student-Questionnaire')}}/>
          </section>
        </div>
      )
    } else {
      return <SignOn/>;
    }

    }
}
