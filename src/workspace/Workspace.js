import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';
import SplitPane from '../split-pane/SplitPane.js';
import JSEditor from './jsEditor/';
import Collections from './collections/Collections.js';

//Workspace Styles
import './Workspace.css'

class Workspace extends Component {
    constructor() {
        super();

        this.state = {
            dockIsVisible: false,
            code: "",
            readOnly: false
        };

        this.onUpdateCode = this.onUpdateCode.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.updateSidebarSize = this.updateSidebarSize.bind(this);
    }

    onUpdateCode(newCode) {
        this.setState({
            code: newCode
        });
    }

    toggleSidebar() {

        if (this.state.sidebarSize) {
            this.setState({
                sidebarSize: 0,
                sidebarPrevSize: this.state.sidebarSize
            });
        } else {
            this.setState({
                sidebarSize: this.state.sidebarPrevSize || 300
            });
        }
    }

    updateSidebarSize(size) {
        this.setState({
            sidebarSize: size
        });
    }

    render() {
        return (
            <div>
                {/*<Toolbar className="nav-bar">
                    <ToolbarGroup firstChild={true}>
                         <IconButton iconClassName="sidebar-toggle-button-icon" />
                        <ToolbarTitle text="Barista Fiddle" />
                        <ToolbarSeparator />
                    </ToolbarGroup>
                </Toolbar>*/}
                <AppBar
                    title="Barista Fiddle"
                    onLeftIconButtonTouchTap={this.toggleSidebar}
                    iconClassNameLeft="sidebar-toggle-button-icon"
                    style={{ zIndex: 0 }}
                >
                </AppBar>
                <div id="workspace">
                    <SplitPane defaultSize="0" split="vertical"
                        className="left-sidebar"
                        minSize={300}
                        maxSize={500}
                        size={this.state.sidebarSize}
                        onChange={this.updateSidebarSize}
                    >
                        <div>
                            <Tabs>
                                <Tab label="History">
                                </Tab>
                                <Tab label="Collections">
                                    <Collections />
                                </Tab>
                            </Tabs>
                        </div>
                        <SplitPane defaultSize="50%" minSize={250} split="vertical">
                            <JSEditor code={this.state.code} onUpdateCode={this.onUpdateCode} />
                            <div />
                        </SplitPane>
                    </SplitPane>
                </div>
            </div>
        );
    }
}

export default Workspace