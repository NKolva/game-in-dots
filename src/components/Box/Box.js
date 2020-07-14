import React, { Component } from 'react'

import { connect } from 'react-redux';

import classes from './Box.module.css';

class Box extends Component {
    constructor(props){
        super(props);

        this.state = {
            updatedId: null
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.updatedId !== prevProps.id)
            if(this.props.id === this.props.randomValue){
                this.setState({updatedId: this.props.id})
            }
        
    }

    checkBoxId = () => {
        console.log(this.props.id)
        this.props.array[this.props.id].isClicked = true
        this.props.user.push({id: this.props.id})
    }

    render(){
        
        return(
            <div className={classes.Box} onClick={this.checkBoxId}>
                {this.state.updatedId}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.leaderData.user,
        computer: state.leaderData.computer
    }
}

export default connect(mapStateToProps, null)(Box);