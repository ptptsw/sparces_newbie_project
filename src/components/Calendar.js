
import React, { Component } from 'react'
import 'react-dates/initialize';
import { DayPickerSingleDateController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';


 class Calendar extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      focused: true,
      date: props.initialDate,
    };

  
    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.onDayClick = this.onDayClick.bind(this);
  }


  onDayClick(_day ,e){
    this.setState({date : _day});
    console.log(_day);
    this.props.onSet(this.state.date);
  }

  onDateChange(_date) {
    this.setState({ date : _date }, () => this.props.onSet(this.state.date));
    console.log(_date);
    //console.log(this.state.date)
    //this.props.onSet(this.state.date);
  }


  onFocusChange() {
    this.setState({ focused: true });
  
  }

  alertPickedData = () => {
    alert(this.state.date);
  }

  render() {
    const { focused, date } = this.state;

    return (
      <div>
          <DayPickerSingleDateController
          onDayClick={this.onDayClick}
          onDateChange={this.onDateChange}
          onFocusChange={this.onFocusChange}
          focused={focused}
          date={date}
        />
      </div>
    )
  }
}

export default Calendar;