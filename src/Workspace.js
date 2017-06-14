import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Dock from 'react-dock';
import SplitPane from './split-pane/SplitPane.js';
import CodeMirrorComponent from './codemirror/Codemirror.js';

//Main CodeMirror
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';

//CodeMirror Linting
import jshint from 'jshint';
import 'codemirror/addon/lint/lint.js';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/lint/javascript-lint.js';

import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/comment-fold.js';
import 'codemirror/addon/search/search.js';
import 'codemirror/addon/search/searchcursor.js';
import 'codemirror/addon/search/match-highlighter.js';
import 'codemirror/addon/comment/comment.js';
import 'codemirror/addon/scroll/simplescrollbars.js';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/addon/scroll/annotatescrollbar.js';
import 'codemirror/addon/selection/active-line.js';
import 'codemirror/addon/dialog/dialog.js';
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/tern/tern.js';
import 'codemirror/addon/tern/tern.css';
import ecmaScriptDefs from 'tern/defs/ecmascript.json';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';

//CodeMirror Themes
import 'codemirror/theme/neat.css'

//Workspace Styles
import './Workspace.css'

window.JSHINT = jshint.JSHINT;

class Workspace extends Component {
    constructor() {
        super();

        this.state = {
            dockIsVisible: false,
            code: "",
            readOnly: false
        };

        this.updateCode = this.updateCode.bind(this);
        this.onCursorActivity = this.onCursorActivity.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    componentDidMount() {
        this.ternServer = new CodeMirror.TernServer({
            defs: [ecmaScriptDefs]
        });
    }

    onCursorActivity(cm) {
        this.ternServer.updateArgHints(cm);
    }

    onKeyUp(cm, evt) {

        //Force an auto-complete after "."
        if (evt.keyCode === 190) {
            this.ternServer.complete(cm);
            return;
        }

        var cursorPos = cm.getCursor();
        var line = cm.getLine(cursorPos.line);

        if (line.match(/^.*require\(['|"]$/i)) {
            this.ternServer.complete(cm);
        }
    }

    updateCode(newCode) {
        this.setState({
            code: newCode
        });
        //console.log(this.state);
    }

    render() {
        const options = {
            lineNumbers: true,
            viewportMargin: Infinity,
            matchBrackets: true,
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
                "Ctrl-Space": (cm) => {
                    this.ternServer.complete(cm);
                },
                "Shift-Ctrl-C": (cm) => {
                    if (!cm.somethingSelected())
                        return;

                    var selection = cm.listSelections()[0];
                    cm.toggleComment(selection.head, selection.anchor, { blockCommentStart: "/*", blockCommentEnd: "*/", lineComment: "//" });
                },
                "Ctrl-/": (cm) => {
                    if (!cm.somethingSelected())
                        return;

                    var selection = cm.listSelections()[0];
                    if (selection.head.line !== selection.anchor.line)
                        cm.blockComment(selection.head, selection.anchor, { blockCommentStart: "/*", blockCommentEnd: "*/" });
                    else
                        cm.lineComment(selection.head, selection.anchor, { lineComment: "//" });
                },
                "Shift-Ctrl-/": (cm) => {
                    if (!cm.somethingSelected())
                        return;

                    var selection = cm.listSelections()[0];
                    cm.uncomment(selection.head, selection.anchor, { blockCommentStart: "/*", blockCommentEnd: "*/" });
                },
                "Ctrl-K Ctrl-D": (cm) => {
                    //$scope.tidyUp($scope.tab);
                },
                "Ctrl-I": (cm) => {
                    this.ternServer.showType(cm);
                },
                "Ctrl-O": (cm) => {
                    this.ternServer.showDocs(cm);
                },
                "Alt-.": (cm) => {
                    this.ternServer.jumpToDef(cm);
                },
                "Alt-,": (cm) => {
                    this.ternServer.jumpBack(cm);
                },
                "Ctrl-Q": (cm) => {
                    this.ternServer.rename(cm);
                },
                "Ctrl-.": (cm) => {
                    this.ternServer.selectName(cm);
                }
            }
        };

        return (
            <div>
                <AppBar
                    title="Barista Fiddle"
                    onLeftIconButtonTouchTap={() => this.setState({ dockIsVisible: !this.state.dockIsVisible })}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    style={{ zIndex: 0 }}
                />
                <Dock position='left' isVisible={this.state.isVisible}>
                    <div onClick={() => this.setState({ dockIsVisible: !this.state.dockIsVisible })}>X</div>
                </Dock>
                <div id="workspace">
                    <SplitPane defaultSize="50%" minSize={250} split="vertical">
                        <CodeMirrorComponent ref="editor" value={this.state.code} onChange={this.updateCode} onCursorActivity={this.onCursorActivity} onKeyUp={this.onKeyUp} options={options} autoFocus={true} workspace={this} />
                        <div />
                    </SplitPane>
                </div>
            </div>
        );
    }
}

export default Workspace