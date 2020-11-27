import React, { Component } from 'react'
import axios from 'axios';
import {withRouter} from 'react-router-dom';


class Firstpage extends React.Component{
    goToDate =() => {
        console.log(this.props.history);
        this.props.history.push('/date');
    }

    constructor(props){
        super(props);
        this.state={
            eventname : ''
        }
    }

    // handleOnClick(){
    //     axios.post('/', {
    //         eventname : this.state.eventname
    //     }).then(function(response){
    //         console.log(response)
    //     })
    //     .catch(function(error){
    //         console.log(error);
    //     })
    // }

    render(){
        return(
            <div>
                <form>
                    <input
                        placeholder="Event Name"
                        value={this.state.eventname}
                        onChange={function(e){
                            this.setState({eventname : e.target.value})
                        }.bind(this)}
                        name="eventname"
                    />
                    <button type="submit" onClick={this.goToDate}>go</button>
                </form>
            </div>
        )
    }
}

export default withRouter(Firstpage);