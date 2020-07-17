import React, { Component } from 'react';
import Box from '../Box/Box';
import LeaderBoard from '../LeaderBoard/LeaderBoard';
import { connect } from 'react-redux';
import array5 from '../array5';

import classes from './MainPage.module.css';

class MainPage extends Component {
    constructor(props){
      super(props);
  
      this.state = {
        color: 'black',
        randomValue: [],
        timer: null,
        startGame: true,
        easyMode: 2000,
        normalMode: 1000,
        hardMode: 900,
        userName: '',
        winner: '',
        gameMode: '',
      }
    }

    componentDidUpdate(prevProps, prevState) {
      console.log('Computer data', this.props.computer);
      if(this.state.randomValue.isClicked === false){
        this.props.computer.push({id: this.state.randomValue.id});
      }

      let winnerTag = 'Win';
      let computerName = 'Computer Win';

      if(prevState && 
         prevState.winner !== prevState.userName &&
         prevState.winner !== winnerTag &&
         prevState.winner !== computerName){
        if(this.props.user.length >= 13 ) {
          clearInterval(this.state.timer);
          this.setState({winner: this.state.userName + winnerTag});
        } else if (this.props.computer.length >= 13) {
          clearInterval(this.state.timer);
          this.setState({winner: computerName});
        }
      }
    }

    startInterval = () => {
      this.setState({startGame: !this.state.startGame});

      if(this.state.startGame === true && this.state.userName){
        this.setState({timer: setInterval(() => {
          const randomId = array5[Math.floor(Math.random() * array5.length)];
          this.setState({randomValue: randomId});
          console.log('Random id: ', this.state.randomValue);
        } , this.state.hardMode)});
          return this.state.timer;
      } else if (this.state.startGame === false) {
        clearInterval(this.state.timer);
      }
    }

    onChangeInputHandler = (event) => {
      this.setState({userName: event.target.value});
    }

    selectValue = (event) => {
      console.log(event.target.value);
      this.setState({gameMode: event.target.value});
    }
  
    render(){
      return (
        <div className={classes.MainPage}>
          <div className={classes.MainPageGame}>
            <div className={classes.GameSettings}>
              <select 
                  defaultValue={'DEFAULT'} 
                  onChange={event => this.selectValue(event)}
                  className={classes.SelectGameMode}>
                  <option 
                      value='DEFAULT' 
                      disabled> 
                      Pick game mode 
                  </option>
                  <option value='easyMode'> 
                      Easy mode 
                  </option>
                  <option value='normalMode'> 
                      Normal mode 
                  </option>
                  <option value='hardMode'> 
                      Hard mode 
                  </option>
              </select>
              <input 
                  className={classes.InputName} 
                  placeholder='Enter your name'
                  onChange={event => this.onChangeInputHandler(event)}/>
              <button 
                  className={classes.ButtonPlay} 
                  onClick={this.startInterval}>
                    {this.state.startGame ? 'PLAY' : 'PLAY AGAIN'}
              </button>
            </div>
            <div>
              { this.state.winner }
            </div>
                <div className={classes.Box25}>
                    {array5.map(res => {
                        return <Box 
                                    key={res.id}
                                    id={res.id}
                                    isClicked={res.isClicked}
                                    randomValue={this.state.randomValue.id}
                                    array={array5}/>
                    })}
            </div>
          </div>
          <div className={classes.MainPageLeader}>
              <LeaderBoard/>
          </div>
        </div>
      );
    }
  }

const mapStateToProps = state => {
  return {
    user: state.leaderData.user,
    computer: state.leaderData.computer
  }
}

export default connect(mapStateToProps, null)(MainPage);