import React from 'react';
import { Link } from 'react-router-dom';

export const Auth = props => {
    return (
        <div className='auth-container'>
            <div className='login-link-container'>
                <Link className='login-link' to='/login'>
                    <div className='text-wrapper'>Log In</div>
                    <div className='emoji-wrapper'>🔑</div>
                </Link>
            </div>
            <div className='signup-link-container'>
                <Link className='signup-link' to='/signup'>
                    <div className='text-wrapper'>Sign Up</div>
                    <div className='emoji-wrapper'>🖋️</div>
                </Link>
            </div>
        </div>
    );
}
