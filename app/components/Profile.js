import React from 'react';

export const Profile = props => {
    const state = props.state;
    const user = state.user ? state.user : '';
    const username = user.username;
    const password = user.password;
    const location = user.location || 'city, state';
    const masked =
    (function maskPassword(password) {
        let masked = '';
        for (let i = 0; i < password.length; i++) masked += '*';
        return masked;
    })(password);

    return (
        <div className='profile-container'>
            <div className='form-container'>
                <h2>My profile</h2>
                {/* <div className='link-wrapper'>Don't have an account?&nbsp; */}
                    {/* <Link className='link' to='/signup'>Sign Up</Link> */}
                <form className='form' action='/profile' method='post'>
                    <div className='form-item-container profile-item-container'>
                        <input type='text' name='username' placeholder={username}/>
                        <div className='emoji-wrapper'>👤</div>
                    </div>
                    <div className='form-item-container profile-item-container'>
                        <input type='password' name='password' placeholder={masked}/>
                        <div className='emoji-wrapper'>🔑</div>
                    </div>
                    <div className='form-item-container profile-item-container'>
                        <input type='text' name='location' placeholder={location}/>
                        <div className='emoji-wrapper'>📍</div>
                    </div>
                    <div className='button-wrapper'>
                        <button type='submit'>SAVE</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
