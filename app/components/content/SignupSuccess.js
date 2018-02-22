import React from 'react';
import PropTypes from 'prop-types';

const SignupSuccess = props => {
    const state = props.state;
    // const timer = state.ui.timer;
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
    // props.setTimer();

    return (
        <div className='signup-success-screen-container'>
            <div className='signup-success-emoji'>🎉</div>
            <div className='signup-success-msg-container'>
                Successfully signed up!&nbsp;
                You've joined a community of
                <div>
                    <div>{countActiveUsers(books)} active users and</div>
                    <div>{books ? books.length : 'many'} books.</div>

                </div>
            </div>
        </div>
    );
}
export default SignupSuccess;

SignupSuccess.propTypes = {
    state: PropTypes.object.isRequired,
    // timer: PropTypes.func.isRequired
}
