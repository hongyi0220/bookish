import React from 'react';

export const LogoutScreen = props => {
    const cancelLogout = props.cancelLogout;
    const state = props.state;
    const timer = state.ui.timer;

    return (
        <div className='logout-screen-container'>
            <div className='emoji-wrapper'>👋</div>
            <div className='logout-msg-container'>
                Successfully logged out.&nbsp;
                Redirecting to home page in...&nbsp;{timer}&nbsp;
                <div className='cancel-button' onClick={cancelLogout}>Cancel Logout</div>
            </div>
        </div>
    );
}
