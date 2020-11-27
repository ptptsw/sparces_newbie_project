export const CREATE_EVENT="CREATE_EVENT";
export const TYPE_EVENT="TYPE_EVENT";
export const SET_DATE="SET_DATE";

export function createEvent(){
    return{
        type : CREATE_EVENT,
    }
}

export function typeEvent(){
    return {
        type : TYPE_EVENT
    }
}

export function setDate(){
    return{
        type : SET_DATE
    }
}