import React from 'react';

export default function Tiles() {
    return (
        <div className="tile is-ancestor">
            <div className="tile is-parent">
                <div className="tile is-child box">
                    <p className="title">One</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
                </div>
            </div>
            <div className="tile is-parent">
                <div className="tile is-child box">
                    <p className="title">Two</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
                </div>
            </div>
            <div className="tile is-parent">
                <div className="tile is-child box">
                    <p className="title">Three</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
                </div>
            </div>
            <div className="tile is-parent">
                <div className="tile is-child box">
                    <p className="title">Four</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
                </div>
            </div>
        </div>
    );
}