var React = require('react');
var moment = require('moment');
var PropTypes= require('prop-types');
var createReactClass = require('create-react-class');

var TimePicker = createReactClass({
	propTypes: {
		defaultValue: PropTypes.string,
		onChange: PropTypes.func,
		name: PropTypes.string,
		beginLimit: PropTypes.string,
		endLimit: PropTypes.string,
		step: PropTypes.number
	},

	isEarlierThanEndLimit: function(timeValue, endLimit, lastValue) {
		var timeValueIsEarlier = moment(timeValue, 'h:mmA').diff(moment(endLimit, 'h:mmA')) < 0
		var timeValueIsLaterThanLastValue = lastValue === undefined ? true : moment(lastValue, 'h:mmA').diff(moment(timeValue, 'h:mmA')) < 0
		return timeValueIsEarlier && timeValueIsLaterThanLastValue;
	},

	render () {
		var timeValue = this.props.beginLimit || "12:00AM";
		var lastValue;
    var endLimit = this.props.endLimit || "11:59PM";
		var step = this.props.step || 15;

		var options = [];
		options.push(<option key={timeValue} value={timeValue}>{timeValue}</option>);

    while ( this.isEarlierThanEndLimit(timeValue, endLimit, lastValue) ) {
			lastValue = timeValue;
			console.log(timeValue, moment(timeValue, 'h:mmA').diff(moment(endLimit, 'h:mmA'), 'minutes'));
      timeValue = moment(timeValue, 'h:mmA').add(step, 'minutes').format('h:mmA');
      options.push(<option key={timeValue} value={timeValue}>{timeValue}</option>)
    }
    return(
      <select defaultValue={this.props.defaultValue} onChange={this.props.onChange} name={this.props.name}>
        {options}
      </select>
    )
	}
});

export default TimePicker;





