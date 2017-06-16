import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import './Collections.css';

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
    return class SelectableList extends Component {
        static propTypes = {
            children: PropTypes.node.isRequired,
            defaultValue: PropTypes.number.isRequired,
        };

        componentWillMount() {
            this.setState({
                selectedIndex: this.props.defaultValue,
            });
        }

        handleRequestChange = (event, index) => {
            this.setState({
                selectedIndex: index,
            });
        };

        render() {
            return (
                <ComposedComponent
                    value={this.state.selectedIndex}
                    onChange={this.handleRequestChange}
                >
                    {this.props.children}
                </ComposedComponent>
            );
        }
    };
}

SelectableList = wrapState(SelectableList);

class Collections extends Component {
    render() {
        return (
            <div>
                <Toolbar className="collections-toolbar" style={{ height: "30px", backgroundColor: "white" }}>
                    <ToolbarGroup firstChild={true}>
                        <FlatButton label="All" style={{ color: "black" }} />
                        <IconButton iconClassName="sidebar-toggle-button-icon" />
                        <ToolbarSeparator />
                    </ToolbarGroup>
                </Toolbar>
                <SelectableList defaultValue={3}>
                    <ListItem
                        value={1}
                        primaryText="Brendan Lim"
                        nestedItems={[
                            <ListItem
                                value={2}
                                primaryText="Grace Ng"
                            />,
                        ]}
                    />
                    <ListItem
                        value={3}
                        primaryText="Kerem Suer"
                    />
                    <ListItem
                        value={4}
                        primaryText="Eric Hoffman"
                    />
                    <ListItem
                        value={5}
                        primaryText="Raquel Parrado"
                    />
                </SelectableList>
            </div>
        );
    }
}

export default Collections;