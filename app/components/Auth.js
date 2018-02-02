import React from 'react';
import { Link } from 'react-router-dom';

export const Auth = props => {
    return (
        <div className='auth-container'>
            <Link className='auth-link' to='/login'>
                <div className='auth-link-container'>
                        <div className='text-wrapper'>Log In</div>
                        <div className='emoji-wrapper'>🔑</div>
                </div>
            </Link>
            <Link className='auth-link' to='/signup'>
                <div className='auth-link-container'>
                        <div className='text-wrapper'>Sign Up</div>
                        <div className='emoji-wrapper'>🖋️</div>
                </div>
            </Link>
        </div>
    );
}
