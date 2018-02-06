import React from 'react';

export const Profile = props => {
    const state = props.state;
    const user = state.user;
    // console.log('user:', user);
    const username = user ? user.username : '';
    const password = user ? user.password : '';
    // console.log('username:', username);
    // console.log('password:', password);
    const location = user ? (user.location || 'city, state') : '';
    const masked =
    (function maskPassword(password) {
        let masked = '';
        for (let i = 0; i < password.length; i++) masked += '🙊';
        return masked;
    })(password);

    return (
        <div className='profile-container'>
            <div className='form-container'>
                <h2>My profile</h2>
                {/* <div className='link-wrapper'>Don't have an account?&nbsp; */}
                    {/* <Link className='link' to='/signup'>Sign Up</Link> */}
                <form autocomplete='off' className='form' action='/profile' method='post'>
                    <div className='form-item-container profile-item-container'>
                        <input type='text' name='username' placeholder={username}/>
                        <div className='emoji-wrapper'>👤</div>
                    </div>
                    <div className='form-item-container profile-item-container'>
                        <input type='text' name='password' placeholder={masked}/>
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
