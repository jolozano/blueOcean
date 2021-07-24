import React, { Component } from "react";
import PhaseBar from './PhaseBar';
import Banner from './Banner';
import StudentProfile from './StudentProfile';
import Footer from './Footer';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {

    const mockData = {
      firstName: 'Tony',
      lastName: 'Robbins',
      currentPhase: 1,
      etsDate: 'August 20, 2021',
      deliverables: ['Complete capstone', 'CIF', 'Clear barracks'],
      completedTasks: ['SFL TAP courses'],
      selfieURL: 'https://www.irishtimes.com/polopoly_fs/1.4097152.1574880860!/image/image.jpg_gen/derivatives/ratio_1x1_w1200/image.jpg'
    };


    return (
      <div className={"wrapper"}>
        <PhaseBar />
        <section className={'main-content'}>
            <Banner />
            <StudentProfile mockData={mockData} />
            <Footer />
        </section>
      </div>
    ) 
  }
}
