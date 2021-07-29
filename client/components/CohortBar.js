import React from 'react';

class CohortBar extends React.Component {

    constructor (props) {
        super(props);
    }
    render () {
        console.log(this.props.cohortList)
        return (
        <aside className={"cohort-bar"}>
            <div className={"cohort-bar-title-box"}>
                <h1 className={"cohort-bar-title"}>Current Cohorts:</h1>
                <ul className={"cohort-bar-list"}>

                    {this.props.cohortList.map((item)=>{
                        return (
                            <li key={item.id} 
                            className={"cohort-bar-list-item"}
                            onClick={()=>{this.props.changePage('Admin-Cohort-Profile')}}>
                                {item.name}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </aside>
        )
    }
}

export default CohortBar;