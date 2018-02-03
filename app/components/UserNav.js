import React from 'react';
import { Link } from 'react-router-dom';

export const UserNav = props => {
    return (
        <div className='user-nav-container'>
            <Link className='user-nav-link' to='/login'>
                <div className='user-nav-link-container'>
                        <div className='text-wrapper'>Log In</div>
                        <div className='emoji-wrapper'>🔑</div>
                </div>
            </Link>
            <Link className='user-nav-link' to='/signup'>
                <div className='user-nav-link-container'>
                        <div className='text-wrapper'>Sign Up</div>
                        <div className='emoji-wrapper'>🖋️</div>
                </div>
            </Link>
        </div>
    );
}
