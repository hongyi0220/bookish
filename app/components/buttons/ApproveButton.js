import React from 'react';
import PropTypes from 'prop-types';

const ApproveButton = props => {
    const state = props.state;
    const addBook = props.addBook;
    const bookId = props.bookId;
    const approveRequest = props.approveRequest;

    return (
        <div className='button-container'>
            <div className='text-wrapper' onClick={() => {approveRequest(bookId)}}>Approve this request 👍</div>
        </div>
    );
}
export default ApproveButton;
ApproveButton.propTypes = {
    state: PropTypes.object.isRequired,
    addBook: PropTypes.func,
    approveRequest: PropTypes.func,
    bookId: PropTypes.string
}
