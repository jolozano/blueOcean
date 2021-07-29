import React, { Component } from "react";
import CohortBar from './CohortBar';
import Banner from './Banner';
import StudentProfile from './StudentProfile';
import Footer from './Footer';
import CohortProfile from './CohortProfile';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: "Admin-Home" 
    };

    this.changePage = this.changePage.bind(this);
  }

  changePage (page) {
    this.setState({currentPage:page})
    console.log('page is', page)
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

// 1. First Name
// 2. Last name
// 3. Cohort
// 4. ets date
// 5. ets countdown
// 6. current duty station and unit
// 7. personal email
// 8. phone number
// 9. marital status
// 10. terminal leave (if applicable what date do you start)

    return (
      <div className={"wrapper"}>
        <CohortBar 
        changePage={()=>{this.changePage("Admin-Cohort-Profile")}}
        cohortList={cohortList}
        />
        <section className={'main-content'}>
            <Banner />
            {this.state.currentPage === 'Admin-Cohort-Profile' && <CohortProfile />}
            {this.state.currentPage === 'Admin-Student-Profile' && <StudentProfile mockData={mockData} />}
            <Footer changePage={()=>{this.changePage("Admin-Student-Profile")}} />
        </section>
      </div>
    ) 
  }
}
