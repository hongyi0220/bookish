import React from 'react';
import { Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const LoginForm = props => {
    const emoji = props.state.ui.emoji;
    return (
        <div className='form-container'>
            <h2>Log into your account</h2>
            <div className='link-wrapper'>Don't have an account?&nbsp;
                <Link className='link' to='/signup'>Sign Up</Link>
            </div>
            <form className='form' action='/login' method='post'>
                <div className='form-item-container'>
                    <input id='username' type='text' name='username' placeholder='Enter your username'
                        onClick={props.changeEmojiToPerson}/>
                    {props.state.ui.loginClicked ?
                    <div className='emoji-wrapper'>{emoji}</div>
                    : <div className='emoji-wrapper'>👤</div>}
                </div>
                <div className='form-item-container'>
                    <input id='password' type='password' name='password' placeholder='Enter your password'/>
                    <div className='emoji-wrapper'>🔑</div>
                </div>
                <div className='button-wrapper'>
                    <button type='submit'>LOG IN</button>
                </div>
            </form>
        </div>
    );
}
export default LoginForm;
LoginForm.propTypes = {
    state: PropTypes.object.isRequired
}
