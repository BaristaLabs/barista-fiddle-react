import React, { Component } from 'react';
import { Fabric } from 'office-ui-fabric-react';
import { createTheme, loadTheme } from 'office-ui-fabric-react/lib/Styling'

import Workspace from './workspace/Workspace.js';

import  'font-awesome/css/font-awesome.css';
import 'office-ui-fabric-react/dist/css/fabric.css';
import './App.css';

const greenTheme = createTheme({
  palette: {
    themePrimary: 'black',
    themeDark: 'white',
    themeDarkAlt: 'white',

    neutralPrimary: 'white',
    neutralPrimaryAlt: 'black',
    neutralLight: '#333',
    neutralLighter: 'black',
    neutralLighterAlt: '#ccc',

    neutralDark: 'white'
  }
});


class App extends Component {
  render() {
    console.log(greenTheme);
    loadTheme(greenTheme);
    return (
      <Fabric>
        <Workspace />
      </Fabric>
    );
  }
}

export default App;
