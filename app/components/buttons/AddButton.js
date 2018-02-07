import React from 'react';
import { Link } from 'react-router-dom';

export const AddButton = props => {
    const state = props.state;
    const isLoggedIn = state.user;
    const requestButtonHeight = props.requestButtonHeight;
    const requestButtonStyles = props.requestButtonStyles;
    const textWrapperStyles = props.textWrapperStyles;

    return (
        <div className='request-button-container' style={requestButtonStyles}>
            {isLoggedIn ?
                <div className='text-wrapper' style={textWrapperStyles} onClick={() => {addBook(bookId)}}>I own this 📘</div> :
                <Link to='/login'>
                    <div className='text-wrapper' style={textWrapperStyles}>Log in & add 📘</div>
                </Link>}
        </div>
    );
}
