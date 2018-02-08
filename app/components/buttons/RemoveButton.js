import React from 'react';
import { Link } from 'react-router-dom';

export const RemoveButton = props => {
    const state = props.state;
    const requestButtonHeight = props.requestButtonHeight;
    const requestButtonStyles = props.requestButtonStyles;
    const textWrapperStyles = props.textWrapperStyles;

    return (
        <div className='request-button-container' style={requestButtonStyles}>
            <div className='text-wrapper' style={textWrapperStyles}/*onClick={() => {addBook(bookId)}}*/>Remove this 📘</div>
        </div>
    );
}
