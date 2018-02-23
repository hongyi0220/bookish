import React from 'react';

const RemoveButton = props => {
    const state = props.state;
    const removeBook = props.removeBook;
    const bookId = props.bookId;

    return (
        <div className='button-container' >
            <div className='text-wrapper' onClick={() => {removeBook(bookId)}}>Disown this 📘</div>
        </div>
    );
}
export default RemoveButton;
RemoveButton.propTypes = {
    state: PropTypes.object.isRequired,
    removeBook: PropTypes.func,
    bookId: PropTypes.string
}
