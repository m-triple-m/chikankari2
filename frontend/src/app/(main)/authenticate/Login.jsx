'use client';
import { Anchor, Button, Checkbox, Group, PasswordInput, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import useAppContext from '@/context/AppContext';

const Login = ({ setType }) => {

    const router = useRouter();

    const { setLoggedIn, setCurrentUser } = useAppContext();

    const LoginForm = useForm({
        initialValues: {
            email: '',
            password: ''
        },
        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (!val.length ? 'Password is required' : null),
        },
    })

    const LoginSubmit = async (values) => {
        console.log(values);
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/authenticate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then((res) => {
            if (res.status === 200) {
                enqueueSnackbar('Logged in successfully', { variant: 'success' });
                res.json()
                    .then((data) => {
                        console.log(data);
                        setLoggedIn(true);
                        setCurrentUser(data);
                        sessionStorage.setItem('user', JSON.stringify(data));
                        if(data.role === 'admin'){
                            router.push('/admin/manageproduct');
                        }else if(data.role === 'user'){
                            router.push('/browse');
                        }
                    })
            } else {
                enqueueSnackbar('Some Error occured', { variant: 'error' });
            }
        }).catch((err) => {
            console.log(err);
        });

    }

    return (
        <div>
            <form onSubmit={LoginForm.onSubmit(LoginSubmit)}>
                <Stack gap={'xl'}>
                    <TextInput
                        label="Email"
                        placeholder="hello@mantine.dev"
                        {...LoginForm.getInputProps('email')}
                        radius="md"
                    />

                    <PasswordInput
                        label="Password"
                        placeholder="Your password"
                        {...LoginForm.getInputProps('password')}
                        radius="md"
                    />

                    <Checkbox
                        label="Keep me logged in"
                    />

                    <Button color='pink' type='submit'>Login</Button>

                </Stack>

                <Group justify="space-between" mt="xl">
                    <Anchor component="button" type="button" c="dimmed" onClick={() => setType('Signup')} size="xs">
                        Don&apos;t have an account? Signup
                    </Anchor>
                </Group>
            </form>
        </div>
    )
}

export default Login