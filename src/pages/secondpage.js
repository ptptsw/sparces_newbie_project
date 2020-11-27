import React, { Component } from 'react'
import axios from 'axios';
//import 'react-dates/initialize';
//import { DayPickerSingleDateController} from 'react-dates';
import {DateRangePicker, DatePicker} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css'
//import 'react-dates/lib/css/_datepicker.css';


class SecondPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
          focused: true,
          date: props.initialDate,
        };
        this.onDateChange = this.onDateChange.bind(this);
        this.setState= this.setDate.bind(this);
        //this.onFocusChange = this.onFocusChange.bind(this);
    }

    onDateChange(_date) {
        this.setState({ date : _date });
        console.log(_date);
        //console.log(this.state.date)
        //this.props.onSet(this.state.date);
    }

    setDate(_date){
        console.log(_date);
    }
    
    
    //   onFocusChange() {
    //     this.setState({ focused: true });
      
    // }
    // <DayPickerSingleDateController
    //                 onDayClick={this.onDayClick}
    //                 onDateChange={this.onDateChange}
    //                 onFocusChange={this.onFocusChange}
    //                 focused={focused}
    //                 date={date}
    //             />


    render(){
        const { focused, date } = this.state;

        return(
            <div>
                <h1>Choose Date!</h1>
                <DateRangePicker placeholder="Select Date Range" onSelect={this.setDate}/>
                <h1>Start Time</h1>
                <DatePicker
                    format="HH"
                    ranges={[]}
                />
                <h1>End Time</h1>
                <DatePicker
                    format="HH"
                    ranges={[]}
                />
                <button type="submit">Set Date</button>
            </div>
        )
    }
}

export default SecondPage;