import React from 'react';
import { Link } from 'react-router-dom';

const UserNav = props => {
    const state = props.state;
    const isLoggedIn = state.user;
    let username = isLoggedIn ? isLoggedIn.username : '';
    const logout = props.logout;
    username = props.shortenString(username, 12);
    const borderNavItem = props.borderNavItem;
    const clicked = state.ui.navItemClicked.class;
    const evtOrigin = state.ui.navItemClicked.evtOrigin;

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
                            <div className={evtOrigin === 'profile' ? 'nav-item-container' + clicked : 'nav-item-container'} id='profile'>
                                <div className='text-wrapper'>Profile</div>
                                <div className='emoji-wrapper'>⚙️</div>
                            </div>
                        </Link>
                        <Link to='/mybooks'>
                            <div className={evtOrigin === 'my-books' ? 'nav-item-container' + clicked : 'nav-item-container'} id='my-books'>
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
