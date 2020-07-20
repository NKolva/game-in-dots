import React, { Component } from 'react'

import { connect } from 'react-redux';

import classes from './Box.module.css';

class Box extends Component {
    constructor(props){
        super(props);

        this.state = {
            updatedId: null,
            boxColor: null,
            setBox: null
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.updatedId !== prevProps.id) {
            if(this.props.id === this.props.randomValue) {
                this.setState({updatedId: this.props.id})
                this.setState({boxColor: classes.BoxBlue})
            };
            setTimeout(() => {
                if (this.props.id === this.props.randomValue && 
                    this.props.array[this.props.id].isClicked === false) {
                    this.setState({boxColor: classes.BoxRed})
                }
            }, 1400);
        }
    }

    checkBoxId = () => {
        if(this.props.id === this.props.randomValue) {
            this.props.array[this.props.id].isClicked = true;
            this.props.user.push({id: this.props.id});
            this.setState({boxColor: classes.BoxGreen})
        }
    }

    render(){
        
        return(
            <div className={this.props.boxSize} onClick={this.checkBoxId}>
                <div className={this.state.boxColor}>

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