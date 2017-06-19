import React, { Component } from 'react';
import { Fabric, Customizer } from 'office-ui-fabric-react';
import { createTheme, loadTheme } from 'office-ui-fabric-react/lib/Styling'

import Workspace from './workspace/Workspace.js';

import 'office-ui-fabric-react/dist/css/fabric.css';
import './App.css';

const greenTheme = createTheme({
  palette: {
    themePrimary: 'red',
    themeSecondary: 'green',
    themeDarkAlt: 'darkGreen',
    themeDark: 'black',
    neutralLighter: 'black',
    infoBackground: 'blue'
  },
  semanticColors: {
    bodyBackground: 'black'
  }
});

class App extends Component {
  render() {
    return (
      <Fabric>
        <Customizer settings={{ theme: greenTheme }}>
          <Workspace />
        </Customizer>
      </Fabric>
    );
  }
}

export default App;
