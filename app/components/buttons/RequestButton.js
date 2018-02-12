import React from 'react';
import { Link } from 'react-router-dom';

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
