import React from 'react';
import { Link } from 'react-router-dom';

export const UserNav = props => {
    const isLoggedIn = props.isLoggedIn;
    const username = isLoggedIn ? isLoggedIn.username : '';
    const logout = props.logout;

    return (
        <div className='user-nav-container'>
            {isLoggedIn ?
                <div className='user-window'>
                    <div className='greeting-wrapper'>
                        Hello,&nbsp;<div className='username-wrapper'>{username}</div>!
                    </div>
                    <div className='user-menu-container'>
                        <Link to='/profile'>
                            <div className='menu-item-wrapper'>Profile</div>
                        </Link>
                        <Link to='/mybooks'>
                            <div className='menu-item-wrapper'>My Books</div>
                        </Link>
                        <div className='menu-item-wrapper' onClick={logout}>Log Out</div>
                    </div>
                </div>
                 :
                <div className='auth-links-container'>
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
                </div>}
        </div>
    );
}
