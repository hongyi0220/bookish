import React from 'react';
import { Link } from 'react-router-dom';

export const Nav = props => {
    return (
        <div className='nav-container'>
            <div className='search-bar-wrapper'>
                <input type='text' placeholder='Search'/><div className='emoji-wrapper'>🔍</div>
            </div>
            <Link to='/'>
                <div className='home-link-wrapper'>
                    <div className='text-wrapper'>Home</div><div className='emoji-wrapper'>🏠</div>
                </div>
            </Link>
            <div className='books-link-wrapper'>
                <div className='text-wrapper'>Books</div><div className='emoji-wrapper'>📚</div>
            </div>
            <div className='inbox-link-wrapper'>
                <div className='text-wrapper'>Inbox</div><div className='emoji-wrapper'>📨</div>
            </div>
            <div className='about-link-wrapper'>
                <div className='text-wrapper'>About</div><div className='emoji-wrapper'>📱</div>
            </div>
        </div>
    );
}
