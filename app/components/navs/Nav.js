import React from 'react';
import { Link } from 'react-router-dom';

 const Nav = props => {
    const state = props.state;
    const searchValue = state.searchValue;
    const handleInput = props.handleInput;
    const searchForBook = props.searchForBook;
    const navigateTo = props.navigateTo;
    const borderNavItem = props.borderNavItem;
    const clicked = state.ui.navItemClicked.class;
    const evtOrigin = state.ui.navItemClicked.evtOrigin;

    return (
        <div className='nav-container' onClick={borderNavItem}>
            <div className='nav-item-container'>
                <input type='text' placeholder='Search' onChange={handleInput} value={searchValue}
                    onKeyUp={(evt) => {searchForBook(evt); navigateTo('/search')}} />
                <div className='emoji-wrapper'>🔍</div>
            </div>
            <Link to='/'>
                <div className={evtOrigin === 'home' ? 'nav-item-container' + clicked : 'nav-item-container'} id='home'>
                    <div className='text-wrapper'>Home</div>
                    <div className='emoji-wrapper'>🏠</div>
                </div>
            </Link>
            <Link to='/books'>
                <div className={evtOrigin === 'books' ? 'nav-item-container' + clicked : 'nav-item-container'} id='books'>
                    <div className='text-wrapper'>Books</div>
                    <div className='emoji-wrapper'>📚</div>
                </div>
            </Link>
            <div className={evtOrigin === 'about' ? 'nav-item-container' + clicked : 'nav-item-container'} id='about'>
                <div className='text-wrapper'>About</div>
                <div className='emoji-wrapper'>📱</div>
            </div>
        </div>
    );
}
export default Nav;
