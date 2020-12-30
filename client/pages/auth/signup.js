import { useState } from 'react';
import axios from 'axios';

export default () => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const formSubmitHandler = async event => {
        event.preventDefault();

        const response = await axios.post('/api/users/signup', {
            email,
            password
        });
        console.log(response);
    }

    return (
        <form onSubmit={formSubmitHandler}>
            <h1>Signup Form</h1>
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
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}