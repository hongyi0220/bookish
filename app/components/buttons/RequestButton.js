import React from 'react';
import { Link } from 'react-router-dom';

const RequestButton = props => {
    const state = props.state;
    const isLoggedIn = state.user;
    const requestButtonHeight = props.requestButtonHeight;
    const requestButtonStyles = props.requestButtonStyles;
    const textWrapperStyles = props.textWrapperStyles;
    const requestBook = props.requestBook;
    const bookId = props.bookId;

    return (
        <div className='button-container' style={requestButtonStyles}>
            {isLoggedIn ?
                <div className='text-wrapper' style={textWrapperStyles} onClick={() => {requestBook(bookId)}}>Request this 📘</div> :
                <Link to='/login'>
                    <div className='text-wrapper' style={textWrapperStyles}>Log in & request 📘</div>
                </Link>}
        </div>
    );
}
export default RequestButton;
