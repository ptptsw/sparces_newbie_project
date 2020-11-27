import App from '../App';
import {connect} from 'react-redux';

function mapReduxStateToReactProps(state){
    return{
        date : state.date,
        eventname : state.eventname,
    }
}

export default connect (mapReduxStateToReactProps)(App);