import React from 'react';
import PropTypes from 'prop-types';

const SignupSuccess = props => {
    const state = props.state;
    const books = state.books;
    function countActiveUsers(books) {
        let users = [];
        if(books) {
            books.forEach(b => {
                users.push(...b.ownedby);
                users.push(...b.wishlist);
            });
            users = users.sort().filter((user, i, usersArr) => {
                return usersArr[i - 1] !== usersArr[i];
            });
            return users.length;
        }
    }

    return (
        <div className='signup-success-screen-container'>
            <div className='signup-success-emoji'>🎉</div>
            <div className='signup-success-msg-container'>
                Welcome!
                <div>
                    You've joined a community of
                    <div>
                        {countActiveUsers(books)} active users and {books ? books.length : 'many'} books.
                    </div>

                </div>
            </div>
        </div>
    );
}
export default SignupSuccess;

SignupSuccess.propTypes = {
    state: PropTypes.object.isRequired
}
