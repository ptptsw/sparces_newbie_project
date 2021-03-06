import React from 'react'
import { withRouter } from 'react-router-dom';
import { DateRangePicker, DatePicker } from 'rsuite';
import styles from '../css/firstpage.css';
import 'rsuite/dist/styles/rsuite-default.css';
import styled from 'styled-components';
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
  width : 400px;
  height: 400px;
  padding : 15px;
  margin : 0 auto;
  box-shadow : 10px 10px 10px grey;
  background-color: white;

`;

const ContainerBox = styled.div`
  width : 80%;
  height: 100%;
  padding : 15px;
  margin : 0 auto;

`;

const Containerdate = styled.div`
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
    font-family: 'Bitter', serif;
    background-color : white;
`;

const Title2 = styled.div`
    font-size : 20px;
    width : 100%;
    margin : 0 auto;
    text-align : left;
    color : #2C3947;
    font-family: 'Bitter', serif;
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

const ContainerElement = styled.div`
width : 100%;
height: 30%;
padding : 15px;
margin : 0 auto;
margin-bottom : 10px;
background-color : white;

`;

class Firstpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventname: '',
            firstpage: true,
            startTime: '',
            EndTime: '',
            DateRange: ''
        };
        this.goToDate = this.goToDate.bind(this);
        this.setStartTime = this.setStartTime.bind(this);
        this.setEndTime = this.setEndTime.bind(this);
        this.setDate = this.setDate.bind(this);
        this.sendData = this.sendData.bind(this);

    }
    goToDate = (e) => {
        //e.preventDefault();
        const eventname = {
            eventname: this.state.eventname
        }
        this.setState({ firstpage: false });
        console.log(eventname)
        fetch('http://ssal.sparcs.org:50912', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(eventname)
        })
            .then(res => res.json())
            .then(data => console.log(data));
    }

    sendData = () => {
        const basicInfo = {
            startTime: this.state.startTime,
            EndTime: this.state.EndTime,
            DateRange: this.state.DateRange,
            eventname: this.state.eventname
        }
        fetch('http://ssal.sparcs.org:50912/datetime', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(basicInfo)
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .then(this.props.history.push(`/event/${this.state.eventname}`));
    }

    setStartTime(_time) {
        _time = _time.getHours();
        //(h*60*60*1000)
        //_time.setTime(_time.getTime()+60*60*1000);
        this.setState({ startTime: _time });
        console.log(_time);
    }

    setEndTime(_time) {
        _time = _time.getHours();
        this.setState({ EndTime: _time });
        console.log(_time);
    }

    setDate(_datearray) {
        console.log(_datearray);
        //date.setTime( date.getTime() + days * 86400000 );
        //_datearray[0].setTime(_datearray[0].getTime()+ 864000);
        //console.log(_datearray[0]);
        this.setState({ DateRange: _datearray });
        console.log(_datearray);
    }


    render() {
        const firstpage = this.state.firstpage;
        let box = null;
        if (firstpage) {
            box =
                <Main>
                    <Container>
                        <Title>Create Event</Title>
                        <Form>
                            <Input
                                placeholder="Event Name"
                                value={this.state.eventname}
                                onChange={function (e) {
                                    this.setState({ eventname: e.target.value })
                                }.bind(this)}
                                name="eventname"
                            />
                            <StyledButton type="submit" onClick={this.goToDate}>Start</StyledButton>
                        </Form>

                    </Container>
                </Main>
        } else {
            box = <Main>
               		 <ContainerBox>
                   		 <Containerdate> 
                        		<ContainerElement> 
                            			<Title2>Set Date</Title2> 
                            			<DateRangePicker className={styles.date} placeholder="Select Date Range" onOk={this.setDate} />
                       			 </ContainerElement>
                       		 	<ContainerElement>
                            			<Title2>Set Time</Title2> 
                            			<p>From</p>
                           			 <DatePicker
                                			format="HH"
                                			ranges={[]}
                               				 onOk={this.setStartTime}
                                			className={styles.datepicker}
                            			/>
                           			 <p>To</p>
                           			 <DatePicker
                                			format="HH"
                                			ranges={[]}
                                			onOk={this.setEndTime}
                               				 className={styles.datepicker}
                           			 />
                        		</ContainerElement>
                        	<StyledButton type="submit" onClick={this.sendData}>Create Event</StyledButton>
                   	 </Containerdate>
               	 </ContainerBox>
            </Main>;
        }


        return (
            <AppContainer>
                <HeaderContainer>When2Meet</HeaderContainer>
                {box}
            </AppContainer>
        )
    }
}

export default withRouter(Firstpage);
