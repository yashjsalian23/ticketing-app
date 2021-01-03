import { useState } from 'react';
import Router from 'next/router';

import useRequest from '../../hooks/use-request';

export default () => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/users/signin',
        method: 'post',
        body: {
          email,
          password
        },
        onSuccess: () => Router.push('/')
      });
    

    const formSubmitHandler = async event => {
        event.preventDefault();

        await doRequest();
    }

    return (
        <form onSubmit={formSubmitHandler}>
            <h1>Signin Form</h1>
            <div className="form-group">
                <label>Email</label>
                <input className="form-control"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
                <label>Password</label>
                <input className="form-control"
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)} />

                    {errors}
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}