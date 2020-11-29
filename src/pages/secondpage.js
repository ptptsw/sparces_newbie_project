import React, { Component } from 'react'
import axios from 'axios';
//import 'react-dates/initialize';
//import { DayPickerSingleDateController} from 'react-dates';
import {DateRangePicker, DatePicker} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import ThirdPage from './thirdpage';
//import 'react-dates/lib/css/_datepicker.css';


class SecondPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
          startTime : '',
          EndTime : '',
          DateRange : ''
        };
        this.setStartTime = this.setStartTime.bind(this);
        this.setEndTime = this.setEndTime.bind(this);
        this.setDate = this.setDate.bind(this);
        this.sendData = this.sendData.bind(this);
    }



    sendData=()=>{
        const basicInfo={
            startTime : this.state.startTime,
            EndTime : this.state.EndTime,
            DateRange : this.state.DateRange
        }
        fetch('http://localhost:3001',{
            method : "POST",
            headers:{
                'content-type' : 'application/json'
            },
            body:JSON.stringify(basicInfo)
        })
         .then(res => res.json())
         .then(data => console.log(data));
    }
    
    setStartTime(_time){
        _time=_time.getHours()
        this.setState({startTime : _time});
        console.log(_time);
    }

    setEndTime(_time){
        _time =_time.getHours();
        this.setState({EndTime : _time});
        console.log(_time);
    }

    setDate(_datearray){
        this.setState({DateRange : _datearray});
        console.log(_datearray);
    }
    

    render(){

        return(
            <div>
                <h1>Choose Date!</h1>
                <DateRangePicker placeholder="Select Date Range" onOk={this.setDate}/>
                <h1>Start Time</h1>
                <DatePicker
                    format="HH"
                    ranges={[]}
                    onOk={this.setStartTime}
                />
                <h1>End Time</h1>
                <DatePicker
                    format="HH"
                    ranges={[]}
                    onOk={this.setEndTime}
                />
                <button type="submit" onClick={this.sendData}>Set Date</button>
            </div>
        )
    }
}

export default SecondPage;