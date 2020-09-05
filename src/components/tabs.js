import React from 'react';
import PropTypes from 'prop-types';

export default class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: this.props.defaultIndex || 0
        }

    }

    handleClick(index) {
        this.setState({active: index});
    }

    render() {
        return (
            <>
            <div className="tabs">
                <ul>
                    {React.Children.map(this.props.children, (child, index) => (
                        <li key={index} className={index === this.state.active ? "is-active":""} onClick={() => this.handleClick(index)}><a>{child.props.header}</a></li>
                    ))}
                </ul>
            </div>
            {this.props.children[this.state.active]}
            </>
        );
    }
}

export function Tab({children}) {
    return (
        <div className={"container"}>
            {children}
        </div>
    );
}

Tabs.propTypes = {
    children: PropTypes.element.isRequired,
    defaultIndex: PropTypes.number,
}