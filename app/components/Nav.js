import React from 'react';
import { Link } from 'react-router-dom';

export const Nav = props => {
    const state = props.state;
    const searchValue = state.searchValue;
    const handleInput = props.handleInput;
    const searchForBook = props.searchForBook;
    const navigateTo = props.navigateTo;

    return (
        <div className='nav-container'>
            <div className='nav-item-container'>
                <input type='text' placeholder='Search' onChange={handleInput} value={searchValue}
                    onKeyUp={(evt) => {searchForBook(evt); navigateTo('/search')}} />
                <div className='emoji-wrapper'>🔍</div>
            </div>
            <Link to='/'>
                <div className='nav-item-container'>
                    <div className='text-wrapper'>Home</div>
                    <div className='emoji-wrapper'>🏠</div>
                </div>
            </Link>
            <Link to='/books'>
                <div className='nav-item-container'>
                    <div className='text-wrapper'>Books</div>
                    <div className='emoji-wrapper'>📚</div>
                </div>
            </Link>
            <div className='nav-item-container'>
                <div className='text-wrapper'>Inbox</div>
                <div className='emoji-wrapper'>📨</div>
            </div>
            <div className='nav-item-container'>
                <div className='text-wrapper'>About</div>
                <div className='emoji-wrapper'>📱</div>
            </div>
        </div>
    );
}
