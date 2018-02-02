import React from 'react';
import { Link } from 'react-router-dom';

export const LoginForm = props => {
    return (
        <div className='form-container'>
            <h2>Log into your account</h2>
            <div className='link-wrapper'>Don't have an account?&nbsp;
                <Link className='link' to='/signup'>Sign Up</Link>
            </div>
            <form className='form' action='/login' method='post'>
                <div className='username-container'>
                    <input id='username' type='text' name='username' placeholder='Enter your username'/>
                    <div className='emoji-wrapper'>👤</div>
                </div>
                <div className='password-container'>
                    <input id='password' type='password' name='password' placeholder='Enter your password'/>
                    <div className='emoji-wrapper'>🔑</div>
                </div>
                <div className='button-wrapper'>
                    <button type='submit'>LOG IN</button>
                </div>
            </form>
        </div>
    );
}
