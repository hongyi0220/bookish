import React from 'react';
import { Link } from 'react-router-dom';

export const SignupForm = props => {
    return (
        <div className='signup-form-container'>
            <h2>Sign up for your FREE account</h2>
            <div className='login-link-wrapper'>Already have an account?&nbsp;
                <Link className='login-link' to='/login'>Log In</Link>
            </div>
            <form className='signup-form' action='/signup' method='post'>
                <div className='username-container'>
                    <input id='username' type='text' name='username' placeholder='Choose a username'/>
                    <div className='emoji-wrapper'>👤</div>
                </div>
                <div className='password-container'>
                    <input id='password' type='password' name='password' placeholder='Choose a password'/>
                    <div className='emoji-wrapper'>🔑</div>
                </div>
                <div className='button-container'>
                    <button type='submit'>SIGN UP</button>
                </div>
            </form>
        </div>
    );
}
