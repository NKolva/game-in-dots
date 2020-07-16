import React, { Component } from 'react'

import { connect } from 'react-redux';

import classes from './Box.module.css';

class Box extends Component {
    constructor(props){
        super(props);

        this.state = {
            updatedId: null,
            boxColor: null
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.updatedId !== prevProps.id) {
            if(this.props.id === this.props.randomValue) {
                this.setState({updatedId: this.props.id})
                this.setState({boxColor: classes.BoxBlue})
            } 
            if (this.props.id === this.props.randomValue && 
                this.state.boxColor === classes.BoxBlue &&
                this.state.boxColor !== classes.BoxGreen) {
                setTimeout(() => {
                    this.setState({boxColor: classes.BoxRed})
                }, 900) //props.gameMode to set time
            }
        }
    }

    checkBoxId = () => {
        console.log('Box value: ', this.props.id + ' : ' + this.props.randomValue)
        if(this.props.id === this.props.randomValue) {
            this.props.array[this.props.id].isClicked = true;
            this.props.user.push({id: this.props.id});
            this.setState({boxColor: classes.BoxGreen})
        } 
        // else if (this.props.id !== this.props.randomValue) {
        //     this.setState({boxColor: classes.BoxRed})
        //     console.log('Not valid id');
        // }
    }

    render(){
        
        return(
            <div className={classes.Box} onClick={this.checkBoxId}>
                <div className={this.state.boxColor}>
                    {/* {this.state.updatedId} */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.leaderData.user
    }
}

export default connect(mapStateToProps, null)(Box);