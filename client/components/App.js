import React, { Component } from "react";
import Banner from './Banner';
import Splash from './Splash';
import Footer from './Footer';
import CohortBar from './AdminPage/CohortBar';
import CohortProfile from './AdminPage/CohortProfile';
import StudentProfile from './AdminPage/StudentProfile';
import StudentQuestionnaire from "./StudentPage/StudentQuestionnaire";
import SignOn from "./LoginPage/SSO";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected_student: 0, // ID of student selected
      selected_cohort_id: 7, // name of the cohort selected
      current_page: 'Admin-Home',
      verified: false,//callbacks for login and logout buttons change this state and render appropriate screen
      cached_students: {}, // Object with key being cohort hum id, and array of students
      students_data:[],
      profile: [], //get profile obj on success of login, after logout it is array with undefined value
      current_user: {_id:"default_admin@nguyen.com", pii:{first_name:"Chris", last_name:"Nguyen"}},
      // cohortList: [{name: 'MCSP-07', num:7},{name: 'MCSP-08', num:8},{name: 'MCSP-09', num:9},{name: 'MCSP-10', num:10},{name: 'MCSP-11', num:11}]
      cohortList: [1,2,3,4,5]
    };
    this.verifyUser = this.verifyUser.bind(this)//passed as props to banner and SSO components
    this.change_cohort = this.change_cohort.bind(this);
  }

  change_student(event){
    // Callback for child component to call when a student name is clicked on
    // in the CohortBar component
    const new_id = Number.parseInt( event.target.value );
    if(typeof(new_id)==Number) this.setState({selected_student:new_id});
    event.preventDefault();
  }

  change_cohort(cohort_name, cohort_id, action ) {
    // this.setState(  {selected_cohort: cohort_name, selected_cohort_id: +cohort_id} );
    // (cohort_name in )
    if( action=="add" ){
      if( !this.state.current_user.cohorts.indexOf(cohort_name)<0 ){
        alert("You are already assigned that user!")
        return
      } else {
        this.state.current_user.cohorts.push( cohort_name )
        alert("New cohort has been created!")
      }
    }
    if( action=="remove" ){
      const index = this.state.current_user.cohorts.indexOf(cohort_name)
      if( index<0 ) {
        alert( "You do not have a cohort assigned by that name!" )
      } else {
        this.state.current_user.cohorts.splice(index, 1)
        alert("Cohort has been removed!")
      }
    }
    this.state.selected_cohort = cohort_name
    this.state.selected_cohort_id = +cohort_id,
    this.students_data = []
    this.update_students()
    this.forceUpdate();
  }

  change_page (page) {
    this.setState({current_page:page})
  }
  //used for log in and log out buttons
  verifyUser(profileObj) {
    this.setState({
      verified: !this.state.verified,
      profile: [profileObj]
    })
  }

  componentDidMount(){
    console.log("Mounting...")
    this.update_user()
    //this.update_students()

  }
  componentWillUnmount() {
    console.log("Unmounting...")
    this.setState( {students_data:[]} )
  }
  componentDidUpdate(){

  }
  update_user(){
    if( !this.state.current_user._id ){
      console.log("Can not update unknown user. Please sign in")
    }
    const URI = `/api/get/admin?id=${this.state.current_user._id}`
    this.make_get(URI, (data)=> {
      this.setState( {current_user:{...data[0]}} )
    } )
  }
  update_students(force=false){
    console.log("Updating student...");
    if(this.state.selected_cohort_id in this.state.cached_students){
      // Used as memoization
      console.log("Memoizing...")
      this.setState( (state) => { return {students_data:this.get_current_students()} } )
      // this.forceUpdate();
      return
    }

    this.make_get(`/api/get/students/${this.state.selected_cohort_id}`, (data) => {
      const temp = { [+this.state.selected_cohort_id] : data}
      this.setState( (state) => { return { cached_students : {...state.cached_students, ...temp}, students_data:data  } }
    )})

    // this.forceUpdate();
  }
  get_current_students( ){
    const temp = this.state.cached_students[ this.state.selected_cohort_id ]
    return (temp) ? temp : [];
  }

  make_get(URI, callBack){
    fetch(URI)
      .then((response) => response.json())
      .then( callBack );
  }

  render() {
    let cohortList = this.state.current_user.cohorts || this.state.cohortList ;
    // let studentList = require('./studentList')//do we need this student list?
    //loggin state for debugging
    console.log("Render State: ", this.state)
    if (this.state.verified) {
      return (
        <div className={"wrapper"}>
          <CohortBar
          change_page={()=>{this.change_page("Admin-Cohort-Profile")}}
          cohortList={cohortList}
          change_cohort={this.change_cohort}
          current_user={this.state.current_user}
          />
          <section className={'main-content'}>
              <Banner callBack={this.verifyUser}/>
              {this.state.current_page === 'Admin-Home' && <Splash />}
              {this.state.current_page === 'Admin-Student-Profile' &&
              <StudentProfile studentID={ this.state.selected_student } />}
              {this.state.current_page === 'Admin-Cohort-Profile' &&
              <CohortProfile
              selected_cohort={this.state.selected_cohort}
              assigned_students={ this.state.students_data }
              />}
              {this.state.current_page === 'Admin-Student-Questionnaire' && <StudentQuestionnaire />}
              <Footer  change_page={()=>{this.change_page('Admin-Student-Questionnaire')}}/>
          </section>
        </div>
      )
    } else {
      return <SignOn callBack={this.verifyUser}/>;
    }

  }
}
