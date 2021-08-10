import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/fontawesome-free-solid'

class CohortBar extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            changing_cohort: false,
            selected_cohort: ''
        }

        this.add_cohort = this.add_cohort.bind(this);
        this.remove_cohort = this.remove_cohort.bind(this);
        this.selected_cohort = this.selected_cohort.bind(this);
    }

    add_cohort () {
        console.log('adding a cohort');
        this.setState({changing_cohort: true});
    }

    remove_cohort () {
        console.log('removing a cohort');
        this.setState({changing_cohort: true});
    }

    selected_cohort () {
        this.setState({selected_cohort: e.target.value});
    }


    render () {
        return (
        <aside className={"cohort-bar"}>
            <div className={"cohort-bar-control-box"}>
                <div className={"cohort-bar-minus-box"}>
                    <FontAwesomeIcon onClick={this.remove_cohort} className={'cohort-minus'} icon={faMinus} />
                    <span>Remove Cohort</span>
                </div>
                <div className={"cohort-bar-add-box"}>
                    <FontAwesomeIcon onClick={this.add_cohort} className={'cohort-plus'} icon={faPlus} />
                    <span>Add Cohort</span>
                </div>
            </div>
            {this.state.changing_cohort === true && 
            <form 
            onSubmit={()=>{alert(this.state.selected_cohort)}} 
            className={"cohort-bar-form"}
            onChange={()=>{this.selected_cohort}}
            >
                <input type="text" className={'cohort-bar-input'} placeholder="Enter Cohort"></input>
            </form>}
            <div className={"cohort-bar-title-box"}>
                <h1 className={"cohort-bar-title"}>Current Cohorts:</h1>
                <ul className={"cohort-bar-list"}>
                    {this.props.cohortList.map((item, index)=>{
                        return (
                            <li key={`Cohort-${item.name}-${index}`}
                            className={"cohort-bar-list-item"}
                            id={item.num}
                            onClick={(e)=>{
                                this.props.change_cohort(e.target.textContent, e.target.id);
                                this.props.change_page('Admin-Cohort-Profile');
                                e.preventDefault();
                                }}>
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
