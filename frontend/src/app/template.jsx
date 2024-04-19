'use client';
import { Drawer, MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { Navbar } from './navbar';
import React, { useEffect } from 'react';
import { SnackbarProvider } from 'notistack';
import Footer from './footer';
import { AppProvider } from '@/context/AppContext';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'


const Template = ({ children }) => {
  
  useEffect(() => {
    TimeAgo.addDefaultLocale(en);
  }, [])
  

  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <AppProvider>
        {children}
      </AppProvider>
      <Footer />
    </SnackbarProvider>


  )
}

export default Template;