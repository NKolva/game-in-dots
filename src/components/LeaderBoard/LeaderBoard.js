import React, { Component } from 'react';

import classes from './LeaderBoard.module.css';

class LeaderBoard extends Component {
    constructor(props){
        super(props);

        this.state = {

        }
    }

    render() {
        return(
            <div className={classes.LeaderBoard}>
                <div className={classes.LeaderTitle}>Leader Board</div>

                <div className={classes.Leaders}>
                    <div className={classes.LeadersList}>
                        <span className={classes.LeadersInfo}>User Name</span>
                        <span className={classes.LeadersInfo}>Date and Time</span>
                    </div>
                </div>
            </div>
        );
    };
}

export default LeaderBoard;