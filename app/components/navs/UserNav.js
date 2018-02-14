import React from 'react';
import { Link } from 'react-router-dom';

const UserNav = props => {
    const state = props.state;
    const isLoggedIn = state.user;
    let username = isLoggedIn ? isLoggedIn.username : '';
    const logout = props.logout;
    username = props.shortenTitle(username, 12);
    return (
        <div className='user-nav-container'>
            {isLoggedIn ?
                <div className='user-window'>
                    <div className='nav-item-container greeting-wrapper'>
                        <div className='text-wrapper'>
                            Hello,&nbsp;<div className='username-wrapper'>{username}</div>!
                        </div>
                        <div className='emoji-wrapper'>👋</div>
                    </div>
                    <div className='user-menu-container'>
                        <Link to='/profile'>
                            <div className='nav-item-container'>
                                <div className='text-wrapper'>Profile</div>
                                <div className='emoji-wrapper'>⚙️</div>
                            </div>
                        </Link>
                        <Link to='/mybooks'>
                            <div className='nav-item-container'>
                                <div className='text-wrapper'>My Books</div>
                                <div className='emoji-wrapper'>📖</div>
                            </div>
                        </Link>
                        <Link to='/login'>
                            <div className='nav-item-container' onClick={logout}>
                                <div className='text-wrapper'>Log Out</div>
                                <div className='emoji-wrapper'>⏏️</div>
                            </div>
                        </Link>
                    </div>
                </div>
                 :
                <div className='auth-links-container'>
                    <Link className='auth-link' to='/login'>
                        <div className='nav-item-container'>
                                <div className='text-wrapper'>Log In</div>
                                <div className='emoji-wrapper'>🔑</div>
                        </div>
                    </Link>
                    <Link className='auth-link' to='/signup'>
                        <div className='nav-item-container'>
                                <div className='text-wrapper'>Sign Up</div>
                                <div className='emoji-wrapper'>🖋️</div>
                        </div>
                    </Link>
                </div>}
        </div>
    );
}
export default UserNav;
