import { useEffect } from 'react';
import Router from 'next/router';

import useRequest from '../../hooks/use-request';


export default () => {
    const { doRequest } = useRequest({
        url: '/api/users/signout',
        method: "post",
        body: {},
        onSuccess: () => Router.push('/')
    });

    useEffect(() => {
        doRequest();
    }, []);

    return <h1>signing you out</h1>

}
