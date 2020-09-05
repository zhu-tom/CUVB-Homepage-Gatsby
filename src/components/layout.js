import React, { useRef, useEffect } from 'react';
import Navbar from './navbar';
import Footer from './footer';

export default function Layout({children, scroll, location}) {
    let childRef = {};
    children = React.Children.map(children, (child) => {
        const ref = React.createRef();
        childRef[child.props.id] = ref;
        return React.cloneElement(child, {myRef: ref});
    });

    useEffect(() => {
        if (scroll) childRef[scroll].current.scrollIntoView({
            behavior: "smooth"
        });
    }, []);

    return (
        <>
            <Navbar scroll={scroll} location={location} refs={childRef}/>
                {children}
            <Footer/>
        </>
    )
}