'use client';
import { Anchor, Checkbox, Divider, Group, Paper, PasswordInput, SegmentedControl, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import './auth.css';
import Login from './Login';
import Signup from './Signup';
const Authenticate = () => {

    const [type, setType] = useState('Login');

    

    return (
        <div className='card'>

            <Paper radius="md" p="xl" withBorder>
                <Text size="lg" fw={500}>
                    Welcome to CK Sewa Chikan Industries , {type} with
                </Text>

                <SegmentedControl value={type} onChange={v => setType(v)} fullWidth color='pink' data={['Login', 'Signup']} />

                {
                    type === 'Login' ? <Login /> : <Signup setType={setType} />
                }
                
            </Paper>
        </div>
    )
}

export default Authenticate;