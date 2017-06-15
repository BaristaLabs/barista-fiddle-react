import React, { Component } from 'react';
import './App.css';
import { white, fullBlack } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Workspace from './workspace/Workspace.js';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: fullBlack,
    textColor: white,
  },
  appBar: {
    height: 50,
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Workspace />
      </MuiThemeProvider>
    );
  }
}

export default App;
