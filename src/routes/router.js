import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import FirstPage from '../pages/firstpage';
import SecondPage from '../pages/secondpage';

class Routes extends React.Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path="/" component={FirstPage}/>
                    <Route exact path="/date" component={SecondPage}/>
                </Switch>
            </Router>
        )
    }
}

export default Routes;