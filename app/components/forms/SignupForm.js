import React from 'react';
import { Link } from 'react-router-dom';

export const SignupForm = props => {
    return (
        <div className='form-container'>
            <h2>Sign up for your account</h2>
            <div className='link-wrapper'>Already have an account?&nbsp;
                <Link className='link' to='/login'>Log In</Link>
            </div>
            <form className='form' action='/signup' method='post'>
                <div className='username-container'>
                    <input id='username' type='text' name='username' placeholder='Choose a username'/>
                    <div className='emoji-wrapper'>👤</div>
                </div>
                <div className='password-container'>
                    <input id='password' type='password' name='password' placeholder='Choose a password'/>
                    <div className='emoji-wrapper'>🔑</div>
                </div>
                <div className='button-wrapper'>
                    <button type='submit'>SIGN UP</button>
                </div>
            </form>
        </div>
    );
}
