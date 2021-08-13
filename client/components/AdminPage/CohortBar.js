import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/fontawesome-free-solid'

class CohortBar extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            changing_cohort: false,
            action: "add",    // Can be "add" or "remove"
            selected_cohort: ''
        }

        this.add_cohort = this.add_cohort.bind(this);
        this.remove_cohort = this.remove_cohort.bind(this);
        this.selected_cohort = this.selected_cohort.bind(this);
    }

    make_post(body, URI="/api/update"){

        const res = fetch( URI , {
            method: "POST",
            body: JSON.stringify( body ),
            headers: {
            "Content-Type": "application/json"
            }
        })
        .then( (res) => { return res.json(); })
        .then( (data) => { console.log("RESPONSE: ", JSON.stringify( data ) ) })
    }

    add_cohort () {
        console.log("STATE: ", this.state)
        this.setState( {changing_cohort: !this.state.changing_cohort, action: "add"} );

        if( this.state.changing_cohort){
            let payload = {}
            if(  this.state.action=="add"  ){
                console.log('adding a cohort');
                payload = {
                    "collection_name": 'admins',
                    "json_query": {_id:this.props.current_user._id },
                    "new_values": {$push: { cohorts: this.state.selected_cohort } }
                }
            }
            if(  this.state.action=="remove"){
                console.log('removing a cohort', this.state.selected_cohort );
                payload = {
                    "collection_name": 'admins',
                    "json_query": {_id:this.props.current_user._id },
                    //"new_values": {$pull: { cohorts: {$in: [this.state.selected_cohort] } } }
                    "new_values": {$pull: { cohorts:this.state.selected_cohort } }
                }
            }
            this.make_post(payload)

            this.props.change_cohort(this.state.selected_cohort, 1, this.state.action )
        }
    }

    remove_cohort () {
        console.log('removing a cohort');
        this.setState({changing_cohort: !this.state.changing_cohort, action: "remove"});

        const payload = {
            "collection_name": 'admins',
            "json_query": {_id:this.props.current_user._id },
            "new_values": {$push: { cohorts: this.state.selected_cohort } }
        }
        //this.make_post(payload)
        this.props.change_cohort(this.state.selected_cohort, 1, true )
    }

    selected_cohort (e) {
        this.setState({selected_cohort: e.target.value});
    }


    render () {
        return (
        <aside className={"cohort-bar"}>
            <div className={"cohort-bar-control-box"}>
                <div className={"cohort-bar-minus-box"}>
                    <FontAwesomeIcon onClick={this.remove_cohort} className={'cohort-minus'} icon={faMinus} />
                    <span>{this.state.changing_cohort ? "Cancel":"Remove Cohort"}</span>
                </div>
                <div className={"cohort-bar-add-box"}>
                    <FontAwesomeIcon onClick={this.add_cohort} className={'cohort-plus'} icon={faPlus} />
                    <span>{this.state.changing_cohort ? ((this.state.action=="add") ? "Save New Cohort":"Remove Cohort"):"Add Cohort"}</span>
                </div>
            </div>
            {this.state.changing_cohort === true &&
            <form
            onSubmit={this.selected_cohort}
            className={"cohort-bar-form"}
            onChange={this.selected_cohort}
            >
                <input type="text" className={'cohort-bar-input'}  placeholder="Enter Cohort" minlength="2" required></input>
            </form>}
            <div className={"cohort-bar-title-box"}>
                <h1 className={"cohort-bar-title"}>Current Cohorts:</h1>
                <ul className={"cohort-bar-list"}>
                    {this.props.cohortList.map((item, index)=>{
                        return (
                            <li key={`Cohort-${item}-${index}`}
                            className={"cohort-bar-list-item"}
                            id={item}
                            onClick={(e)=>{
                                this.props.change_cohort(e.target.textContent, e.target.id);
                                this.props.change_page('Admin-Cohort-Profile');
                                e.preventDefault();
                                }}>
                                {"MCSP-"+item}
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
