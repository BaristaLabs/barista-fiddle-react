import React, { Component } from 'react';
import { Navbar, Nav, NavItem, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import AppBar from 'material-ui/AppBar';
import { Toolbar, ToolbarTitle, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
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
                <Toolbar className="fiddle-nav" style={{ backgroundColor: "black", justifyContent: "inherit" }}>
                    <ToolbarGroup firstChild={true}>
                        <IconButton iconClassName="sidebar-toggle-button-icon" onTouchTap={this.toggleSidebar}></IconButton>
                        <ToolbarTitle text="Barista Fiddle" style={{ color: "white" }} />
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <FlatButton
                            label="Eval"
                            labelPosition="after"
                            icon={<FontIcon className="fa fa-play" style={{ fontSize: "inherit" }} />}
                        />
                    </ToolbarGroup>
                </Toolbar>
                <CommandBar
        className="fiddle-nav2"
          isSearchBoxVisible={ false }
          items={ [ { propertyName: "foo", name: "asdf", value: "bar", icon: 'Add', onClick: this.toggleSidebar, style: { color: 'white' }}, { name: "Barista Fiddle" } ] }
          farItems={ [] }
        />
                <nav className="navbar navbar-default fiddle-nav" role="navigation" style={{ marginBottom: 0, borderRadius: 0 }}>
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#" onTouchTap={this.toggleSidebar}><span style={{ paddingRight: "10px" }}><i className="fa fa-bars"></i></span>Barista Fiddle</a>
                        </div>
                        <form className="navbar-form navbar-left">
                            <div className="btn-group">
                                <div type="button" className="btn btn-default" data-ng-click="evaluateScript(null, true)" data-ng-disable="model.errorCount > 0"><i className="fa fa-play"></i>&nbsp;Eval</div>
                                <div type="button" className="btn btn-default" data-ng-click="debugScript()"><i className="fa fa-bug"></i>&nbsp;Debug</div>
                            </div>
                            <div className="btn-group">
                                <div className="btn btn-default" data-ng-click="tidyUp()"><i className="fa fa-align-left"></i>&nbsp;TidyUp</div>
                            </div>
                        </form>
                        <form className="navbar-form navbar-right">
                            <div className="btn-group">
                                <div className="btn btn-default" data-ng-click="showKeyboardShortcutsDialog()"><i className="fa fa-keyboard-o"></i></div>
                            </div>
                            <div className="btn-group">
                                <div className="btn btn-default" data-ng-click="showGlobalSettingsDialog()"><i className="fa fa-cog"></i></div>
                            </div>
                        </form>
                        <form className="navbar-form navbar-right">
                            <div className="btn-group">
                                <div className="btn btn-default" data-ng-class="{ 'btn-primary': isActiveTabShowingConsole() }" data-ng-click="toggleTabConsole()"><i className="fa fa-terminal"></i></div>
                            </div>
                        </form>
                    </div>
                </nav>
                <nav className="fiddle-nav">
                    <IconButton iconClassName="sidebar-toggle-button-icon" onTouchTap={this.toggleSidebar}></IconButton>
                    <h1>Barista Fiddle</h1>
                    <FlatButton
                        label="Eval"
                        labelPosition="after"
                        icon={<FontIcon className="fa fa-play" style={{ fontSize: "inherit" }} />}
                    />
                </nav>
                <AppBar
                    title="Barista Fiddle"
                    onLeftIconButtonTouchTap={this.toggleSidebar}
                    iconClassNameLeft="sidebar-toggle-button-icon"
                    style={{ zIndex: 0 }}
                >
                    <MenuItem onTouchTap={this.closeLeftNav} value={'/'} primaryText="Home" />
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