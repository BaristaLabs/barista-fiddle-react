import React, { Component } from 'react';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { Nav } from 'office-ui-fabric-react/lib/Nav';
import Collections from '../collections/Collections.js';

import "./aside.css";

class Aside extends Component {
    constructor(props) {
        super(props);

        this.commandBarItems = [
            {
                icon: 'ShowResults',
                title: "Collections",
                onClick: this.showCollections,
            },
            {
                icon: 'History',
                title: "History",
                onClick: this.showHistory,
            },
        ]
    }
    render() {
        return (
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
                <CommandBar
                    className="fiddle-command-bar"
                    isSearchBoxVisible={false}
                    items={this.appBarItems}
                    farItems={this.appBarFarItems}
                />
            </div>
        )
    }
}

export default Aside