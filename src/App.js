
import { Component } from 'react';
import FirstPage from './pages/firstpage';



class App extends Component {
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
