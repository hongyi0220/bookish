import React from 'react';

const SignupSuccess = props => {
    const state = props.state;
    const timer = state.ui.timer;
    props.setTimer();

    return (
        <div className='signup-success-screen-container'>
            <div className='signup-success-emoji'>🎉</div>
            <div className='signup-success-msg-container'>
                Successfully signed up!&nbsp;
                Redirecting to somewhere in...&nbsp;{timer}&nbsp;
                {/* <div className='cancel-button' onClick={cancelLogout}>Cancel Logout</div> */}
            </div>
        </div>
    );
}
export default SignupSuccess;
