import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { BrowseProvider } from '@/context/BrowseContext';
import { Navbar } from '../navbar';

const Layout = ({ children }) => {
    return (
        <CartProvider>
            <BrowseProvider>
                <Navbar />
                {children}
            </BrowseProvider>
        </CartProvider>
    )
}

export default Layout