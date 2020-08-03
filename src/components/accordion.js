import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTimesCircle, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

export function AccordionItem({header, children, isExpanded, onClick}) {
    return (
        <article class="message">
            <div onClick={onClick} className="message-header accordion-head">
                <p>{header}</p>
                <span className="icon">{isExpanded ? <FontAwesomeIcon icon={faCaretUp} size="2x"/> : <FontAwesomeIcon icon={faCaretDown} size="2x"/>}</span>
            </div>
            {isExpanded && <div className="message-body has-background-white">
                {children}
            </div>}
        </article>
    );
}

export class Accordion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openItems: {}
        }

        console.log(props.children);
    }

    handleClick = (index) => {
        this.setState((state) => ({
            openItems: {
                ...state.openItems,
                [index]: !state.openItems[index]
            }
        }));
    }

    render() {
        return (
            this.props.children.map((child, index) => (
                <AccordionItem header={child.props.header} onClick={() => this.handleClick(index)} isExpanded={!!this.state.openItems[index]}>
                    {child.props.children}
                </AccordionItem>
            ))
        );
    }
}