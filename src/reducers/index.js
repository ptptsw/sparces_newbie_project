import {CREATE_EVENT, SET_DATE, TYPE_EVENT} from '../actions';
import {combineReducers} from 'redux';

const EventInitialState={
    eventname: 'None',
    date: '',
};

const makeEvent = (state = EventInitialState, action) => {
    switch(action.type){
        case CREATE_EVENT:
            return Object.assign({}, state, {
                eventname : state.eventname,
                date : state.date,
                min_time : state.min_time,
                max_time : state.max_time
            });
        case TYPE_EVENT:

        case SET_DATE:
        default:
            return state;
    }
}

export default makeEvent;
