import React from 'react';
import { Link } from 'react-router-dom';

const RemoveButton = props => {
    const state = props.state;
    const requestButtonHeight = props.requestButtonHeight;
    const requestButtonStyles = props.requestButtonStyles;
    const textWrapperStyles = props.textWrapperStyles;
    const removeBook = props.removeBook;
    const bookId = props.bookId;

    return (
        <div className='button-container' style={requestButtonStyles}>
            <div className='text-wrapper' style={textWrapperStyles} onClick={() => {removeBook(bookId)}}>Remove this 📘</div>
        </div>
    );
}
export default RemoveButton;
