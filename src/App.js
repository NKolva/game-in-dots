import React, { Component } from 'react';
import MainPage from './components/MainPage/MainPage';

import classes from './App.module.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      
    }
  }

  render(){

    return (
      <div className={classes.App}>
        <MainPage/>
      </div>
    );
  }
}

export default App;
