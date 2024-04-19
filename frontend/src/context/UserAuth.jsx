import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react'

const UserAuthoriser = ({ children }) => {
    const hasRun = useRef(false);

    const router = useRouter();

    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));

    useEffect(() => {
        if (currentUser === null && !hasRun.current) {
            // console.log('ok');
            enqueueSnackbar('Login to Continue', { variant: 'error' });
            hasRun.current = true;
        } else if (currentUser !== null) {
            hasRun.current = false;
        }
    }, [currentUser]);

    if (currentUser !== null) {
        return children;
    } else {
        return router.push('/authenticate');
    }
}

export default UserAuthoriser