
import { Component } from 'react';
import {connect} from 'react-redux';
import EventName from "../components/EventName";

function mapDispatchToProps(dispatch){
    return{
        onType: function(_eventname){
            dispatch({type : 'TYPE_EVENT', eventname : _eventname})
        }
    }
}

export default connect(null, mapDispatchToProps)(EventName);
// export default class extends Component{
//     render(){
//         return(
//             <EventName onType={function(_eventname){
//                 store.dispatch({type : "TYPE_EVENT", eventname: _eventname})
//             }.bind(this)}></EventName>
//         )
//     }
// }