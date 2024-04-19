import React from 'react';

import { Navbar } from '../../navbar'

const Layout = ({ children }) => {
    return (
        <>
                <Navbar />
                {children}
        </>
    )
}

export default Layout