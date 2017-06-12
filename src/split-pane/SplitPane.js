import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Prefixer from 'inline-style-prefixer';
import stylePropType from 'react-style-proptype';

import Pane from './Pane';
import Resizer from './Resizer';

function unFocus(document, window) {
    if (document.selection) {
        document.selection.empty();
    } else {
        try {
            window.getSelection().removeAllRanges();
            // eslint-disable-next-line no-empty
        } catch (e) { }
    }
}

class SplitPane extends Component {
    constructor() {
        super();

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onResize = this.onResize.bind(this);

        this.state = {
            active: false,
            resized: false,
        };
    }

    componentDidMount() {
        this.setSize(this.props, this.state);
        document.addEventListener('mouseup', this.onMouseUp);
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('touchmove', this.onTouchMove);
        window.addEventListener("resize", this.onResize);
    }

    componentWillReceiveProps(props) {
        this.setSize(props, this.state);
    }

    componentWillUnmount() {
        document.removeEventListener('mouseup', this.onMouseUp);
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('touchmove', this.onTouchMove);
        window.removeEventListener("resize", this.onResize);
    }

    onMouseDown(event) {
        const eventWithTouches = Object.assign(
            {},
            event,
            { touches: [{ clientX: event.clientX, clientY: event.clientY }] },
        );
        this.onTouchStart(eventWithTouches);
    }

    onTouchStart(event) {
        const { allowResize, onDragStarted, split } = this.props;
        if (allowResize) {
            unFocus(document, window);
            const position = split === 'vertical' ? event.touches[0].clientX : event.touches[0].clientY;
            if (typeof onDragStarted === 'function') {
                onDragStarted();
            }
            this.setState({
                active: true,
                position,
            });
        }
    }

    onMouseMove(event) {
        const eventWithTouches = Object.assign(
            {},
            event,
            { touches: [{ clientX: event.clientX, clientY: event.clientY }] },
        );
        this.onTouchMove(eventWithTouches);
    }

    onResize(event) {
        this.state = {
            active: false,
            resized: false
        };
        this.setSize(this.props, this.state);
    }

    onTouchMove(event) {
        const { allowResize, maxSize, minSize, onChange, split } = this.props;
        const { active, position } = this.state;

        if (!allowResize || !active) {
            return;
        }

        unFocus(document, window);
        const isPrimaryFirst = this.props.primary === 'first';
        const ref = isPrimaryFirst ? this.pane1 : this.pane2;
        if (!ref) {
            return;
        }

        const node = ReactDOM.findDOMNode(ref);
        if (!node.getBoundingClientRect) {
            return;
        }

        const width = node.getBoundingClientRect().width;
        const height = node.getBoundingClientRect().height;
        const current = split === 'vertical' ? event.touches[0].clientX : event.touches[0].clientY;
        const size = split === 'vertical' ? width : height;
        const newPosition = isPrimaryFirst ? (position - current) : (current - position);

        let newMaxSize = maxSize;
        if ((maxSize !== undefined) && (maxSize <= 0)) {
            const splPane = this.splitPane;
            if (split === 'vertical') {
                newMaxSize = splPane.getBoundingClientRect().width + maxSize;
            } else {
                newMaxSize = splPane.getBoundingClientRect().height + maxSize;
            }
        }

        let newSize = size - newPosition;

        if (newSize < minSize) {
            newSize = minSize;
        } else if ((maxSize !== undefined) && (newSize > newMaxSize)) {
            newSize = newMaxSize;
        } else {
            this.setState({
                position: current,
                resized: true,
            });
        }

        if (onChange) {
            onChange(newSize);
        }
        this.setState({ draggedSize: newSize });
        ref.setState({ size: newSize });
    }

    onMouseUp() {
        const { allowResize, onDragFinished } = this.props;
        const { active, draggedSize } = this.state;
        if (allowResize && active) {
            if (typeof onDragFinished === 'function') {
                onDragFinished(draggedSize);
            }
            this.setState({ active: false });
        }
    }

    setSize(props, state) {
        const { primary } = this.props;
        const ref = primary === 'first' ? this.pane1 : this.pane2;
        let newSize;
        if (ref) {
            newSize = props.size || (state && state.draggedSize) || props.defaultSize || props.minSize;
            ref.setState({
                size: newSize,
            });
            if (props.size !== state.draggedSize) {
                this.setState({
                    draggedSize: newSize,
                });
            }
        }
    }

