import React, { Component } from 'react';
import Box from '../Box/Box';
import LeaderBoard from '../LeaderBoard/LeaderBoard';
import { connect } from 'react-redux';
import array1 from '../array';

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
      }
    }

    componentDidUpdate() {
      console.log('Computer data', this.props.computer)
      if(this.props.user.length >= 13){
        alert('User WIN')
        clearInterval(this.state.timer)
      } else if (this.props.computer.length >= 13) {
        alert('Computer WIN')
        clearInterval(this.state.timer)
      }

      if(this.state.randomValue.isClicked === false){
        this.props.computer.push({id: this.state.randomValue.id})
      }
    }

    combineColors = () => {
      if(this.state.color === 'black') {
        this.setState({color: classes.Check1})
      } else {
        setTimeout(() => {this.setState({color: classes.Check2})}, 900)
      }
    }

    startInterval = () => {
      this.setState({startGame: !this.state.startGame})

      if(this.state.startGame === true && this.state.userName){
        this.setState({timer: setInterval(() => {
          const randomId = array1[Math.floor(Math.random() * array1.length)];
          this.setState({randomValue: randomId})
          console.log('Random id: ', this.state.randomValue);
        } , this.state.hardMode)});
          return this.state.timer;
      } else if (this.state.startGame === false) {
        clearInterval(this.state.timer)
      }
    }

    onChangeInputHandler = (event) => {
      this.setState({userName: event.target.value})
    }
  
    render(){
      return (
        <div className={classes.MainPage}>
            <div className={classes.MainPageGame}>
                <div className={classes.GameSettings}>
                    <select 
                        defaultValue={'DEFAULT'} 
                        className={classes.SelectGameMode}>
                        <option 
                            value='DEFAULT' 
                            disabled> 
                            Pick game mode 
                        </option>
                        <option value='1'> 
                            Easy mode 
                        </option>
                        <option value='2'> 
                            Normal mode 
                        </option>
                        <option value='3'> 
                            Hard mode 
                        </option>
                    </select>
                    <input 
                        className={classes.InputName} 
                        placeholder='Enter your name'
                        onChange={(event) => this.onChangeInputHandler(event)}/>
                    <button 
                        className={classes.ButtonPlay} 
                        onClick={this.startInterval}>
                          {this.state.startGame ? 'PLAY' : 'PLAY AGAIN'}
                    </button>
                </div>
                <div 
                    onClick={this.combineColors} 
                    className={this.state.color}>
                        Message here
                </div>
                    <div className={classes.Box25}>
                        {array1.map(res => {
                            return <Box 
                                        key={res.id}
                                        id={res.id}
                                        isClicked={res.isClicked}
                                        randomValue={this.state.randomValue.id}
                                        array={array1}/>
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