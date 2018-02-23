import React from 'react';
import { Link } from 'react-router-dom';

 const Nav = props => {
    const state = props.state;
    const searchValue = state.searchValue;
    const clicked = state.ui.navItemClicked.class;
    const evtOrigin = state.ui.navItemClicked.evtOrigin;
    const handleInput = props.handleInput;
    const searchForBook = props.searchForBook;
    const navigateTo = props.navigateTo;
    const borderNavItem = props.borderNavItem;

    return (
        <div className='nav-container' onClick={borderNavItem}>
            <div className='nav-item-container'>
                <input type='text' placeholder='Search' onChange={handleInput} value={searchValue}
                    onKeyUp={(evt) => {searchForBook(evt); navigateTo('/search')}} />
                <div className='emoji-wrapper'>🔍</div>
            </div>
            <Link to='/'>
                <div className={evtOrigin === 'books' ? 'nav-item-container' + clicked : 'nav-item-container'}
                    id='books'>
                    <div className='text-wrapper' id='books'>Books</div>
                    <div className='emoji-wrapper' id='books'>📚</div>
                </div>
            </Link>
            <Link to='/about'>
            <div className={evtOrigin === 'about' ? 'nav-item-container' + clicked : 'nav-item-container'}
                id='about'>
                <div className='text-wrapper' id='about'>About</div>
                <div className='emoji-wrapper' id='about'>📱</div>
            </div>
            </Link>
        </div>
    );
}
export default Nav;
Nav.propTypes = {
    state: PropTypes.object.isRequired,
    handleInput: PropTypes.func,
    searchForBook: PropTypes.func,
    navigateTo: PropTypes.func,
    borderNavItem: PropTypes.func
}
