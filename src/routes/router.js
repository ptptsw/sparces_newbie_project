import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import FirstPage from '../pages/firstpage';
import ThirdPage from '../pages/thirdpage';
import FourthPage from '../pages/fourthpage';

class Routes extends React.Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path="/" component={FirstPage}/>
                    <Route exact path="/event/:eventname" component={ThirdPage}/>
                    <Route exact path="/event/:eventname/:nickname" component={FourthPage}/>
                </Switch>
            </Router>
        )
    }
}

export default Routes;
