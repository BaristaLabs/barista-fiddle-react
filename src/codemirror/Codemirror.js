import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';

function normalizeLineEndings(str) {
	if (!str) return str;
	return str.replace(/\r\n|\r/g, '\n');
}

class CodeMirror extends Component {
	static propTypes = {
		autoFocus: PropTypes.bool,
		className: PropTypes.any,
		codeMirrorInstance: PropTypes.func,
		defaultValue: PropTypes.string,
		name: PropTypes.string,
		onChange: PropTypes.func,
		onCursorActivity: PropTypes.func,
		onFocusChange: PropTypes.func,
		onKeyUp: PropTypes.func,
		onScroll: PropTypes.func,
		options: PropTypes.object,
		path: PropTypes.string,
		value: PropTypes.string,
		preserveScrollPosition: PropTypes.bool,
	};

	static defaultProps = {
		preserveScrollPosition: false
	};

	constructor(props) {
		super(props);

		this.cursorActivity = this.cursorActivity.bind(this);
		this.scrollChanged = this.scrollChanged.bind(this);
		this.keyUp = this.keyUp.bind(this);
		this.focus = this.focus.bind(this);
		this.focusChanged = this.focusChanged.bind(this);
		this.codemirrorValueChanged = this.codemirrorValueChanged.bind(this);

		this.state = {
		};
	}
	getCodeMirrorInstance() {
		return this.props.codeMirrorInstance || require('codemirror');
	}
	getInitialState() {
		return {
			isFocused: false,
		};
	}
	componentWillMount() {
		this.componentWillReceiveProps = debounce(this.componentWillReceiveProps, 0);
		if (this.props.path) {
			console.error('Warning: react-codemirror: the `path` prop has been changed to `name`');
		}
	}
	componentDidMount() {
		const codeMirrorInstance = this.getCodeMirrorInstance();
		this.codeMirror = codeMirrorInstance.fromTextArea(this.textareaNode, this.props.options);
		this.codeMirror.on('change', this.codemirrorValueChanged);
		this.codeMirror.on('cursorActivity', this.cursorActivity);
		this.codeMirror.on('focus', this.focusChanged.bind(this, true));
		this.codeMirror.on('blur', this.focusChanged.bind(this, false));
		this.codeMirror.on('scroll', this.scrollChanged);
		this.codeMirror.on('keyup', this.keyUp);
		this.codeMirror.setValue(this.props.defaultValue || this.props.value || '');
	}
	componentWillUnmount() {
		// is there a lighter-weight way to remove the cm instance?
		if (this.codeMirror) {
			this.codeMirror.toTextArea();
		}
	}
	componentWillReceiveProps(nextProps) {
		if (this.codeMirror && nextProps.value !== undefined && nextProps.value !== this.props.value && normalizeLineEndings(this.codeMirror.getValue()) !== normalizeLineEndings(nextProps.value)) {
			if (this.props.preserveScrollPosition) {
				var prevScrollPosition = this.codeMirror.getScrollInfo();
				this.codeMirror.setValue(nextProps.value);
				this.codeMirror.scrollTo(prevScrollPosition.left, prevScrollPosition.top);
			} else {
				this.codeMirror.setValue(nextProps.value);
			}
		}
		if (typeof nextProps.options === 'object') {
			for (let optionName in nextProps.options) {
				if (nextProps.options.hasOwnProperty(optionName)) {
					this.setOptionIfChanged(optionName, nextProps.options[optionName]);
				}
			}
		}
	}
	setOptionIfChanged(optionName, newValue) {
		const oldValue = this.codeMirror.getOption(optionName);
		if (!isEqual(oldValue, newValue)) {
			this.codeMirror.setOption(optionName, newValue);
		}
	}
	getCodeMirror() {
		return this.codeMirror;
	}
	focus() {
		if (this.codeMirror) {
			this.codeMirror.focus();
		}
	}
	focusChanged(focused) {
		this.setState({
			isFocused: focused,
		});
		this.props.onFocusChange && this.props.onFocusChange(focused);
	}
	keyUp(cm, evt) {
		this.props.onKeyUp && this.props.onKeyUp(cm, evt);
	}
	cursorActivity(cm) {
		this.props.onCursorActivity && this.props.onCursorActivity(cm);
	}
	scrollChanged(cm) {
		this.props.onScroll && this.props.onScroll(cm.getScrollInfo());
	}
	codemirrorValueChanged(doc, change) {
		if (this.props.onChange && change.origin !== 'setValue') {
			this.props.onChange(doc.getValue(), change);
		}
	}
	render() {
		const editorClassName = [
			'ReactCodeMirror',
			this.state && this.state.isFocused ? 'ReactCodeMirror--focused' : null,
			this.props.className
		].join(' ').trim();
		return (
			<div className={editorClassName}>
				<textarea
					ref={ref => this.textareaNode = ref}
					name={this.props.name || this.props.path}
					defaultValue={this.props.value}
					autoComplete="off"
					autoFocus={this.props.autoFocus}
				/>
			</div>
		);
	}
};

export default CodeMirror;