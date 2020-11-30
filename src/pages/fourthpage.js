import ScheduleSelector from 'react-schedule-selector';
import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import styled from 'styled-components';
import { Checkbox } from 'antd';
import '../css/font.css';

const StyledButton = styled.button`
    margin: 0 auto;
    margin-top : 15px;
    width : 100%;
    background-color: #0D2840;
    color : white;
    text-align : center;
    padding : 5px;
    padding-top : 10px;
    padding-bottom : 10px;
    height : 30px;
    line-height : 10px;
`;

const AppContainer = styled.div`
  &,
  & * {
    box-sizing: border-box;
  }
  background-color: "gray"
  height: 100%;

`;

const HeaderContainer = styled.header`
  padding: 20px;
  font-size: 30px;
  font-weigth : 900;
  color : #FDC959;
  font-family: 'Bitter', serif;
  background-color: #0D2840;
`;

const Main = styled.div`
  width : 100%;
  height: 100%;
  padding: 15px;
  padding-top : 100px;
  background-color:rgba(78,125,166, 0.15); 
`;

const Container = styled.div`
  width : 70%;
  height: 90%;
  padding : 20px;
  margin : 0 auto;
  box-shadow : 10px 10px 10px grey;
  background-color: white;
  margin-bottom : 10px;

`;



const Column1 = styled.div`
    width : 70%;
    float : left;
    padding :5px;
`;

const Column2 = styled.div`
    width: 30%;
    float : left;
    padding :5x;
`;

class FourthPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schedule: [],
            numDays: 0,
            minTime: 0,
            maxTime: 0,
            startDate: null,
            endDate: null,
        }
        this.handleStartDate = this.handleStartDate.bind(this);
        this.SendAvailable = this.SendAvailable.bind(this);
	this.copyToClipboard= this.copyToClipboard.bind(this);
    }

    componentDidMount() {
        const eventname = this.props.match.params.eventname;
        const nickname = this.props.match.params.nickname;
         fetch(`http://ssal.sparcs.org:50912/geteventinfo/${eventname}/${nickname}`)
             .then(res => res.json())
             .then(data => this.setState({
                 minTime: data.eventStartTime,
                 maxTime: data.eventEndTime,
                 startDate: data.eventDateRange[0],
                 endDate: data.eventDateRange[1]
             }));
        //Promise.all([
            //fetch(`http://172.17.0.12:3000/geteventinfo/${eventname}/${nickname}`),
            //fetch(`http://172.17.0.12:3000/getavailable/${eventname}/${nickname}`)
        //]).then(([res1, res2]) => {
          //  return Promise.all([res1.json(), res2.json()])
       // })
          //  .then(([res1, res2]) => {
            //    console.log(res1);
              //  this.setState({
                //    minTime: res1.eventStartTime,
                  //  maxTime: res1.eventEndTime,
                   // startDate: res1.eventDateRange[0],
                   // endDate: res1.eventDateRange[1]
               // })
           // });

    }



    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    handleChange = newSchedule => {
        this.setState({ schedule: newSchedule })
    }
    handleStartDate = e => {
        var _startDate = this.state.startDate;
        _startDate = _startDate.setDate(_startDate.getDate() + 1);
        this.setState({ startDate: _startDate })
    }

    SendAvailable = (e) => {
        const available = {
            available: this.state.schedule
        }
        console.log(available);
        const eventname = this.props.match.params.eventname;
        const nickname = this.props.match.params.nickname;
        fetch(`http://ssal.sparcs.org:50912/available/${eventname}/${nickname}`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(available)
        })
            .then(res => res.json())
            .then(data => console.log(data));
    }

	copyToClipboard = (e) => {
		        this.textArea.select();
		        document.execCommand('copy');
		        e.target.focus();
		    }

    render() {
       	const eventname = this.props.match.params.eventname;
	const url = `http://ssal.sparcs.org:40398/event/${eventname}`;
	const tstyle={
		 width: "100%",
		padding: "1px",
		border: "solid 2px #1E90FF",
		fontSize: "16px",
	        }
        return (
            <AppContainer>
                <HeaderContainer>When2Meet</HeaderContainer>
                <Main>
                    <Column1>
                        <Container>
                            	<p>Sharelike : </p>
                            	<textarea ref={(textarea)=>this.textArea = textarea} value={url} style={tstyle} readonly />
		                <button onClick={this.copyToClipboard}>Copy</button>
                        </Container>
                        <Container>
                            <ScheduleSelector
                                selection={this.state.schedule}
                                numDays={3}
                                minTime={this.state.minTime}
                                maxTime={this.state.maxTime}
                                hourlyChunks={1}
                                onChange={this.handleChange}
                                startDate={this.state.startDate}
                            />
                            <StyledButton type="submit" onClick={this.SendAvailable}>save</StyledButton>
                        </Container>
                    </Column1>
                    <Column2>
                        <Container>
                            <Checkbox>Group Availablity</Checkbox>
                        </Container>
                    </Column2>
                </Main>

            </AppContainer>
        )
    }
}

export default withRouter(FourthPage);
