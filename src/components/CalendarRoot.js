import React, {Component} from 'react';
import Calendar from '../containers/Calendar';

export default class CalendarRoot extends Component {
    render(){
        return(
            <div>
                <h1>Calendar</h1>
                <Calendar></Calendar>
            </div>
        )
    }
}