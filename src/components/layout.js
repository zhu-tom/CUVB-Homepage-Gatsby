import React, { useRef } from 'react';
import Navbar from './navbar';
import Footer from './footer';

export default function Layout({children}) {
    let childRef = {};
    children = React.Children.map(children, (child) => {
        const ref = React.createRef();
        childRef[child.props.id] = ref;
        return React.cloneElement(child, {myRef: ref});
    });
    return (
        <>
            <Navbar refs={childRef}/>
                {children}
            <Footer/>
        </>
    )
}