import React from 'react';
import PropTypes from 'prop-types';

export default function Table({ headers, children }) {
    return (
        <table className="table is-fullwidth is-striped is-hoverable">
            <thead>
                <tr>
                    {headers.map((val, index) => (
                        <th key={index}>{val}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {children}
            </tbody>
        </table>
    );
}

Table.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.any
}