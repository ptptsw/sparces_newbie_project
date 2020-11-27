import {createStore} from 'redux';

export default createStore(function(state, action){
    if(state===undefined){
        return {eventname: '', date : ''};
    }
    if(action.type==='TYPE_EVENT'){
        console.log(action.eventname)
        return {...state, eventname : action.eventname}
    }else if (action.type === "SET_DATE"){
        console.log(action.date)
        return {...state, date : action.date}
    }
    return state;
})