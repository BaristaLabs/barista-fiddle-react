import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import SplitPane from './split-pane/SplitPane.js';
import Codemirror from './codemirror/Codemirror.js';

import './Workspace.css'

class Workspace extends Component {
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
                <div id="workspace">
                    <SplitPane defaultSize="50%" split="vertical">
                        <Codemirror options={options} />
                        <div />
                    </SplitPane>
                </div>
            </div>
        );
    }
}

export default Workspace