import React from 'react';
import { Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const SignupForm = props => {
    const emoji = props.state.ui.emoji;
    return (
        <div className='form-container'>
            <h2>Sign up for your account</h2>
            <div className='link-wrapper'>Already have an account?&nbsp;
                <Link className='link' to='/login'>Log In</Link>
            </div>
            <form className='form' action='/signup' method='post'>
                <div className='form-item-container'>
                    <input id='username' type='text' name='username' placeholder='Choose a username'
                        onClick={props.changeEmojiToPerson}/>
                    {props.state.ui.loginClicked ?
                    <div className='emoji-wrapper'>{emoji}‍‍</div>
                    : <div className='emoji-wrapper'>👤</div>}
                </div>
                <div className='form-item-container'>
                    <input id='password' type='password' name='password' placeholder='Choose a password'/>
                    <div className='emoji-wrapper'>🔑</div>
                </div>
                <div className='button-wrapper'>
                    <button type='submit'>SIGN UP</button>
                </div>
            </form>
        </div>
    );
}
export default SignupForm;
SignupForm.propTypes = {
    state: PropTypes.object.isRequired
}
