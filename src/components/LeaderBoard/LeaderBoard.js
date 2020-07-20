import React, { Component } from 'react';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';

import classes from './LeaderBoard.module.css';

class LeaderBoard extends Component {
    constructor(props){
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        this.props.getWinnersData();
    }

    render() {
        return(
            <div className={classes.LeaderBoard}>
                <div className={classes.LeaderTitle}>Leader Board</div>
                <div className={classes.Leaders}>
                    {this.props.winnersData.sort(() => { return -1 }).slice(0, 4).map(res => {
                        return (
                            <div className={classes.LeadersList} key={res.id}>
                                <span className={classes.LeadersInfo}>{res.winner}</span>
                                <span className={classes.LeadersInfo}>{res.date}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    };
}

const mapStateToPRops = state => {
    return {
        winnersData: state.leaderData.winnersData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getWinnersData: () => dispatch(actions.fetchWinnersData()),
    }
}

export default connect(mapStateToPRops, mapDispatchToProps)(LeaderBoard);