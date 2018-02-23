import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const RequestButton = props => {
    const state = props.state;
    const isLoggedIn = state.user;
    const requestBook = props.requestBook;
    const bookId = props.bookId;

    return (
        <div className='button-container'>
            {isLoggedIn ?
                <div className='text-wrapper' onClick={() => {requestBook(bookId)}}>Request this 📘</div> :
                <Link to='/login'>
                    <div className='text-wrapper'>Log in & request 📘</div>
                </Link>}
        </div>
    );
}
export default RequestButton;
RequestButton.propTypes = {
    state: PropTypes.object.isRequired,
    requestBook: PropTypes.func,
    bookId: PropTypes.string
}
