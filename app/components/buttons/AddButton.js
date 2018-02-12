import React from 'react';
import { Link } from 'react-router-dom';

const AddButton = props => {
    const state = props.state;
    const isLoggedIn = state.user;
    const addBook = props.addBook;
    const bookId = props.bookId;

    return (
        <div className='button-container'>
            {isLoggedIn ?
                <div className='text-wrapper' onClick={() => {addBook(bookId)}}>I own this 📘</div> :
                <Link to='/login'>
                    <div className='text-wrapper'>Log in & add 📘</div>
                </Link>}
        </div>
    );
}
export default AddButton;
