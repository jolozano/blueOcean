import React from 'react';
import StudentProfile from './StudentProfile';

class CohortProfile extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        let student_profiles = [];
        for(let student of this.props.assigned_students) {
            student_profiles.push(<StudentProfile single_student={student.pii} />)
        }

        return (
            <div className={'cohort-profile-content'}>
                <h1 className={'cohort-profile-title'}>{this.props.selected_cohort}</h1>

                {student_profiles}


            </div>
        )
    }
}

export default CohortProfile;
