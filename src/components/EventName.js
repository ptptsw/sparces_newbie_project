import React, {Component} from 'react';
import {connect} from 'react-redux';

class EventName extends Component {
    constructor(props){
        super(props);
        this.state={
            eventname: '',
        }
        console.log(this.props.eventname);
    }

    render(){
        return(
            <form>
                <input
                    placeholder="Event Name"
                    value={this.state.eventname}
                    onChange={function(e){
                        this.setState({eventname : e.target.value})
                        this.props.onType(this.state.eventname);
                    }.bind(this)}
                    name="eventname"
                />
            </form>
        );
    }
}

export default EventName;