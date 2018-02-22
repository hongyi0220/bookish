import React from 'react';

const CancelRequestButton = props => {
    const state = props.state;
    const requestBook = props.requestBook;
    const bookId = props.bookId;
    const cancelRequest = props.cancelRequest;

    return (
        <div className='button-container'>
            <div className='text-wrapper' onClick={() => {cancelRequest(bookId)}}>Cancel Request ❌</div>
        </div>
    );
}
export default CancelRequestButton;
