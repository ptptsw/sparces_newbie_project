import React, {Component} from 'react';
import EventName from '../containers/EventName';

export default class EventNameRoot extends Component {
    render(){
        return(
            <div>
                <h1>EventNameRoot</h1>
                <EventName></EventName>
            </div>
        )
    }
}