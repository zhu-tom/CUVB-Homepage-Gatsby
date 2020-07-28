import React from 'react';

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