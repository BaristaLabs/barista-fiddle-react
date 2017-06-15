import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Prefixer from 'inline-style-prefixer';
import stylePropType from 'react-style-proptype';

class Pane extends Component {
    static propTypes = {
        className: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired,
        prefixer: PropTypes.instanceOf(Prefixer).isRequired,
        size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        split: PropTypes.oneOf(['vertical', 'horizontal']),
        style: stylePropType,
    };

    static defaultProps = {
        prefixer: new Prefixer(),
    };

    constructor(props) {
        super(props);

        this.state = { size: this.props.size };
    }

    render() {
        const { children, className, prefixer, split, style: styleProps } = this.props;
        const { size } = this.state;
        const classes = ['Pane', split, className];

        const style = Object.assign({}, styleProps || {}, {
            flex: 1,
            position: 'relative',
            outline: 'none',
        });

        if (size !== undefined) {
            if (split === 'vertical') {
                style.width = size;
            } else {
                style.height = size;
                style.display = 'flex';
            }
            style.flex = 'none';
        }

        return <div className={classes.join(' ')} style={prefixer.prefix(style)}>{children}</div>;
    }
}

export default Pane;