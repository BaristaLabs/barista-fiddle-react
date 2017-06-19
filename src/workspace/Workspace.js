import React, { Component } from 'react';
import { CommandBar, ContextualMenuItemType } from 'office-ui-fabric-react/lib/CommandBar';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
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

        this.appBarItems = [
            {
                icon: 'SidePanel',
                onClick: this.toggleSidebar,
            },
            {
                name: "Barista Fiddle",
                style: {
                    fontSize: "21px"
                },
                className: 'ms-fontColor-white'
            },
            {
                name: "Eval",
                icon: 'Play',
                onClick: this.brewPackage,
            },
            {
                key: "debug",
                name: "Debug",
                onClick: this.debugPackage,
                iconProps: {
                    className: "fa fa-bug"
                }
            },
            {
                itemType: "Divider",
                disabled: true
            },
            {
                key: "tidyUp",
                name: "Tidy Up",
                onClick: this.tidyUp,
                iconProps: {
                    className: "fa fa-align-left"
                }
            },
        ]


        this.appBarFarItems = [
            {
                key: "showKeyboardShortcuts",
                title: "Keyboard Shortcuts",
                onClick: this.showKeyboardShortcuts,
                iconProps: {
                    className: "fa fa-keyboard-o"
                }
            },
            {
                icon: 'settings',
                title: "Settings",
                onClick: this.showSettings,
            }
        ];

    };

    onUpdateCode(newCode) {
        this.setState({
            code: newCode
        });
    }

    brewPackage() {
    }

    debugPackage() {
    }

    tidyUp() {
    }

    showKeyboardShortcuts() {
    }

    showSettings() {
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
            <div id="main">
                <CommandBar
                    className="fiddle-command-bar"
                    isSearchBoxVisible={false}
                    items={this.appBarItems}
                    farItems={this.appBarFarItems}
                />
                <div id="workspace">
                    <SplitPane defaultSize="0" split="vertical"
                        className="left-sidebar"
                        minSize={300}
                        maxSize={500}
                        size={this.state.sidebarSize}
                        onChange={this.updateSidebarSize}
                    >
                        <div className="left-sidebar-body ms-bgColor-neutralLighter ms-fontColor-black">
                            <Pivot>
                                <PivotItem id="history" linkText='History' itemIcon='History'>
                                    <div style={{ height: "100%" }}>Pivot #1</div>
                                </PivotItem>
                                <PivotItem linkText='Collections' itemIcon='ShowResults'>
                                    <div>
                                        <Collections />
                                    </div>
                                </PivotItem>
                            </Pivot>
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