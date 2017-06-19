import React, { Component } from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
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
            readOnly: false,
            showSettingsModal: false
        };

        this.showSettings = this.showSettings.bind(this);
        this.hideSettings = this.hideSettings.bind(this);
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
        this.setState({
            showSettingsModal: true
        });
    }

    hideSettings() {
        this.setState({
            showSettingsModal: false
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
                <Modal
                    isOpen={this.state.showSettingsModal}
                    onDismiss={this.hideSettings}
                    isBlocking={false}
                    containerClassName='ms-modalExample-container'
                >
                    <div className='ms-modalExample-header'>
                        <span>Lorem Ipsum</span>
                    </div>
                    <div className='ms-modalExample-body'>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lorem nulla, malesuada ut sagittis sit amet, vulputate in leo. Maecenas vulputate congue sapien eu tincidunt. Etiam eu sem turpis. Fusce tempor sagittis nunc, ut interdum ipsum vestibulum non. Proin dolor elit, aliquam eget tincidunt non, vestibulum ut turpis. In hac habitasse platea dictumst. In a odio eget enim porttitor maximus. Aliquam nulla nibh, ullamcorper aliquam placerat eu, viverra et dui. Phasellus ex lectus, maximus in mollis ac, luctus vel eros. Vivamus ultrices, turpis sed malesuada gravida, eros ipsum venenatis elit, et volutpat eros dui et ante. Quisque ultricies mi nec leo ultricies mollis. Vivamus egestas volutpat lacinia. Quisque pharetra eleifend efficitur. </p>
                        <p>Mauris at nunc eget lectus lobortis facilisis et eget magna. Vestibulum venenatis augue sapien, rhoncus faucibus magna semper eget. Proin rutrum libero sagittis sapien aliquet auctor. Suspendisse tristique a magna at facilisis. Duis rhoncus feugiat magna in rutrum. Suspendisse semper, dolor et vestibulum lacinia, nunc felis malesuada ex, nec hendrerit justo ex et massa. Quisque quis mollis nulla. Nam commodo est ornare, rhoncus odio eu, pharetra tellus. Nunc sed velit mi. </p>
                        <p>Sed condimentum ultricies turpis convallis pharetra. Sed sagittis quam pharetra luctus porttitor. Cras vel consequat lectus. Sed nec fringilla urna, a aliquet libero. Aenean sed nisl purus. Vivamus vulputate felis et odio efficitur suscipit. Ut volutpat dictum lectus, ac rutrum massa accumsan at. Sed pharetra auctor finibus. In augue libero, commodo vitae nisi non, sagittis convallis ante. Phasellus malesuada eleifend mollis. Curabitur ultricies leo ac metus venenatis elementum. </p>
                        <p>Aenean egestas quam ut erat commodo blandit. Mauris ante nisl, pellentesque sed venenatis nec, aliquet sit amet enim. Praesent vitae diam non diam aliquet tristique non ut arcu. Pellentesque et ultrices eros. Fusce diam metus, mattis eu luctus nec, facilisis vel erat. Nam a lacus quis tellus gravida euismod. Nulla sed sem eget tortor cursus interdum. Sed vehicula tristique ultricies. Aenean libero purus, mollis quis massa quis, eleifend dictum massa. Fusce eu sapien sit amet odio lacinia placerat. Mauris varius risus sed aliquet cursus. Aenean lectus magna, tincidunt sit amet sodales a, volutpat ac leo. Morbi nisl sapien, tincidunt sit amet mauris quis, sollicitudin auctor est. </p>
                        <p>Nam id mi justo. Nam vehicula vulputate augue, ac pretium enim rutrum ultricies. Sed aliquet accumsan varius. Quisque ac auctor ligula. Fusce fringilla, odio et dignissim iaculis, est lacus ultrices risus, vitae condimentum enim urna eu nunc. In risus est, mattis non suscipit at, mattis ut ante. Maecenas consectetur urna vel erat maximus, non molestie massa consequat. Duis a feugiat nibh. Sed a hendrerit diam, a mattis est. In augue dolor, faucibus vel metus at, convallis rhoncus dui.</p>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Workspace