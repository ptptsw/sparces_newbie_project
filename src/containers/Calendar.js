import { Component } from 'react';
import {connect} from 'react-redux';
import Calendar from "../components/Calendar";

function mapDispatchToProps(dispatch){
    return{
        onSet: function(_setDate){
            console.log(_setDate)
            dispatch({type : 'SET_DATE', date : _setDate})
        }
    }
}

export default connect(null, mapDispatchToProps)(Calendar);