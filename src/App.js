
import EventNameRoot from './components/EventNameRoot'
import moment from 'moment';
import { Component } from 'react';
import CalenderRoot from './components/CalendarRoot';
import FirstPage from './pages/firstpage';
import SecondPage from './pages/secondpage';
import ThirdPage from './pages/thirdpage';



class App extends Component {
  constructor(props){
    super(props);
  }
  // <div>FirstPage</div>
  //       <EventNameRoot/>
  //       <CalenderRoot/>
  //       <button type="submit" onClick={function(){
  //         console.log(this.props.eventname);
  //         console.log(this.props.date);
  //       }.bind(this)}>Create Event</button>
  
  render(){
    return (
      <div className="App">
        <FirstPage></FirstPage>
      </div>
    );
  }
  
}

export default App;
