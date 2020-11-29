import ScheduleSelector from 'react-schedule-selector';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import styled from 'styled-components';

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
  width:100%;
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
  width : 500px;
  height: 400px;
  padding : 15px;
  margin : 0 auto;
  box-shadow : 10px 10px 10px grey;
  background-color: white;

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


const Input = styled.input.attrs({
    required: true
})
    `
    border: 2px solid black ;
    padding : 10px;
    width : 100%;
    text-align: left;
`;





class ThirdPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: [],
      nickname: '',
      eventname: ''
      //event name 은 withRouter HOC 이용해서 받아오기
    }
    this.SendNickName = this.SendNickName.bind(this);

  }

  // componentDidMount(){
  //   fetch('http://localhost:3001/nickname')
  //   .then(res=>res.json())
  //   .then(data => console.log(data));
  // }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };



  handleChange = newSchedule => {
    this.setState({ schedule: newSchedule })
  }

  SendNickName = (e) => {
    e.preventDefault();
    console.log(this.state.nickname);
    //event에 해당하는 document field 에 eventmember로 있는지 확인 후/ 있으면 그 정보 불러오고 없으면 멤버로 추가하기
    const nickname = {
      nickname: this.state.nickname,
      eventname: this.state.eventname
    }
    console.log(nickname);

    fetch('http://localhost:3001/nickname', {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(nickname)
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .then(this.props.history.push(`/event/${this.state.eventname}/${this.state.nickname}`));
  }

  render() {
    const { match, location, history } = this.props;
    return (
      <AppContainer>
        <HeaderContainer>When2Meet</HeaderContainer>
        <Main>
          <Container>
            <Form>
              <Title>Create NickName</Title>
              <Input
                placeholder="Plese enter your name"
                value={this.state.nickname}
                onChange={function (e) {
                  e.preventDefault();
                  this.setState({ nickname: e.target.value, eventname: match.params.eventname })
                }.bind(this)}
                name="nickname"
              />
              <StyledButton type="submit" onClick={this.SendNickName}>LogIn</StyledButton>
            </Form>
          </Container>

        </Main>
      </AppContainer>
    )
  }
}

export default withRouter(ThirdPage); 