    render() {
        const { allowResize, children, className, defaultSize, minSize, onResizerClick, onResizerDoubleClick, paneStyle,
            pane1Style: pane1StyleProps, pane2Style: pane2StyleProps, primary, prefixer, resizerClassName,
            resizerStyle, size, split, style: styleProps } = this.props;
        const disabledClass = allowResize ? '' : 'disabled';

        const style = Object.assign({},
            styleProps || {}, {
                display: 'flex',
                flex: 1,
                height: '100%',
                outline: 'none',
                overflow: 'hidden',
                MozUserSelect: 'text',
                WebkitUserSelect: 'text',
                msUserSelect: 'text',
                userSelect: 'text',
            });

        if (split === 'vertical') {
            Object.assign(style, {
                flexDirection: 'row',
                left: 0,
                right: 0,
            });
        } else {
            Object.assign(style, {
                bottom: 0,
                flexDirection: 'column',
                minHeight: '100%',
                top: 0,
                width: '100%',
            });
        }

        const classes = ['SplitPane', className, split, disabledClass];
        const pane1Style = prefixer.prefix(Object.assign({}, paneStyle || {}, pane1StyleProps || {}));
        const pane2Style = prefixer.prefix(Object.assign({}, paneStyle || {}, pane2StyleProps || {}));
        return (
            <div
                className={classes.join(' ')}
                ref={(node) => { this.splitPane = node; }}
                style={prefixer.prefix(style)}
            >
                <Pane
                    className="Pane1"
                    key="pane1"
                    ref={(node) => { this.pane1 = node; }}
                    size={primary === 'first' ? size || defaultSize || minSize : undefined}
                    split={split}
                    style={pane1Style}
                >
                    {children[0]}
                </Pane>
                <Resizer
                    className={disabledClass}
                    onClick={onResizerClick}
                    onDoubleClick={onResizerDoubleClick}
                    onMouseDown={this.onMouseDown}
                    onTouchStart={this.onTouchStart}
                    onTouchEnd={this.onMouseUp}
                    key="resizer"
                    ref={(node) => { this.resizer = node; }}
                    resizerClassName={resizerClassName}
                    split={split}
                    splitPane={this}
                    style={resizerStyle || {}}
                />
                <Pane
                    className="Pane2"
                    key="pane2"
                    ref={(node) => { this.pane2 = node; }}
                    size={primary === 'second' ? size || defaultSize || minSize : undefined}
                    split={split}
                    style={pane2Style}
                >
                    {children[1]}
                </Pane>
            </div>
        );
    }
}

SplitPane.propTypes = {
    allowResize: PropTypes.bool,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    className: PropTypes.string,
    primary: PropTypes.oneOf(['first', 'second']),
    minSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    // eslint-disable-next-line react/no-unused-prop-types
    defaultSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    split: PropTypes.oneOf(['vertical', 'horizontal']),
    onDragStarted: PropTypes.func,
    onDragFinished: PropTypes.func,
    onChange: PropTypes.func,
    onResizerClick: PropTypes.func,
    onResizerDoubleClick: PropTypes.func,
    prefixer: PropTypes.instanceOf(Prefixer).isRequired,
    style: stylePropType,
    resizerStyle: stylePropType,
    paneStyle: stylePropType,
    pane1Style: stylePropType,
    pane2Style: stylePropType,
    resizerClassName: PropTypes.string,
};

SplitPane.defaultProps = {
    allowResize: true,
    minSize: 50,
    maxSize: 0,
    defaultSize: "50%",
    prefixer: new Prefixer(),
    primary: 'first',
    split: 'vertical',
    onResizerDoubleClick: (e, resizer) => {
        const splitPane = resizer.props.splitPane;
        if (splitPane.state.resized === false) {
            splitPane.state = {
                active: false,
                resized: true,
                draggedSize: "100%"
            };
        }
        else {
            splitPane.state = {
                active: false,
                resized: false
            };
        }
        splitPane.setSize(splitPane.props, splitPane.state);
    }
};

export default SplitPane;