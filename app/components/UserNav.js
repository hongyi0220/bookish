import React from 'react';
import { Link } from 'react-router-dom';

export const UserNav = props => {
    const state = props.state;
    const isLoggedIn = state.user;
    const username = isLoggedIn ? isLoggedIn.username : '';
    const logout = props.logout;

    return (
        <div className='user-nav-container'>
            {isLoggedIn ?
                <div className='user-window'>
                    <div className='nav-item-wrapper greeting-wrapper'>
                        <div className='text-wrapper'>
                            Hello,&nbsp;<div className='username-wrapper'>{username}</div>!
                        </div>
                        <div className='emoji-wrapper'>👋</div>
                    </div>
                    <div className='user-menu-container'>
                        <Link to='/profile'>
                            <div className='nav-item-wrapper'>
                                <div className='text-wrapper'>Profile</div>
                                <div className='emoji-wrapper'>⚙️</div>
                            </div>
                        </Link>
                        <Link to='/mybooks'>
                            <div className='nav-item-wrapper'>
                                <div className='text-wrapper'>My Books</div>
                                <div className='emoji-wrapper'>📖</div>
                            </div>
                        </Link>
                        <div className='nav-item-wrapper' onClick={logout}>
                            <div className='text-wrapper'>Log Out</div>
                            <div className='emoji-wrapper'>⏏️</div>
                        </div>
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
