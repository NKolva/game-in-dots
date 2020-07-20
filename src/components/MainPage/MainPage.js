import React, { Component } from 'react';
import Box from '../Box/Box';
import LeaderBoard from '../LeaderBoard/LeaderBoard';
import { connect } from 'react-redux';
import array5 from '../array5';
import array10 from '../array10';
import array15 from '../array15';

import classes from './MainPage.module.css';

class MainPage extends Component {
    constructor(props){
      super(props);
  
      this.state = {
        randomValue: [],
        timer: null,
        startGame: true,
        easyMode: 2000,
        normalMode: 1000,
        hardMode: 900,
        userName: '',
        winner: '',
        gameMode: '',
        gameArray: [],
        boxSize: null
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if(this.state.randomValue.isClicked === false){
        this.props.computer.push({id: this.state.randomValue.id});
      }

      if(prevState && 
         prevState.winner !== prevState.userName &&
         prevState.winner !== 'Win' &&
         prevState.winner !== 'Computer Win'){
        if(this.props.user.length === 10 ) {
          clearInterval(this.state.timer);
          this.setState({winner: this.state.userName + 'Win'});
        } else if (this.props.computer.length === 10) {
          clearInterval(this.state.timer);
          this.setState({winner: 'Computer Win'});
        }
      }

      if(prevState.gameMode !== 'easyMode' && 
         prevState.gameArray !== array5 &&
         prevState.boxSize !== classes.easyMode) {
        if(this.state.gameMode === 'easyMode'){
          this.setState({gameArray: array5});
          this.setState({boxSize: classes.easyMode})
        } 
      }

      if(prevState.gameMode !== 'normalMode' && 
         prevState.gameArray !== array10 &&
         prevState.boxSize !== classes.normalMode) {
        if(this.state.gameMode === 'normalMode'){
          this.setState({gameArray: array10});
          this.setState({boxSize: classes.normalMode})
        } 
      }

      if(prevState.gameMode !== 'hardMode' && 
         prevState.gameArray !== array15 && 
         prevState.boxSize !== classes.hardMode) {
        if(this.state.gameMode === 'hardMode'){
          this.setState({gameArray: array15});
          this.setState({boxSize: classes.hardMode})
        } 
      }

      console.log(this.state.randomValue)
    }

    startInterval = () => {
      this.setState({startGame: !this.state.startGame});

      if(this.state.startGame === true && this.state.userName){
        this.setState({timer: setInterval(() => {
          const randomId = this.state.gameArray[Math.floor(Math.random() * this.state.gameArray.length)];
          this.setState({randomValue: randomId});
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
                  <option value='DEFAULT' disabled> 
                      Pick game mode 
                  </option>
                  <option value='easyMode'> Easy mode </option>
                  <option value='normalMode'>  Normal mode </option>
                  <option value='hardMode'>  Hard mode </option>
              </select>
              <input 
                  className={classes.InputName} 
                  placeholder='Enter your name'
                  onChange={event => this.onChangeInputHandler(event)}/>
              <button 
                  className={classes.ButtonPlay} 
                  onClick={this.startInterval}>
                    {this.state.startGame && this.state.userName ? 'PLAY' : 'PLAY AGAIN'}
              </button>
            </div>
            <div className={classes.WinnerName}>{ this.state.winner }</div>
                <div className={classes.Box25}>
                    {this.state.gameArray.map(res => {
                        return <Box 
                                    key={res.id}
                                    id={res.id}
                                    isClicked={res.isClicked}
                                    randomValue={this.state.randomValue.id}
                                    boxSize={this.state.boxSize}
                                    array={this.state.gameArray}/>
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