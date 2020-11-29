import ScheduleSelector from 'react-schedule-selector';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import styled from 'styled-components';
import { Checkbox } from 'antd';

const StyledButton = styled.button`
    margin: 0 auto;
    margin-top : 15px;
    width : 100%;
    background-color: #0D2840;
    color : white;
    text-align : center;
    padding : 5px;
    padding-top : 10px;
    padding-bottom: 10px;
    height : 40px;
    line-height : 20px;
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
  font-weigth : 700;
  color : white;
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
  padding : 15px;
  margin : 0 auto;
  box-shadow : 10px 10px 10px grey;
  background-color: white;
  border : 1px solid black;
  margin-bottom : 10px;

`;

const Container_Box = styled.div`
  width : 80%;
  height: 100%;
  padding : 15px;
  margin : 0 auto;

`;

const Container_date = styled.div`
  width : 90%;
  height: 30%;
  padding : 15px;
  box-shadow : 10px 10px 10px grey;
  margin : 0 auto;
  margin-bottom : 10px;
  background-color : white;

`;

const Form = styled.div`
        width : 80%;
        padding : 15px;
        margin : 0 auto;
        margin-Bottom : 15px;
        color : #2C3947;
        background-color : white;
`;

const Title = styled.div`
    font-size : 30px;
    width : 80%;
    margin : 0 auto;
    margin-Top : 70px;
    margin-Bottom : 15px;
    text-align : center;
    color : #2C3947;
    background-color : white;
`;

const Title_2 = styled.div`
    font-size : 20px;
    width : 100%;
    margin : 0 auto;
    text-align : left;
    color : #2C3947;
    background-color : white;
    border-bottom : 2px solid grey;
    margin-bottom : 8px;
`;

const Input = styled.input.attrs({
    required: true
})
    `
    border: 2px solid black ;
    padding : 10px;
    width : 100%;
    text-align: left;
`;

const Container_Element = styled.div`
width : 100%;
height: 30%;
padding : 15px;
margin : 0 auto;
margin-bottom : 10px;
background-color : white;

`;

const Column1 = styled.div`
    width : 70%;
    float : left;
    padding :3px;
    border : 1px solid red;
`;

const Column2 = styled.div`
    width: 30%;
    float : left;
    padding :3x;
    border : 1px solid red;
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
    }

    componentDidMount() {
        const eventname = this.props.match.params.eventname;
        const nickname = this.props.match.params.nickname;
        // fetch(`http://localhost:3001/geteventinfo/${eventname}/${nickname}`)
        //     .then(res => res.json())
        //     .then(data => this.setState({
        //         minTime: data.eventStartTime,
        //         maxTime: data.eventEndTime,
        //         startDate: data.eventDateRange[0],
        //         endDate: data.eventDateRange[1]
        //     }));
        Promise.all([
            fetch(`http://localhost:3001/geteventinfo/${eventname}/${nickname}`),
            fetch(`http://localhost:3001/getavailable/${eventname}/${nickname}`)
        ]).then(([res1, res2]) => {
            return Promise.all([res1.json(), res2.json()])
        })
            .then(([res1, res2]) => {
                console.log(res1);
                this.setState({
                    minTime: res1.eventStartTime,
                    maxTime: res1.eventEndTime,
                    startDate: res1.eventDateRange[0],
                    endDate: res1.eventDateRange[1]
                })
            });

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
        fetch(`http://localhost:3001/available/${eventname}/${nickname}`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(available)
        })
            .then(res => res.json())
            .then(data => console.log(data));
    }

    render() {
        const { match, location, history } = this.props;
        //console.log(match.params.eventname);
        return (
            <AppContainer>
                <HeaderContainer>When2Meet</HeaderContainer>
                <Main>
                    <Column1>
                        <Container>
                            <p>Sharelike : </p>
                            <Input label="ShareLink" placeholder="This is ShareLink" />
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