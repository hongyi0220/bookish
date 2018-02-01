import React from 'react';
import { withRouter } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import { Transition, Icon, Sidebar } from 'semantic-ui-react';

class App extends React.Component {
    constructor() {
        super();
        //	AIzaSyDHUrQvtLU4zjnACT-2TlctA1RFA_2DxuQ
    }

    componentDidMount() {
        const socket = socketIOClient();

    }

    render() {
        return (<div className='app-container'>
            <div className='title-wrapper'>Bookish</div>
            <div className='subtitle-wrapper'>Book trading made easy</div>
            <div className='layout-container'>
                <Icon name='list layout'></Icon>
                <Icon name='grid layout'></Icon>
            </div>
            <div className='container-wrapper'>
                <div className='nav-container'>
                    <div className='search-bar-wrapper'>
                        <input type='text' placeholder='Search'/><div className='emoji-wrapper'>🔍</div>
                    </div>
                    <div className='home-link-wrapper'>
                        <div className='text-wrapper'>Home</div><div className='emoji-wrapper'>🏠</div>
                    </div>
                    <div className='books-link-wrapper'>
                        <div className='text-wrapper'>Books</div><div className='emoji-wrapper'>📚</div>
                    </div>
                    <div className='inbox-link-wrapper'>
                        <div className='text-wrapper'>Inbox</div><div className='emoji-wrapper'>📨</div>
                    </div>
                    <div className='about-link-wrapper'>
                        <div className='text-wrapper'>About</div><div className='emoji-wrapper'>📱</div>
                    </div>
                </div>
                <div className='content-container'>
                    Content goes here
                </div>
                <div className='status-container'>
                    <div className='signin-link-wrapper'>
                        <div className='text-wrapper'>Sign in</div><div className='emoji-wrapper'>🔑</div>
                    </div>
                    <div className='signup-link-wrapper'>
                        <div className='text-wrapper'>Sign up</div><div className='emoji-wrapper'>🖋️</div>
                    </div>
                </div>
            </div>

        </div>);
    }
}

export default withRouter(App);
