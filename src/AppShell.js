import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';

import SplitPane from './split-pane/SplitPane.js';
import Codemirror from './codemirror/Codemirror.js';

import './AppShell.css'

class AppShell extends Component {
    render() {
        const options = {
            lineNumbers: true,
            viewportMargin: Infinity
        };

        return (
            <div>
                <AppBar
                    title="Barista Fiddle"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
                <div id="app-shell">
                    <SplitPane defaultSize="50%" minSize={250} split="vertical">
                        <Codemirror options={options} />
                        <div />
                    </SplitPane>
                </div>
            </div>
        );
    }
}

export default AppShell