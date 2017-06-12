import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Dock from'react-dock';
import SplitPane from './split-pane/SplitPane.js';

import Codemirror from './codemirror/Codemirror.js';
import 'codemirror/addon/lint/lint.js';
import 'codemirror/addon/lint/javascript-lint.js';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/comment-fold.js';
import 'codemirror/addon/search/search.js';
import 'codemirror/addon/search/searchcursor.js';
import 'codemirror/addon/search/match-highlighter.js';
import 'codemirror/addon/comment/comment.js';
import 'codemirror/addon/scroll/simplescrollbars.js';
import 'codemirror/addon/scroll/annotatescrollbar.js';
import 'codemirror/addon/selection/active-line.js';
import 'codemirror/addon/dialog/dialog.js';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/tern/tern.js';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';

import 'acorn/dist/acorn.js';
import 'acorn/dist/acorn_loose.js';
import 'acorn/dist/walk.js';

import 'tern/lib/signal.js';
import 'tern/lib/tern.js';
import 'tern/lib/def.js';
import 'tern/lib/infer.js';
import 'tern/lib/comment.js';

import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/tern/tern.css';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/theme/neat.css'
import './Workspace.css'

class Workspace extends Component {
    constructor() {
        super();

        this.state = {
            dockIsVisible: false,
            code: "",
            readOnly: false
        };

        this.updateCode = this.updateCode.bind(this);
    }

    componentDidMount() {
        console.log(this.refs.editor);
    }

    updateCode(newCode) {
        this.setState({
            code: newCode
        });
        console.log(this.state);
    }

    render() {
        const options = {
            lineNumbers: true,
            viewportMargin: Infinity,
            mode: { name: "javascript", json: false },
            theme: "neat",
            indentUnit: 4,
            foldGutter: true,
            scrollbarStyle: "overlay",
            gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"],
            lint: {
                options: {
                    strict: "implied",
                    esversion: 6,
                    expr: true,
                    globals: {
                        "require": false,
                        "console": false
                    }
                }
            },
            highlightSelectionMatches: { showToken: /\w/ },
            styleActiveLine: true,
            extraKeys: {
                "Ctrl-Enter": function (cm) {
                    //$scope.evaluateScript($scope.tab);
                },
                "Ctrl-Shift-Enter": function (cm) {
                    //$scope.debugScript();
                },
                "Ctrl-Space": function (cm) {
                    //$scope.tab.__tern.complete(cm);
                },
                "Shift-Ctrl-C": function (cm) {
                    if (!cm.somethingSelected())
                        return;

                    var selection = cm.listSelections()[0];
                    cm.toggleComment(selection.head, selection.anchor, { blockCommentStart: "/*", blockCommentEnd: "*/", lineComment: "//" });
                },
                "Ctrl-/": function (cm) {
                    if (!cm.somethingSelected())
                        return;

                    var selection = cm.listSelections()[0];
                    if (selection.head.line !== selection.anchor.line)
                        cm.blockComment(selection.head, selection.anchor, { blockCommentStart: "/*", blockCommentEnd: "*/" });
                    else
                        cm.lineComment(selection.head, selection.anchor, { lineComment: "//" });
                },
                "Shift-Ctrl-/": function (cm) {
                    if (!cm.somethingSelected())
                        return;

                    var selection = cm.listSelections()[0];
                    cm.uncomment(selection.head, selection.anchor, { blockCommentStart: "/*", blockCommentEnd: "*/" });
                },
                "Ctrl-K Ctrl-D": function (cm) {
                    //$scope.tidyUp($scope.tab);
                },
                "Ctrl-I": function (cm) {
                    //$scope.tab.__tern.showType(cm);
                },
                "Ctrl-O": function (cm) {
                    //$scope.tab.__tern.showDocs(cm);
                },
                "Alt-.": function (cm) {
                    //$scope.tab.__tern.jumpToDef(cm);
                },
                "Alt-,": function (cm) {
                    //$scope.tab.__tern.jumpBack(cm);
                },
                "Ctrl-Q": function (cm) {
                    //$scope.tab.__tern.rename(cm);
                },
                "Ctrl-.": function (cm) {
                    //$scope.tab.__tern.selectName(cm);
                }
            }
        };

        return (
            <div>
                <AppBar
                    title="Barista Fiddle"
                    onLeftIconButtonTouchTap={() => this.setState({ dockIsVisible: !this.state.dockIsVisible})}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
                <Dock position='left' isVisible={this.state.isVisible}>
                    <div onClick={() => this.setState({ dockIsVisible: !this.state.dockIsVisible })}>X</div>
                </Dock>
                <div id="workspace">
                    <SplitPane defaultSize="50%" minSize={250} split="vertical">
                        <Codemirror ref="editor" value={this.state.code} onChange={this.updateCode} options={options} autoFocus={true} workspace={this} />
                        <div />
                    </SplitPane>
                </div>
            </div>
        );
    }
}

export default Workspace